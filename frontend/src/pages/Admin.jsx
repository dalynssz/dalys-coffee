// =====================================================
// PANEL DE ADMINISTRACIÓN
// Solo funciona con sesión iniciada: el backend revisa el
// token en cada petición (si no es válido, responde 401).
//  - Mensajes: ver, marcar como leído y borrar
//  - Catálogo: crear, editar, ocultar y borrar productos
// =====================================================
import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../lib/api";
import { navigate } from "../lib/router";
import { useCatalog } from "../context/CatalogContext";
import { categories } from "../data/products";
import { formatPrice } from "../lib/format";
import { RoseTop } from "../components/Ornaments";
import Icon from "../components/Icons";
import "../styles/auth.css";
import "../styles/admin.css";

export default function Admin({ token, onLogout }) {
  const [username, setUsername] = useState("");
  const [tab, setTab] = useState("messages");
  const [error, setError] = useState("");

  // Comprobamos con el servidor que la sesión sigue activa
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    apiRequest("/api/auth/me", { auth: true })
      .then((data) => setUsername(data.username))
      .catch((err) => {
        if (err.status === 401) onLogout("/login");
        else setError(err.message);
      });
  }, [token, onLogout]);

  if (!token) return null;

  return (
    <main className="admin">
      <header className="admin__header">
        <RoseTop size={56} />
        <div>
          <h1>Panel de administración</h1>
          <p>{username ? `Hola, ${username}.` : "Comprobando tu sesión..."}</p>
        </div>
        <button type="button" className="button button--ghost" onClick={() => onLogout("/")}>
          <Icon name="logout" size={18} />
          Cerrar sesión
        </button>
      </header>

      {error && <p className="form-status form-status--error">{error}</p>}

      <div className="admin__tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === "messages"} className={tab === "messages" ? "is-active" : ""} onClick={() => setTab("messages")}>
          <Icon name="mail" size={20} /> Mensajes
        </button>
        <button type="button" role="tab" aria-selected={tab === "products"} className={tab === "products" ? "is-active" : ""} onClick={() => setTab("products")}>
          <Icon name="hot" size={20} /> Catálogo
        </button>
      </div>

      {username && (tab === "messages" ? <Messages onLogout={onLogout} /> : <Products onLogout={onLogout} />)}
    </main>
  );
}

