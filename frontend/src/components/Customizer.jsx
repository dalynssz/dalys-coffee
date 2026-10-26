import { useState } from "react";
import { useCatalog } from "../context/CatalogContext";
import { milks, sizes, sweeteners, syrups, extras, temperatures } from "../data/customization";
import { formatPrice } from "../lib/format";
import { useCart } from "../context/CartContext";
import SectionTitle from "./SectionTitle";
import Icon from "./Icons";
import "../styles/customizer.css";

const coldCategories = ["frios", "nieves", "frappes"];

function priceLabel(price) {
  return price > 0 ? `+${formatPrice(price)}` : "";
}

export default function Customizer() {
  const { categories, findProduct } = useCatalog();
  const baseCategories = categories.filter((c) => c.customizable && c.products.length > 0);
  const [chosenBase, setBase] = useState("Cappuccino");
  const [milk, setMilk] = useState(milks[0].name);
  const [size, setSize] = useState(sizes[0].name);
  const [sweetener, setSweetener] = useState(sweeteners[0].name);
  const [chosenSyrups, setChosenSyrups] = useState([]);
  const [chosenExtras, setChosenExtras] = useState([]);
  const [temperature, setTemperature] = useState("Caliente");
  const [message, setMessage] = useState("");
  const { addItem, openCart } = useCart();

  // Si el producto elegido ya no existe (lo borró el admin), usamos el primero disponible
  const baseProduct = findProduct(chosenBase) || findProduct(baseCategories[0]?.products[0]?.name);
  if (!baseProduct) return null;
  const base = baseProduct.name;
  const pick = (list, name) => list.find((option) => option.name === name);
  const sum = (list, names) => names.reduce((total, name) => total + pick(list, name).price, 0);

  const total =
    baseProduct.price +
    pick(milks, milk).price +
    pick(sizes, size).price +
    pick(sweeteners, sweetener).price +
    sum(syrups, chosenSyrups) +
    sum(extras, chosenExtras);

  function changeBase(name) {
    setBase(name);
    const product = findProduct(name);
    setTemperature(coldCategories.includes(product.category.id) ? "Fría" : "Caliente");
    setMessage("");
  }

  function toggle(list, setList, name) {
    setList(list.includes(name) ? list.filter((n) => n !== name) : [...list, name]);
    setMessage("");
  }

  const sizeInfo = pick(sizes, size);
  const details = [
    `${sizeInfo.name} ${sizeInfo.detail}`,
    milk,
    sweetener,
    temperature,
    ...chosenSyrups.map((s) => `Jarabe de ${s.toLowerCase()}`),
    ...chosenExtras,
  ];

  function handleAdd() {
    addItem({ name: `${base} personalizado`, price: total, details: details.join(", ") });
    setMessage(`Agregamos tu ${base} al carrito.`);
  }

  return (
    <section className="customizer section" id="personaliza" aria-labelledby="personaliza-titulo">
      <SectionTitle
        id="personaliza-titulo"
        title="Crea tu bebida"
        intro="Elige la base y ajústala a tu gusto. El precio se actualiza mientras eliges."
      />

      <div className="customizer__layout">
        <div className="customizer__options">
          <div className="field">
            <label htmlFor="base">Bebida</label>
            <select id="base" value={base} onChange={(e) => changeBase(e.target.value)}>
              {baseCategories.map((category) => (
                <optgroup key={category.id} label={category.name}>
                  {category.products.map((product) => (
                    <option key={product.name} value={product.name}>
                      {product.name} · {formatPrice(product.price)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <fieldset className="chips">
            <legend>Tamaño</legend>
            {sizes.map((option) => (
              <label key={option.name} className="chip">
                <input
                  type="radio"
                  name="size"
                  checked={size === option.name}
                  onChange={() => setSize(option.name)}
                />
                <span>
                  {option.name} <small>{option.detail} {priceLabel(option.price)}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset className="chips">
            <legend>Leche</legend>
            {milks.map((option) => (
              <label key={option.name} className="chip">
                <input
                  type="radio"
                  name="milk"
                  checked={milk === option.name}
                  onChange={() => setMilk(option.name)}
                />
                <span>
                  {option.name} <small>{priceLabel(option.price)}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <div className="customizer__row">
            <div className="field">
              <label htmlFor="sweetener">Endulzante</label>
              <select id="sweetener" value={sweetener} onChange={(e) => setSweetener(e.target.value)}>
                {sweeteners.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name} {priceLabel(option.price)}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="temperature">Temperatura</label>
              <select id="temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)}>
                {temperatures.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <fieldset className="chips">
            <legend>Jarabes y salsas</legend>
            {syrups.map((option) => (
              <label key={option.name} className="chip">
                <input
                  type="checkbox"
                  checked={chosenSyrups.includes(option.name)}
                  onChange={() => toggle(chosenSyrups, setChosenSyrups, option.name)}
                />
                <span>
                  {option.name} <small>{priceLabel(option.price)}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset className="chips">
            <legend>Extras</legend>
            {extras.map((option) => (
              <label key={option.name} className="chip">
                <input
                  type="checkbox"
                  checked={chosenExtras.includes(option.name)}
                  onChange={() => toggle(chosenExtras, setChosenExtras, option.name)}
                />
                <span>
                  {option.name} <small>{priceLabel(option.price)}</small>
                </span>
              </label>
            ))}
          </fieldset>
        </div>

        <aside className="ticket" aria-live="polite">
          <p className="ticket__title">Tu bebida</p>
          <p className="ticket__name">{base}</p>
          <p className="ticket__base">{baseProduct.description}</p>
          <ul className="ticket__details">
            {details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <div className="ticket__total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button type="button" className="button button--primary button--block" onClick={handleAdd}>
            Agregar al carrito
          </button>
          {message && (
            <p className="ticket__message">
              <Icon name="check" size={18} strokeWidth={2} /> {message}{" "}
              <button type="button" className="link-button" onClick={openCart}>
                Ver carrito
              </button>
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
