// =====================================================
// ASISTENTE CON IA (Google Gemini)
// POST /api/chat  { messages: [{ role: "user" | "model", text }] }
//
// La clave de Gemini vive SOLO aquí, en el servidor (.env).
// El navegador nunca la ve.
// =====================================================
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Modelo principal y modelo de respaldo (si el principal está saturado)
const MODELS = [
  process.env.GEMINI_MODEL || "gemini-flash-latest",
  process.env.GEMINI_FALLBACK_MODEL || "gemini-flash-lite-latest",
];
const apiUrl = (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Errores pasajeros de Google (saturación o falla momentánea): vale la pena reintentar
const TEMPORARY = [429, 500, 503];

// Le pregunta a Gemini. Si el modelo está saturado, reintenta y luego usa el de respaldo.
async function askGemini(payload) {
  let last = { ok: false, status: 0, data: {} };
  for (const model of [MODELS[0], MODELS[0], MODELS[1]]) {
    try {
      const response = await fetch(apiUrl(model), {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(12000), // máximo 12 segundos por intento
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) return { ok: true, status: 200, data };
      last = { ok: false, status: response.status, data };
      console.error(`Error de Gemini con ${model} (${response.status}):`, data?.error?.message || data);
      if (!TEMPORARY.includes(response.status)) break; // error de configuración: no tiene sentido reintentar
    } catch (error) {
      last = { ok: false, status: 0, data: {} };
      const reason = error.name === "TimeoutError" ? "tardó demasiado en responder" : error.message;
      console.error(`No se pudo conectar con Gemini (${model}): ${reason}`);
    }
    await wait(800);
  }
  return last;
}

const CATEGORY_NAMES = {
  calientes: "Cafés calientes",
  frios: "Cafés fríos",
  especiales: "Bebidas especiales",
  nieves: "Nieves",
  frappes: "Frappés",
  tes: "Tés",
  refrescantes: "Bebidas refrescantes",
  panaderia: "Panadería",
  postres: "Postres",
  combos: "Combos",
};

// ---------- Límite sencillo: 15 preguntas cada 10 minutos por persona ----------
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 15;
const hits = new Map();

function tooManyRequests(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

// ---------- Instrucciones para Gemini, con la carta real de la base de datos ----------
function buildInstructions(products) {
  const menu = Object.entries(CATEGORY_NAMES)
    .map(([id, name]) => {
      const items = products
        .filter((p) => p.category === id)
        .map((p) => `- ${p.name} ($${p.price.toLocaleString("es-CO")}): ${p.description}`)
        .join("\n");
      return items ? `${name}:\n${items}` : "";
    })
    .filter(Boolean)
    .join("\n\n");

  return `Eres el asistente virtual de Daly's Coffee, una cafetería romántica y floral en Barranquilla, Colombia.
Tu trabajo es ayudar a los clientes a elegir bebidas y postres de la carta, y responder dudas sobre la cafetería.

Reglas:
- Responde siempre en español, con un tono cálido, cercano y breve (máximo 4 frases).
- Recomienda SOLO productos que estén en la carta de abajo, con su nombre exacto y su precio.
- Si te piden algo que no está en la carta, dilo con amabilidad y sugiere la opción más parecida.
- Las bebidas calientes, frías, especiales, nieves y frappés se pueden personalizar en la sección "Crea tu bebida" (leche, tamaño, endulzante, jarabes y extras).
- No inventes promociones, ingredientes, alérgenos ni datos que no estén aquí. Si no sabes algo, sugiere escribir por el formulario de contacto.
- Si la pregunta no tiene nada que ver con la cafetería, redirige la conversación con amabilidad.

Datos de la cafetería:
- Ubicación: Barranquilla, Colombia.
- Horario: lunes a sábado, 7:00 a.m. – 8:00 p.m.
- Correo: dalyscoffee@gmail.com · Redes: @dalyscoffee

Carta actual:
${menu}`;
}

// Busca qué productos de la carta mencionó la respuesta (para mostrar botón "Agregar")
function findMentioned(reply, products) {
  const text = reply.toLowerCase();
  return products
    .filter((p) => text.includes(p.name.toLowerCase()))
    .sort((a, b) => b.name.length - a.name.length)
    .filter((p, i, list) => !list.slice(0, i).some((q) => q.name.toLowerCase().includes(p.name.toLowerCase())))
    .slice(0, 3)
    .map((p) => ({ name: p.name, price: p.price }));
}

router.post("/", async (req, res) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ mensaje: "El asistente con IA todavía no está configurado en el servidor." });
  }

  if (tooManyRequests(req.ip)) {
    return res.status(429).json({ mensaje: "Hiciste muchas preguntas seguidas. Espera unos minutos y vuelve a intentarlo." });
  }

  // Validamos la conversación que manda el navegador
  const raw = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = raw
    .filter((m) => (m.role === "user" || m.role === "model") && typeof m.text === "string" && m.text.trim())
    .slice(-10) // solo los últimos 10 mensajes
    .map((m) => ({ role: m.role, parts: [{ text: m.text.trim().slice(0, 500) }] }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ mensaje: "Escribe una pregunta." });
  }

  const products = await Product.find({ available: true }).sort({ category: 1, order: 1 });

  const result = await askGemini({
    systemInstruction: { parts: [{ text: buildInstructions(products) }] },
    contents: messages,
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
  });

  if (!result.ok) {
    const mensaje = TEMPORARY.includes(result.status) || result.status === 0
      ? "El asistente está muy solicitado en este momento. Inténtalo de nuevo en un minuto."
      : "El asistente no pudo responder en este momento. Inténtalo más tarde.";
    return res.status(502).json({ mensaje });
  }

  const data = result.data;
  const reply = (data.candidates?.[0]?.content?.parts || [])
    .map((part) => part.text || "")
    .join("")
    .trim();

  if (!reply) {
    return res.status(502).json({ mensaje: "El asistente no supo qué responder. Intenta preguntarlo de otra forma." });
  }

  res.json({ reply, products: findMentioned(reply, products) });
});

module.exports = router;
