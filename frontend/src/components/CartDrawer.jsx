// =====================================================
// CARRITO + PEDIDO A DOMICILIO
// Pasos: carrito → datos de entrega y forma de pago → confirmación
// Pago en línea: el servidor crea el pedido y nos manda a Wompi.
// =====================================================
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { apiRequest } from "../lib/api";
import { formatPrice } from "../lib/format";
import Icon from "./Icons";
import { RoseTop } from "./Ornaments";
import "../styles/cart.css";

const emptyCustomer = { name: "", phone: "", address: "", neighborhood: "", notes: "" };

function validate(c) {
  const errors = {};
  if (!c.name.trim()) errors.name = "Escribe tu nombre.";
  if (!/^[0-9+\s-]{7,20}$/.test(c.phone.trim())) errors.phone = "Escribe un teléfono válido.";
  if (c.address.trim().length < 5) errors.address = "Escribe la dirección completa.";
  if (!c.neighborhood.trim()) errors.neighborhood = "Escribe el barrio.";
  return errors;
}

export default function CartDrawer() {
  const { items, totals, isOpen, closeCart, changeQuantity, removeItem, clearCart } = useCart();
  const [step, setStep] = useState("cart"); // cart | checkout | done
  const [customer, setCustomer] = useState(emptyCustomer);
  const [errors, setErrors] = useState({});
  const [method, setMethod] = useState("efectivo");
  const [options, setOptions] = useState({ wompi: false, nequi: "", deliveryFee: 5000, loaded: false });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [confirmed, setConfirmed] = useState(null);

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  // Al pasar al formulario, preguntamos al servidor qué formas de pago hay
  useEffect(() => {
    if (step !== "checkout" || options.loaded) return;
    apiRequest("/api/orders/options")
      .then((data) => {
        setOptions({ ...data, loaded: true });
        setMethod(data.nequi ? "nequi" : data.wompi ? "wompi" : "efectivo");
      })
      .catch(() => setOptions((o) => ({ ...o, loaded: true })));
  }, [step, options.loaded]);

  function handleClose() {
    if (step === "done") {
      setStep("cart");
      setConfirmed(null);
    }
    setStatus({ type: "", text: "" });
    closeCart();
  }

  function update(field, value) {
    setCustomer((c) => ({ ...c, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setStatus({ type: "", text: "" });
  }

  async function placeOrder(event) {
    event.preventDefault();
    const found = validate(customer);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ type: "error", text: "Revisa los datos de entrega." });
      return;
    }

    setStatus({ type: "sending", text: method === "wompi" ? "Preparando el pago…" : "Enviando tu pedido…" });
    try {
      const data = await apiRequest("/api/orders", {
        method: "POST",
        body: {
          customer,
          paymentMethod: method,
          redirectUrl: window.location.origin + window.location.pathname,
          items: items.map(({ name, price, quantity, details, base }) => ({ name, price, quantity, details, base })),
        },
      });

      if (data.checkoutUrl) {
        // Vamos a Wompi. El carrito se vacía cuando el pago quede aprobado.
        window.location.href = data.checkoutUrl;
        return;
      }

      setConfirmed({ ...data, items });
      try {
        localStorage.setItem("dalys_last_order", JSON.stringify({ reference: data.reference, phone: customer.phone }));
      } catch {
        /* no pasa nada si no se puede guardar */
      }
      clearCart();
      setCustomer(emptyCustomer);
      setStatus({ type: "", text: "" });
      setStep("done");
    } catch (error) {
      setStatus({ type: "error", text: error.message });
    }
  }

  const title = step === "done" ? "Pedido recibido" : step === "checkout" ? "Tu entrega" : "Tu carrito";
  const total = totals.price + options.deliveryFee;

  return (
    <div className={`cart ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <div className="cart__backdrop" onClick={handleClose} />
      <aside className="cart__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart__header">
          {step === "checkout" && (
            <button type="button" className="icon-button" onClick={() => setStep("cart")} aria-label="Volver al carrito">
              <Icon name="back" size={22} />
            </button>
          )}
          <h2 id="cart-title">{title}</h2>
          <button type="button" className="icon-button" onClick={handleClose} aria-label="Cerrar carrito">
            <Icon name="close" size={24} />
          </button>
        </header>

        {step === "done" && confirmed ? (
          <div className="cart__confirmed">
            <RoseTop size={72} />
            <p>
              Recibimos tu pedido <strong className="cart__ref">{confirmed.reference}</strong>
            </p>
            {confirmed.paymentMethod === "nequi" ? (
              <div className="cart__nequi">
                <p>
                  Envía <strong>{formatPrice(confirmed.total)}</strong> por Nequi al número
                </p>
                <p className="cart__nequi-number">{confirmed.nequi}</p>
                <p>
                  a nombre de {confirmed.nequiName}. En el mensaje de la transferencia escribe tu código{" "}
                  <strong>{confirmed.reference}</strong>. Cuando confirmemos el pago, tu pedido pasa a{" "}
                  <em>pagado</em> y lo enviamos.
                </p>
              </div>
            ) : (
              <p>Lo pagas en efectivo cuando te llegue a la puerta.</p>
            )}
            <ul className="cart__summary">
              {confirmed.items.map((item) => (
                <li key={item.key}>
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
              <li>
                <span>Domicilio</span>
                <span>{formatPrice(confirmed.deliveryFee)}</span>
              </li>
            </ul>
            <div className="cart__total">
              <span>Total</span>
              <strong>{formatPrice(confirmed.total)}</strong>
            </div>
            <a href="#/pedido" className="button button--primary button--block" onClick={handleClose}>
              Ver el estado de mi pedido
            </a>
            <button type="button" className="button button--ghost button--block" onClick={handleClose}>
              Seguir mirando la carta
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="cart__empty">
            <RoseTop size={72} />
            <p>Tu carrito está vacío.</p>
            <a href="#catalogo" className="button button--ghost" onClick={handleClose}>
              Ver el catálogo
            </a>
          </div>
        ) : step === "checkout" ? (
          <form className="checkout" onSubmit={placeOrder} noValidate>
            <div className="checkout__fields">
              <Field id="c-name" label="Nombre" value={customer.name} error={errors.name} onChange={(v) => update("name", v)} autoComplete="name" />
              <Field id="c-phone" label="Teléfono" type="tel" value={customer.phone} error={errors.phone} onChange={(v) => update("phone", v)} autoComplete="tel" />
              <Field id="c-address" label="Dirección" value={customer.address} error={errors.address} onChange={(v) => update("address", v)} autoComplete="street-address" placeholder="Calle 00 # 00-00, apto…" />
              <Field id="c-neighborhood" label="Barrio" value={customer.neighborhood} error={errors.neighborhood} onChange={(v) => update("neighborhood", v)} />
              <Field id="c-notes" label="Indicaciones (opcional)" value={customer.notes} onChange={(v) => update("notes", v)} placeholder="Torre, portería, punto de referencia…" />

              <fieldset className="checkout__methods">
                <legend>Forma de pago</legend>
                {options.nequi && (
                  <label className="checkout__method">
                    <input type="radio" name="method" checked={method === "nequi"} onChange={() => setMethod("nequi")} />
                    <span>
                      <strong>Transferencia por Nequi</strong>
                      <small>Al enviar el pedido te mostramos el número y el valor a transferir.</small>
                    </span>
                  </label>
                )}
                {options.wompi && (
                  <label className="checkout__method">
                    <input type="radio" name="method" checked={method === "wompi"} onChange={() => setMethod("wompi")} />
                    <span>
                      <strong>Pagar en línea con Wompi</strong>
                      <small>Tarjeta, PSE o Nequi.{options.sandbox ? " Modo de prueba: no se cobra dinero real." : ""}</small>
                    </span>
                  </label>
                )}
                <label className="checkout__method">
                  <input type="radio" name="method" checked={method === "efectivo"} onChange={() => setMethod("efectivo")} />
                  <span>
                    <strong>Efectivo contra entrega</strong>
                    <small>Pagas cuando recibes tu pedido.</small>
                  </span>
                </label>
              </fieldset>
            </div>

            <footer className="cart__footer">
              <div className="cart__line">
                <span>Productos</span>
                <span>{formatPrice(totals.price)}</span>
              </div>
              <div className="cart__line">
                <span>Domicilio</span>
                <span>{formatPrice(options.deliveryFee)}</span>
              </div>
              <div className="cart__total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button type="submit" className="button button--primary button--block" disabled={status.type === "sending"}>
                {status.type === "sending" ? status.text : method === "wompi" ? `Pagar ${formatPrice(total)}` : `Enviar pedido · ${formatPrice(total)}`}
              </button>
              {status.type === "error" && (
                <p className="form-status form-status--error" role="status">
                  {status.text}
                </p>
              )}
            </footer>
          </form>
        ) : (
          <>
            <ul className="cart__items">
              {items.map((item) => (
                <li key={item.key} className="cart__item">
                  <div className="cart__item-info">
                    <p className="cart__item-name">{item.name}</p>
                    {item.details && <p className="cart__item-details">{item.details}</p>}
                    <p className="cart__item-price">{formatPrice(item.price)} c/u</p>
                  </div>
                  <div className="cart__controls">
                    <button type="button" onClick={() => changeQuantity(item.key, -1)} aria-label={`Quitar uno de ${item.name}`}>
                      <Icon name="minus" size={16} strokeWidth={2} />
                    </button>
                    <span aria-label="Cantidad">{item.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(item.key, 1)} aria-label={`Agregar uno de ${item.name}`}>
                      <Icon name="plus" size={16} strokeWidth={2} />
                    </button>
                    <button type="button" className="cart__remove" onClick={() => removeItem(item.key)} aria-label={`Eliminar ${item.name}`}>
                      <Icon name="trash" size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="cart__footer">
              <div className="cart__total">
                <span>Subtotal</span>
                <strong>{formatPrice(totals.price)}</strong>
              </div>
              <button type="button" className="button button--primary button--block" onClick={() => setStep("checkout")}>
                Pedir a domicilio
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function Field({ id, label, value, onChange, error, ...props }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={Boolean(error)} {...props} />
      {error && <small className="field__error">{error}</small>}
    </div>
  );
}
