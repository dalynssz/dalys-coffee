import { CupIllustration, RoseBranch } from "./Ornaments";
import "../styles/hero.css";

// Texto de la "carta" que se ve de fondo, como en un diario antiguo
const letter = [
  "Querida tarde de café,",
  "te guardo un rincón tranquilo,",
  "una taza tibia y algo dulce",
  "para quedarnos un ratico más.",
  "Con cariño, desde Barranquilla.",
];

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__letter" aria-hidden="true">
        {letter.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__brand">Daly's Coffee</h1>
          <p className="hero__tagline">Café hecho con cariño, tazas bonitas y algo dulce para acompañar.</p>
          <p className="hero__lead">
            Más de 80 bebidas, postres y panadería en Barranquilla. Elige del catálogo o arma tu bebida a tu
            gusto.
          </p>
          <div className="hero__actions">
            <a href="#catalogo" className="button button--primary">
              Ver el catálogo
            </a>
            <a href="#personaliza" className="button button--ghost">
              Crea tu bebida
            </a>
          </div>
        </div>

        <div className="hero__cameo">
          <RoseBranch className="hero__branch hero__branch--left" />
          <div className="hero__oval">
            <CupIllustration className="hero__cup" />
          </div>
          <RoseBranch className="hero__branch hero__branch--right" flip />
        </div>
      </div>
    </section>
  );
}
