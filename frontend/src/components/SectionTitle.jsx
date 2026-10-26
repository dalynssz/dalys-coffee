import { Flourish } from "./Ornaments";

export default function SectionTitle({ title, intro, id }) {
  return (
    <div className="section-title">
      <h2 id={id}>{title}</h2>
      <Flourish className="section-title__flourish" />
      {intro && <p>{intro}</p>}
    </div>
  );
}
