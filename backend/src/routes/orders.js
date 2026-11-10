// =====================================================
// PEDIDOS A DOMICILIO
// Formas de pago: transferencia Nequi, efectivo contra entrega
// y (opcional) Wompi si se configuran sus llaves.
// GET   /api/orders/options         -> formas de pago disponibles (público)
// POST  /api/orders                 -> crear pedido (público)
// GET   /api/orders/track           -> el cliente consulta su pedido (código + teléfono)
// GET   /api/orders/verify/:txId    -> confirmar el pago con Wompi (público)
// GET   /api/orders                 -> admin: ver pedidos
// PATCH /api/orders/:id             -> admin: cambiar estado
//
// Seguridad: el servidor NO confía en los precios del navegador.
// Vuelve a calcular el total con los precios de la base de datos
// y firma el pago con el "secreto de integridad" de Wompi.
// =====================================================
const crypto = require("crypto");
const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const requireAuth = require("../middleware/auth");

const router = express.Router();

const DELIVERY_FEE = 5000; // costo del domicilio
const MAX_EXTRAS = 21500; // lo máximo que pueden sumar leche + tamaño + endulzante + jarabes + extras
const STATUSES = ["pendiente", "pagado", "rechazado", "en camino", "entregado", "cancelado"];

const nequiNumber = () => (process.env.NEQUI_NUMBER || "").trim();
const wompiEnabled = () => Boolean(process.env.WOMPI_PUBLIC_KEY && process.env.WOMPI_INTEGRITY_SECRET);
const wompiApi = () =>
  (process.env.WOMPI_PUBLIC_KEY || "").startsWith("pub_prod_")
    ? "https://production.wompi.co/v1"
    : "https://sandbox.wompi.co/v1";

function newReference() {
  return "DALYS-" + Date.now().toString(36).toUpperCase() + crypto.randomBytes(2).toString("hex").toUpperCase();
}

// Firma que pide Wompi: SHA256(referencia + montoEnCentavos + moneda + secretoDeIntegridad)
function integritySignature(reference, amountInCents, currency) {
  return crypto
    .createHash("sha256")
    .update(`${reference}${amountInCents}${currency}${process.env.WOMPI_INTEGRITY_SECRET}`)
    .digest("hex");
}

// Solo dejamos volver a páginas autorizadas (las mismas de CORS)
function safeRedirect(url) {
  try {
    const parsed = new URL(url);
    const allowed = (process.env.FRONTEND_URL || "http://localhost:5173")
      .split(",")
      .map((u) => u.trim().replace(/\/$/, ""));
    return allowed.includes(parsed.origin) ? `${parsed.origin}${parsed.pathname}` : null;
  } catch {
    return null;
  }
}

function validateCustomer(c = {}) {
  const customer = {
    name: String(c.name || "").trim(),
    phone: String(c.phone || "").trim(),
    address: String(c.address || "").trim(),
    neighborhood: String(c.neighborhood || "").trim(),
    notes: String(c.notes || "").trim().slice(0, 300),
  };
  if (!customer.name) return { error: "Escribe tu nombre." };
  if (!/^[0-9+\s-]{7,20}$/.test(customer.phone)) return { error: "Escribe un teléfono válido." };
  if (customer.address.length < 5) return { error: "Escribe la dirección completa." };
  if (!customer.neighborhood) return { error: "Escribe el barrio." };
  return { customer };
}

// Recalcula cada producto con los precios reales de la base de datos
async function priceItems(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) return { error: "Tu carrito está vacío." };
  if (rawItems.length > 30) return { error: "El pedido tiene demasiados productos." };

  const products = await Product.find({ available: true });
  const byName = new Map(products.map((p) => [p.name, p]));
  const items = [];

  for (const raw of rawItems) {
    const quantity = Math.floor(Number(raw.quantity));
    if (!quantity || quantity < 1 || quantity > 20) return { error: "Revisa las cantidades del carrito." };

    if (raw.base) {
      // Bebida personalizada: la base debe existir y el precio debe estar en un rango posible
      const base = byName.get(String(raw.base));
      const price = Math.round(Number(raw.price));
      if (!base || !(price >= base.price && price <= base.price + MAX_EXTRAS)) {
        return { error: `El precio de "${raw.name}" no es válido. Vuelve a armar la bebida.` };
      }
      items.push({ name: `${base.name} personalizado`, details: String(raw.details || "").slice(0, 300), price, quantity });
    } else {
      const product = byName.get(String(raw.name));
      if (!product) return { error: `"${raw.name}" ya no está disponible. Quítalo del carrito.` };
      items.push({ name: product.name, details: "", price: product.price, quantity });
    }
  }
  return { items };
}

// ---------- Opciones de pago (para que la página sepa qué mostrar) ----------
router.get("/options", (req, res) => {
  res.json({
    wompi: wompiEnabled(),
    sandbox: wompiApi().includes("sandbox"),
    nequi: nequiNumber(),
    nequiName: process.env.NEQUI_NAME || "Daly's Coffee",
    deliveryFee: DELIVERY_FEE,
  });
});

