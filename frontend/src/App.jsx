import { useCallback, useState } from "react";
import { useRoute, navigate } from "./lib/router";
import { getToken, clearToken } from "./lib/api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

export default function App() {
  const path = useRoute();
  const [token, setToken] = useState(getToken);

  const handleLogout = useCallback((goTo = "/") => {
    clearToken();
    setToken(null);
    navigate(typeof goTo === "string" ? goTo : "/");
  }, []);

  let page;
  if (path === "/login") page = <Login onLogin={setToken} />;
  else if (path === "/admin") page = <Admin token={token} onLogout={handleLogout} />;
  else page = <Home />;

  return (
    <>
      <a href="#catalogo" className="skip-link">
        Saltar al catálogo
      </a>
      <Navbar isLoggedIn={Boolean(token)} onLogout={handleLogout} />
      {page}
      <Footer />
      <CartDrawer />
      <ChatWidget />
    </>
  );
}
