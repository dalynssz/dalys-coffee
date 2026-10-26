import { RoseBranch } from "./Ornaments";
import SectionTitle from "./SectionTitle";
import "../styles/about.css";

export default function About() {
  return (
    <section className="about section" id="nosotros" aria-labelledby="nosotros-titulo">
      <div className="about__frame" aria-hidden="true">
        <RoseBranch className="about__branch" />
      </div>
      <div className="about__text">
        <SectionTitle id="nosotros-titulo" title="Sobre nosotros" />
        <p>
          Daly's Coffee nació de las ganas de tener un lugar bonito para tomarse un café sin afán: tazas de
          porcelana, flores en la mesa y bebidas preparadas al gusto de cada persona.
        </p>
        <p>
          Trabajamos con café colombiano, horneamos la panadería cada mañana y te dejamos personalizar tu
          bebida: la leche, el tamaño, el dulce y los extras los eliges tú.
        </p>
        <dl className="about__facts">
          <div>
            <dt>Dónde</dt>
            <dd>Barranquilla, Colombia</dd>
          </div>
          <div>
            <dt>En la carta</dt>
            <dd>Más de 80 productos</dd>
          </div>
          <div>
            <dt>A tu gusto</dt>
            <dd>6 tipos de leche y 11 extras</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
