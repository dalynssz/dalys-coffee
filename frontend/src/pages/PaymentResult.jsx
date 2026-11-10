// =====================================================
// RESULTADO DEL PAGO
// Wompi devuelve al cliente a la página con ?id=<transacción>.
// Le pedimos al servidor que confirme el estado real con Wompi.
// =====================================================
import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/format";
import { RoseTop } from "../components/Ornaments";
import "../styles/auth.css";

const MESSAGES = {
  pagado: { title: "¡Pago aprobado!", text: "Ya estamos preparando tu pedido. Te lo llevamos a domicilio." },
  rechazado: { title: "El pago no se aprobó", text: "No se hizo ningún cobro. Puedes intentarlo de nuevo o pagar en efectivo al recibir." },
  pendiente: { title: "Pago en proceso", text: "Wompi todavía está confirmando tu pago. Recarga esta página en unos minutos." },
};

export default function PaymentResult({ transactionId }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const { clearCart } = useCart();

  useEffect(() => {
    apiRequest(`/api/orders/verify/${encodeURIComponent(transactionId)}`)
      .then((data) => {
        setOrder(data);
        if (data.status === "pagado") clearCart();
      })
      .catch((err) => setError(err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  function goHome() {
    window.history.replaceState(null, "", window.location.pathname);
    window.location.hash = "/";
    window.dispatchEvent(new Event("paymentdone"));
  }

  const msg = order ? MESSAGES[order.status] || MESSAGES.pendiente : null;

  return (
    <main className="auth">
      <div className="auth__card payment">
        <RoseTop size={84} className="auth__rose" />
        {!order && !error && <h1>Confirmando tu pago…</h1>}
        {error && (
          <>
            <h1>No pudimos confirmar</h1>
            <p className="auth__lead">{error}</p>
          </>
        )}
        {order && (
          <>
            <h1>{msg.title}</h1>
            <p className="auth__lead">{msg.text}</p>
            <p className="payment__ref">
              Pedido <strong>{order.reference}</strong>
            </p>
            <ul className="cart__summary">
              {order.items.map((item, i) => (
                <li key={i}>
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="cart__total">
              <span>Total</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
            <p className="payment__address">
              Entrega para {order.customer.name}: {order.customer.address}, {order.customer.neighborhood}
            </p>
          </>
        )}
        <button type="button" className="button button--primary button--block" onClick={goHome}>
          Volver a Daly's Coffee
        </button>
      </div>
    </main>
  );
}
