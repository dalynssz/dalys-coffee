// =====================================================
// PANEL DE ADMINISTRACIÓN
// Solo se ve con sesión iniciada. Aquí irán:
//  - Mensajes recibidos desde el formulario de contacto
//  - Gestión del catálogo (crear, editar y borrar productos)
// Se conectan cuando el backend tenga la base de datos.
// =====================================================
import { useEffect } from "react";
import { navigate } from "../lib/router";
import { RoseTop } from "../components/Ornaments";
import Icon from "../components/Icons";
import "../styles/auth.css";

export default function Admin({ token, onLogout }) {
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  if (!token) return null;

  return (
    <main className="admin">
      <header className="admin__header">
        <RoseTop size={56} />
        <div>
          <h1>Panel de administración</h1>
          <p>Gestiona los mensajes y el catálogo de Daly's Coffee.</p>
        </div>
        <button type="button" className="button button--ghost" onClick={onLogout}>
          <Icon name="logout" size={18} />
          Cerrar sesión
        </button>
      </header>

      <div className="admin__grid">
        <section className="admin__panel">
          <h2>
            <Icon name="mail" size={22} /> Mensajes de contacto
          </h2>
          <p>Aquí aparecerán los mensajes que lleguen desde el formulario.</p>
        </section>
        <section className="admin__panel">
          <h2>
            <Icon name="hot" size={22} /> Catálogo
          </h2>
          <p>Aquí podrás crear, editar y borrar productos.</p>
        </section>
      </div>
    </main>
  );
}
