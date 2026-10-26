import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import { CatalogProvider } from "./context/CatalogContext";
import App from "./App";
import "./styles/base.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CatalogProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CatalogProvider>
  </StrictMode>
);
