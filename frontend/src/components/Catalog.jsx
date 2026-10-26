import { useState } from "react";
import { useCatalog } from "../context/CatalogContext";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";
import Icon from "./Icons";
import SectionTitle from "./SectionTitle";
import "../styles/catalog.css";

export default function Catalog() {
  const { categories } = useCatalog();
  const [activeId, setActiveId] = useState(categories[0].id);
  const [justAdded, setJustAdded] = useState(null);
  const { addItem } = useCart();
  const active = categories.find((c) => c.id === activeId);

  function handleAdd(product) {
    addItem({ name: product.name, price: product.price });
    setJustAdded(product.name);
    setTimeout(() => setJustAdded((name) => (name === product.name ? null : name)), 1200);
  }

  return (
    <section className="catalog section" id="catalogo" aria-labelledby="catalogo-titulo">
      <SectionTitle
        id="catalogo-titulo"
        title="Nuestra carta"
        intro="Elige una categoría y agrega al carrito lo que se te antoje."
      />

      <div className="catalog__tabs" role="tablist" aria-label="Categorías">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={category.id === activeId}
            className={`catalog__tab ${category.id === activeId ? "is-active" : ""}`}
            onClick={() => setActiveId(category.id)}
          >
            <Icon name={category.icon} size={22} />
            {category.name}
          </button>
        ))}
      </div>

      <div className="catalog__sheet" role="tabpanel" aria-label={active.name}>
        <header className="catalog__header">
          <span className="catalog__stamp">
            <Icon name={active.icon} size={34} strokeWidth={1.3} />
          </span>
          <div>
            <h3>{active.name}</h3>
            <p>{active.description}</p>
          </div>
        </header>

        {active.products.length === 0 && (
          <p className="catalog__empty">Por ahora no hay productos en esta categoría.</p>
        )}

        <ul className="catalog__list">
          {active.products.map((product) => (
            <li key={product.id || product.name} className="catalog__item">
              <div className="catalog__line">
                <span className="catalog__name">{product.name}</span>
                <span className="catalog__dots" aria-hidden="true" />
                <span className="catalog__price">{formatPrice(product.price)}</span>
              </div>
              <p className="catalog__desc">{product.description}</p>
              <button
                type="button"
                className={`catalog__add ${justAdded === product.name ? "is-added" : ""}`}
                onClick={() => handleAdd(product)}
                aria-label={`Agregar ${product.name} al carrito`}
              >
                <Icon name={justAdded === product.name ? "check" : "plus"} size={18} strokeWidth={2} />
                <span>{justAdded === product.name ? "Agregado" : "Agregar"}</span>
              </button>
            </li>
          ))}
        </ul>

        {active.customizable && (
          <p className="catalog__hint">
            ¿Lo quieres con otra leche, más grande o con jarabe? <a href="#personaliza">Personalízalo aquí</a>.
          </p>
        )}
      </div>
    </section>
  );
}
