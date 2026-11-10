// =====================================================
// SEGUIR MI PEDIDO
// El cliente escribe su código y su teléfono y ve el estado
// que el admin le va poniendo: pendiente → pagado → en camino → entregado.
// =====================================================
import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";
import { formatPrice } from "../lib/format";
import { RoseTop } from "../components/Ornaments";
import "../styles/auth.css";

const STEPS = ["pendiente", "pagado", "en camino", "entregado"];
const LABELS = {
  pendiente: "Recibido",
  pagado: "Pagado",
  "en camino": "En camino",
  entregado: "Entregado",
};
const METHODS = { nequi: "Nequi", efectivo: "Efectivo contra entrega", wompi: "Wompi" };

function savedOrder() {
  try {
    return JSON.parse(localStorage.getItem("dalys_last_order")) || {};
  } catch {
    return {};
  }
}

export default function TrackOrder() {
  const [form, setForm] = useState(() => ({ reference: savedOrder().reference || "", phone: savedOrder().phone || "" }));
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState({ type: "", text: "" });

  async function search(event) {
    event?.preventDefault();
    if (!form.reference.trim() || !form.phone.trim()) {
      setStatus({ type: "error", text: "Escribe el código del pedido y tu teléfono." });
      return;
    }
    setStatus({ type: "sending", text: "Buscando…" });
    try {
      const params = new URLSearchParams({ reference: form.reference.trim(), phone: form.phone.trim() });
      setOrder(await apiRequest(`/api/orders/track?${params}`));
      setStatus({ type: "", text: "" });
    } catch (error) {
      setOrder(null);
      setStatus({ type: "error", text: error.message });
    }
  }

  // Si el cliente acaba de pedir desde este navegador, lo buscamos de una vez
  useEffect(() => {
    if (form.reference && form.phone) search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = order ? STEPS.indexOf(order.status) : -1;
  const closed = order && ["rechazado", "cancelado"].includes(order.status);

  return (
    <main className="auth">
      <div className="auth__card track">
        <RoseTop size={72} className="auth__rose" />
        <h1>Mi pedido</h1>
        <p className="auth__lead">Escribe el código que te dimos al pedir y tu teléfono.</p>

        <form onSubmit={search} noValidate>
          <div className="field">
            <label htmlFor="t-ref">Código del pedido</label>
            <input id="t-ref" value={form.reference} placeholder="DALYS-…" onChange={(e) => setForm({ ...form, reference: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="t-phone">Teléfono</label>
            <input id="t-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <button type="submit" className="button button--primary button--block" disabled={status.type === "sending"}>
            {status.type === "sending" ? "Buscando…" : "Consultar"}
          </button>
          {status.type === "error" && <p className="form-status form-status--error">{status.text}</p>}
        </form>

        {order && (
          <div className="track__result" aria-live="polite">
            {closed ? (
              <p className="track__closed">Este pedido está <strong>{order.status}</strong>.</p>
            ) : (
              <ol className="track__steps">
                {STEPS.map((step, i) => (
                  <li key={step} className={i <= current ? "is-done" : ""}>
                    {LABELS[step]}
                  </li>
                ))}
              </ol>
            )}
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
              <span>Total · {METHODS[order.paymentMethod]}</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
          </div>
        )}

        <a href="#inicio" className="auth__back">
          Volver a la página principal
        </a>
      </div>
    </main>
  );
}