// ---------------------------------------------------------------
// MENSAJES DE CONTACTO
// ---------------------------------------------------------------
function Messages({ onLogout }) {
  const [messages, setMessages] = useState(null);
  const [status, setStatus] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const handleError = useCallback(
    (err) => (err.status === 401 ? onLogout("/login") : setStatus(err.message)),
    [onLogout]
  );

  const load = useCallback(() => {
    apiRequest("/api/contact", { auth: true }).then(setMessages).catch(handleError);
  }, [handleError]);

  useEffect(load, [load]);

  async function toggleRead(message) {
    try {
      const updated = await apiRequest(`/api/contact/${message._id}`, {
        method: "PATCH",
        auth: true,
        body: { read: !message.read },
      });
      setMessages((list) => list.map((m) => (m._id === updated._id ? updated : m)));
    } catch (err) {
      handleError(err);
    }
  }

  async function remove(id) {
    try {
      await apiRequest(`/api/contact/${id}`, { method: "DELETE", auth: true });
      setMessages((list) => list.filter((m) => m._id !== id));
      setConfirmId(null);
    } catch (err) {
      handleError(err);
    }
  }

  if (!messages) return <p className="admin__empty">{status || "Cargando mensajes..."}</p>;

  const unread = messages.filter((m) => !m.read).length;

  return (
    <section aria-label="Mensajes de contacto">
      <p className="admin__summary">
        {messages.length} mensajes · {unread} sin leer
      </p>
      {status && <p className="form-status form-status--error">{status}</p>}
      {messages.length === 0 && (
        <p className="admin__empty">Todavía no llegan mensajes. Cuando alguien use el formulario de contacto, aparecerá aquí.</p>
      )}
      <ul className="admin__messages">
        {messages.map((m) => (
          <li key={m._id} className={`message ${m.read ? "" : "is-unread"}`}>
            <div className="message__head">
              <strong>{m.name}</strong>
              <a href={`mailto:${m.email}`}>{m.email}</a>
              <time dateTime={m.createdAt}>
                {new Date(m.createdAt).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" })}
              </time>
            </div>
            <p className="message__text">{m.message}</p>
            <div className="message__actions">
              <button type="button" className="button button--ghost button--small" onClick={() => toggleRead(m)}>
                <Icon name="check" size={16} /> {m.read ? "Marcar como no leído" : "Marcar como leído"}
              </button>
              {confirmId === m._id ? (
                <>
                  <button type="button" className="button button--primary button--small" onClick={() => remove(m._id)}>
                    Sí, borrar
                  </button>
                  <button type="button" className="link-button" onClick={() => setConfirmId(null)}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button type="button" className="link-button" onClick={() => setConfirmId(m._id)}>
                  Borrar
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------
// CATÁLOGO
// ---------------------------------------------------------------
const emptyProduct = { name: "", price: "", description: "", category: categories[0].id, available: true };

function Products({ onLogout }) {
  const { reload } = useCatalog();
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState(categories[0].id);
  const [editing, setEditing] = useState(null); // null | producto (con _id para editar, sin _id para crear)
  const [status, setStatus] = useState({ type: "", text: "" });
  const [confirmId, setConfirmId] = useState(null);

  const handleError = useCallback(
    (err) => (err.status === 401 ? onLogout("/login") : setStatus({ type: "error", text: err.message })),
    [onLogout]
  );

  const load = useCallback(() => {
    apiRequest("/api/products").then(setProducts).catch(handleError);
  }, [handleError]);

  useEffect(load, [load]);

  async function save(event) {
    event.preventDefault();
    const isNew = !editing._id;
    try {
      const saved = await apiRequest(isNew ? "/api/products" : `/api/products/${editing._id}`, {
        method: isNew ? "POST" : "PUT",
        auth: true,
        body: { ...editing, price: Number(editing.price) },
      });
      setProducts((list) => (isNew ? [...list, saved] : list.map((p) => (p._id === saved._id ? saved : p))));
      setFilter(saved.category);
      setEditing(null);
      setStatus({ type: "success", text: isNew ? `Creamos "${saved.name}".` : `Guardamos los cambios de "${saved.name}".` });
      reload();
    } catch (err) {
      handleError(err);
    }
  }

  async function toggleAvailable(product) {
    try {
      const saved = await apiRequest(`/api/products/${product._id}`, {
        method: "PUT",
        auth: true,
        body: { available: !product.available },
      });
      setProducts((list) => list.map((p) => (p._id === saved._id ? saved : p)));
      reload();
    } catch (err) {
      handleError(err);
    }
  }

  async function remove(product) {
    try {
      await apiRequest(`/api/products/${product._id}`, { method: "DELETE", auth: true });
      setProducts((list) => list.filter((p) => p._id !== product._id));
      setConfirmId(null);
      setStatus({ type: "success", text: `Borramos "${product.name}".` });
      reload();
    } catch (err) {
      handleError(err);
    }
  }

  if (!products) return <p className="admin__empty">{status.text || "Cargando productos..."}</p>;

  const visible = products.filter((p) => p.category === filter);

  return (
    <section aria-label="Gestión del catálogo">
      <div className="admin__toolbar">
        <div className="field">
          <label htmlFor="filter">Categoría</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({products.filter((p) => p.category === c.id).length})
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="button button--primary"
          onClick={() => {
            setEditing({ ...emptyProduct, category: filter });
            setStatus({ type: "", text: "" });
          }}
        >
          <Icon name="plus" size={18} /> Nuevo producto
        </button>
      </div>

      {status.text && <p className={`form-status form-status--${status.type}`}>{status.text}</p>}

      {editing && (
        <form className="admin__form" onSubmit={save}>
          <h2>{editing._id ? `Editar "${editing.name}"` : "Nuevo producto"}</h2>
          <div className="admin__form-grid">
            <div className="field">
              <label htmlFor="p-name">Nombre</label>
              <input id="p-name" required maxLength={80} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="p-price">Precio (COP)</label>
              <input id="p-price" type="number" min="0" step="500" required value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="p-category">Categoría</label>
              <select id="p-category" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="field field--full">
              <label htmlFor="p-desc">Descripción</label>
              <input id="p-desc" maxLength={200} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </div>
          </div>
          <label className="admin__check">
            <input type="checkbox" checked={editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} />
            Visible en la carta
          </label>
          <div className="admin__form-actions">
            <button type="submit" className="button button--primary">
              {editing._id ? "Guardar cambios" : "Crear producto"}
            </button>
            <button type="button" className="button button--ghost" onClick={() => setEditing(null)}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {visible.length === 0 && <p className="admin__empty">No hay productos en esta categoría.</p>}

      <ul className="admin__products">
        {visible.map((p) => (
          <li key={p._id} className={p.available ? "" : "is-hidden"}>
            <div className="admin__product-info">
              <strong>{p.name}</strong>
              <span>{formatPrice(p.price)}</span>
              {!p.available && <em>Oculto</em>}
            </div>
            <div className="admin__product-actions">
              <button type="button" className="link-button" onClick={() => toggleAvailable(p)}>
                {p.available ? "Ocultar" : "Mostrar"}
              </button>
              <button type="button" className="link-button" onClick={() => { setEditing({ ...p }); setStatus({ type: "", text: "" }); }}>
                Editar
              </button>
              {confirmId === p._id ? (
                <>
                  <button type="button" className="button button--primary button--small" onClick={() => remove(p)}>
                    Sí, borrar
                  </button>
                  <button type="button" className="link-button" onClick={() => setConfirmId(null)}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button type="button" className="link-button" onClick={() => setConfirmId(p._id)}>
                  Borrar
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
