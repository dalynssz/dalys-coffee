// =====================================================
// ASISTENTE DE DALY'S COFFEE (IA con Google Gemini)
// El navegador manda la conversación a nuestro backend
// (POST /api/chat) y el backend le pregunta a Gemini.
// Así la clave de Gemini nunca queda expuesta en la página.
// =====================================================
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { apiRequest } from "../lib/api";
import { formatPrice } from "../lib/format";
import Icon from "./Icons";
import "../styles/chat.css";

const GREETING = {
  role: "model",
  text: "¡Hola! Soy el asistente de Daly's Coffee. Cuéntame qué se te antoja y te recomiendo algo de la carta.",
  local: true, // este saludo no se envía a la IA
};

const SUGGESTIONS = [
  "Recomiéndame algo con café",
  "Quiero algo frío y dulce",
  "¿Qué tienen sin café?",
  "¿Cuál es el horario?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(null);
  const { addItem } = useCart();
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Bajar al último mensaje cada vez que llega uno nuevo
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text) {
    const question = text.trim();
    if (!question || loading) return;

    const next = [...messages, { role: "user", text: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const data = await apiRequest("/api/chat", {
        method: "POST",
        body: {
          messages: next.filter((m) => !m.local && !m.error).map(({ role, text }) => ({ role, text })),
        },
      });
      setMessages((list) => [...list, { role: "model", text: data.reply, products: data.products }]);
    } catch (error) {
      setMessages((list) => [...list, { role: "model", text: error.message, error: true }]);
    } finally {
      setLoading(false);
    }
  }

  function handleAdd(product) {
    addItem({ name: product.name, price: product.price });
    setAdded(product.name);
    setTimeout(() => setAdded((name) => (name === product.name ? null : name)), 1500);
  }

  return (
    <div className={`chat ${open ? "is-open" : ""}`}>
      {open && (
        <section className="chat__panel" aria-label="Asistente de Daly's Coffee">
          <header className="chat__header">
            <div>
              <strong>Asistente de Daly's</strong>
              <small>Con inteligencia artificial · Gemini</small>
            </div>
            <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Cerrar asistente">
              <Icon name="close" size={22} />
            </button>
          </header>

          <div className="chat__body" ref={bodyRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`chat__row chat__row--${m.role}`}>
                <p className={`chat__bubble ${m.role === "user" ? "chat__bubble--user" : ""} ${m.error ? "chat__bubble--error" : ""}`}>
                  {m.text}
                </p>
                {m.products?.length > 0 && (
                  <div className="chat__products">
                    {m.products.map((p) => (
                      <div key={p.name} className="chat__card">
                        <div>
                          <p className="chat__product">{p.name}</p>
                          <p className="chat__price">{formatPrice(p.price)}</p>
                        </div>
                        <button type="button" className="button button--primary button--small" onClick={() => handleAdd(p)}>
                          {added === p.name ? "Agregado" : "Agregar"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && <p className="chat__bubble chat__typing">Escribiendo…</p>}

            {messages.length === 1 && !loading && (
              <div className="chat__options">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="chat-input" className="visually-hidden">
              Escribe tu pregunta
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              maxLength={500}
              placeholder="Escribe tu pregunta…"
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="chat__send" disabled={loading || !input.trim()} aria-label="Enviar pregunta">
              <Icon name="send" size={20} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente"}
      >
        <Icon name={open ? "close" : "chat"} size={28} />
      </button>
    </div>
  );
}
