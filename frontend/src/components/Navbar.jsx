import { useState } from "react";
import Icon from "./Icons";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#personaliza", label: "Personaliza" },
  { href: "#contacto", label: "Contacto" },
  { href: "#/admin", label: "Admin" },
];

export default function Navbar({ isLoggedIn, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totals, openCart } = useCart();
  const close = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Principal">
        <a href="#inicio" className="navbar__logo" onClick={close}>
          Daly's Coffee
        </a>

        <div className={`navbar__menu ${menuOpen ? "is-open" : ""}`} id="menu-principal">
          <ul className="navbar__links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {isLoggedIn ? (
            <button
              type="button"
              className="button button--ghost navbar__session"
              onClick={() => {
                close();
                onLogout();
              }}
            >
              <Icon name="logout" size={18} />
              Cerrar sesión
            </button>
          ) : (
            <a href="#/login" className="button button--ghost navbar__session" onClick={close}>
              <Icon name="lock" size={18} />
              Iniciar sesión
            </a>
          )}
        </div>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__bag"
            onClick={openCart}
            aria-label={`Abrir carrito, ${totals.count} productos`}
          >
            <Icon name="bag" size={24} />
            {totals.count > 0 && <span className="navbar__count">{totals.count}</span>}
          </button>

          <button
            type="button"
            className="navbar__toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={26} />
          </button>
        </div>
      </nav>
    </header>
  );
}
