import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import Icon from "./Icons";
import { RoseTop } from "./Ornaments";
import "../styles/cart.css";

export default function CartDrawer() {
  const { items, totals, isOpen, closeCart, changeQuantity, removeItem, clearCart } = useCart();
  const [confirmed, setConfirmed] = useState(null);

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  function confirmOrder() {
    setConfirmed({ items, total: totals.price });
    clearCart();
  }

  function handleClose() {
    setConfirmed(null);
    closeCart();
  }

  return (
    <div className={`cart ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <div className="cart__backdrop" onClick={handleClose} />
      <aside className="cart__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart__header">
          <h2 id="cart-title">{confirmed ? "Pedido listo" : "Tu carrito"}</h2>
          <button type="button" className="icon-button" onClick={handleClose} aria-label="Cerrar carrito">
            <Icon name="close" size={24} />
          </button>
        </header>

        {confirmed ? (
          <div className="cart__confirmed">
            <RoseTop size={72} />
            <p>Este es el resumen de tu pedido. Muéstralo en caja para pagar y te lo preparamos.</p>
            <ul className="cart__summary">
              {confirmed.items.map((item) => (
                <li key={item.key}>
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="cart__total">
              <span>Total</span>
              <strong>{formatPrice(confirmed.total)}</strong>
            </div>
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
                    <button
                      type="button"
                      className="cart__remove"
                      onClick={() => removeItem(item.key)}
                      aria-label={`Eliminar ${item.name}`}
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <footer className="cart__footer">
              <div className="cart__total">
                <span>Total</span>
                <strong>{formatPrice(totals.price)}</strong>
              </div>
              <button type="button" className="button button--primary button--block" onClick={confirmOrder}>
                Confirmar pedido
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
