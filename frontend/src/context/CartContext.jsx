// =====================================================
// CARRITO (Context de React)
// Guarda los productos del carrito y los comparte con
// cualquier componente: catálogo, personalizador, asistente...
// También lo recuerda en el navegador (localStorage).
// =====================================================
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "dalys_cart";

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* si el navegador no deja guardar, el carrito igual funciona */
    }
  }, [items]);

  // Productos normales: si ya está, suma 1.
  // Bebidas personalizadas: siempre entran como una línea nueva.
  function addItem({ name, price, details = "" }) {
    setItems((current) => {
      const key = details ? `${name}|${details}|${Date.now()}` : name;
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { key, name, price, details, quantity: 1 }];
    });
  }

  function changeQuantity(key, amount) {
    setItems((current) =>
      current
        .map((item) => (item.key === key ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(key) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  function clearCart() {
    setItems([]);
  }

  const totals = useMemo(
    () => ({
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      price: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    [items]
  );

  const value = {
    items,
    totals,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    changeQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
