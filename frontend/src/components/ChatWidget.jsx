// =====================================================
// ASISTENTE DE DALY'S COFFEE
// Versión actual: recomendaciones fijas (las mismas de tu script.js).
// Siguiente paso: conectarlo con Gemini a través del backend
// (POST /api/chat) para que responda preguntas escritas.
// =====================================================
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { findProduct } from "../data/products";
import { formatPrice } from "../lib/format";
import Icon from "./Icons";
import "../styles/chat.css";

const options = [
  { id: "coffee", label: "Algo con café", product: "Cappuccino", reason: "Un clásico cremoso y equilibrado, perfecto si amas el sabor del café." },
  { id: "sweet", label: "Algo dulce", product: "Café Nutella", reason: "Dulce, cremoso y con chocolate. Ideal para darte un gustico." },
  { id: "cold", label: "Algo frío", product: "Iced Moca", reason: "Frío, refrescante y con café y chocolate." },
  { id: "special", label: "Algo diferente", product: "Pink Velvet Latte", reason: "Rosado, dulce y con el toque especial de la casa." },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const product = choice ? findProduct(choice.product) : null;

  function choose(option) {
    setChoice(option);
    setAdded(false);
  }

  return (
    <div className={`chat ${open ? "is-open" : ""}`}>
      {open && (
        <section className="chat__panel" aria-label="Asistente de Daly's Coffee">
          <header className="chat__header">
            <div>
              <strong>Asistente de Daly's</strong>
              <small>Te ayudo a elegir tu bebida</small>
            </div>
            <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Cerrar asistente">
              <Icon name="close" size={22} />
            </button>
          </header>

          <div className="chat__body">
            <p className="chat__bubble">¡Hola! ¿Qué se te antoja hoy?</p>
            <div className="chat__options">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={choice?.id === option.id ? "is-active" : ""}
                  onClick={() => choose(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {product && (
              <div className="chat__result" aria-live="polite">
                <p className="chat__bubble">Te recomiendo:</p>
                <div className="chat__card">
                  <p className="chat__product">{product.name}</p>
                  <p>{choice.reason}</p>
                  <p className="chat__price">{formatPrice(product.price)}</p>
                  <button
                    type="button"
                    className="button button--primary button--small"
                    onClick={() => {
                      addItem({ name: product.name, price: product.price });
                      setAdded(true);
                    }}
                  >
                    {added ? "Agregado al carrito" : "Agregar al carrito"}
                  </button>
                </div>
              </div>
            )}
          </div>
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
