import { useEffect } from "react";
import Hero from "../components/Hero";
import Catalog from "../components/Catalog";
import Customizer from "../components/Customizer";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  // Si llegamos desde otra página con un enlace como #catalogo,
  // bajamos a esa sección cuando ya está dibujada.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && !id.startsWith("/")) {
      document.getElementById(id)?.scrollIntoView();
    }
  }, []);

  return (
    <main>
      <Hero />
      <Catalog />
      <Customizer />
      <About />
      <Contact />
    </main>
  );
}
