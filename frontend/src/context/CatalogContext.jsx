// =====================================================
// CATÁLOGO (Context de React)
// Pide los productos al backend (MongoDB). Si el servidor no
// responde, usa la copia local de data/products.js para que
// la carta nunca se vea vacía.
// =====================================================
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { categories as localCategories } from "../data/products";
import { apiRequest } from "../lib/api";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [remote, setRemote] = useState(null); // productos del servidor
  const [source, setSource] = useState("loading"); // "loading" | "server" | "local"

  const reload = useCallback(async () => {
    try {
      const products = await apiRequest("/api/products");
      setRemote(products);
      setSource("server");
    } catch {
      setRemote(null);
      setSource("local");
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // Mismas categorías (nombre, ícono, descripción) con los productos del servidor
  const categories = useMemo(() => {
    if (!remote) return localCategories;
    return localCategories.map((category) => ({
      ...category,
      products: remote
        .filter((p) => p.category === category.id && p.available)
        .map((p) => ({ id: p._id, name: p.name, price: p.price, description: p.description })),
    }));
  }, [remote]);

  const findProduct = useCallback(
    (name) => {
      for (const category of categories) {
        const product = category.products.find((p) => p.name === name);
        if (product) return { ...product, category };
      }
      return null;
    },
    [categories]
  );

  const value = { categories, findProduct, source, reload };
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  return useContext(CatalogContext);
}
