import { RoseBranch } from "./Ornaments";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <RoseBranch className="footer__branch footer__branch--left" />
      <RoseBranch className="footer__branch footer__branch--right" flip />
      <p className="footer__brand">Daly's Coffee</p>
      <p className="footer__tagline">Café, dulces y momentos bonitos.</p>
      <nav className="footer__links" aria-label="Redes sociales">
        <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://tiktok.com/" target="_blank" rel="noreferrer">TikTok</a>
        <a href="https://facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
      </nav>
      <p className="footer__legal">
        © {new Date().getFullYear()} Daly's Coffee · <a href="#/admin">Administración</a>
      </p>
    </footer>
  );
}