// ---------- El cliente consulta su pedido ----------
// Pide el código y el teléfono, para que nadie vea pedidos ajenos.
router.get("/track", async (req, res) => {
  const reference = String(req.query.reference || "").trim().toUpperCase();
  const phone = String(req.query.phone || "").replace(/\D/g, "");
  if (!reference || phone.length < 7) return res.status(400).json({ mensaje: "Escribe el código del pedido y tu teléfono." });
  const order = await Order.findOne({ reference });
  if (!order || order.customer.phone.replace(/\D/g, "") !== phone) {
    return res.status(404).json({ mensaje: "No encontramos un pedido con ese código y ese teléfono." });
  }
  res.json({
    reference: order.reference,
    status: order.status,
    paymentMethod: order.paymentMethod,
    total: order.total,
    items: order.items,
    createdAt: order.createdAt,
  });
});

// ---------- Crear pedido ----------
router.post("/", async (req, res) => {
  const requested = req.body?.paymentMethod;
  const paymentMethod = ["wompi", "nequi"].includes(requested) ? requested : "efectivo";
  if (paymentMethod === "nequi" && !nequiNumber()) {
    return res.status(503).json({ mensaje: "El pago por Nequi no está disponible ahora. Puedes pagar en efectivo al recibir." });
  }

  const { customer, error: customerError } = validateCustomer(req.body?.customer);
  if (customerError) return res.status(400).json({ mensaje: customerError });

  const { items, error: itemsError } = await priceItems(req.body?.items);
  if (itemsError) return res.status(400).json({ mensaje: itemsError });

  if (paymentMethod === "wompi" && !wompiEnabled()) {
    return res.status(503).json({ mensaje: "El pago en línea no está disponible ahora. Puedes pagar en efectivo al recibir." });
  }

  const redirectUrl = safeRedirect(req.body?.redirectUrl);
  if (paymentMethod === "wompi" && !redirectUrl) {
    return res.status(400).json({ mensaje: "No se pudo preparar el pago desde esta página." });
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal + DELIVERY_FEE;
  const order = await Order.create({
    reference: newReference(),
    customer,
    items,
    subtotal,
    deliveryFee: DELIVERY_FEE,
    total,
    paymentMethod,
  });

  const result = { reference: order.reference, total, subtotal, deliveryFee: DELIVERY_FEE, paymentMethod };
  if (paymentMethod === "nequi") {
    result.nequi = nequiNumber();
    result.nequiName = process.env.NEQUI_NAME || "Daly's Coffee";
  }

  if (paymentMethod === "wompi") {
    const amountInCents = total * 100;
    const params = new URLSearchParams({
      "public-key": process.env.WOMPI_PUBLIC_KEY,
      currency: "COP",
      "amount-in-cents": String(amountInCents),
      reference: order.reference,
      "signature:integrity": integritySignature(order.reference, amountInCents, "COP"),
      "redirect-url": redirectUrl,
      "customer-data:full-name": customer.name,
      "customer-data:phone-number": customer.phone.replace(/\D/g, ""),
      "customer-data:phone-number-prefix": "+57",
    });
    result.checkoutUrl = `https://checkout.wompi.co/p/?${params.toString()}`;
  }

  res.status(201).json(result);
});

// ---------- Confirmar pago con Wompi ----------
// Wompi devuelve al cliente a la página con ?id=<transacción>.
// Le preguntamos a Wompi directamente el estado: así nadie puede "fingir" un pago.
router.get("/verify/:transactionId", async (req, res) => {
  const txId = String(req.params.transactionId).replace(/[^A-Za-z0-9-]/g, "");
  if (!txId) return res.status(400).json({ mensaje: "Pago no válido." });

  let transaction;
  try {
    const response = await fetch(`${wompiApi()}/transactions/${txId}`, { signal: AbortSignal.timeout(15000) });
    const data = await response.json();
    if (!response.ok || !data.data) return res.status(404).json({ mensaje: "No encontramos ese pago en Wompi." });
    transaction = data.data;
  } catch {
    return res.status(502).json({ mensaje: "No pudimos confirmar el pago con Wompi. Inténtalo en un momento." });
  }

  const order = await Order.findOne({ reference: transaction.reference });
  if (!order) return res.status(404).json({ mensaje: "No encontramos el pedido de ese pago." });

  // El monto pagado debe coincidir con el total del pedido
  const amountOk = transaction.amount_in_cents === order.total * 100;
  const wompiStatus = transaction.status; // APPROVED, DECLINED, VOIDED, ERROR, PENDING

  if (order.status === "pendiente") {
    if (wompiStatus === "APPROVED" && amountOk) order.status = "pagado";
    else if (["DECLINED", "VOIDED", "ERROR"].includes(wompiStatus)) order.status = "rechazado";
    order.wompiTransactionId = transaction.id;
    await order.save();
  }

  res.json({
    reference: order.reference,
    status: order.status,
    wompiStatus,
    total: order.total,
    items: order.items,
    customer: { name: order.customer.name, address: order.customer.address, neighborhood: order.customer.neighborhood },
  });
});

// ---------- Admin ----------
router.get("/", requireAuth, async (req, res) => {
  res.json(await Order.find().sort({ createdAt: -1 }).limit(200));
});

router.patch("/:id", requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ mensaje: "Ese pedido no existe." });
  const status = String(req.body?.status || "");
  if (!STATUSES.includes(status)) return res.status(400).json({ mensaje: "Estado no válido." });
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ mensaje: "Ese pedido no existe." });
  res.json(order);
});

module.exports = router;
