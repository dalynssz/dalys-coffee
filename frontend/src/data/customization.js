// Opciones del personalizador de bebidas.
// Las bebidas base salen del catálogo (categorías con customizable: true),
// así un precio solo se cambia en un lugar.

export const milks = [
  { name: "Leche entera", price: 0 },
  { name: "Leche deslactosada", price: 0 },
  { name: "Leche de almendras", price: 2000 },
  { name: "Leche de avena", price: 2000 },
  { name: "Leche de coco", price: 2000 },
  { name: "Leche de soya", price: 2000 },
];

export const sizes = [
  { name: "Pequeño", detail: "12 oz", price: 0 },
  { name: "Mediano", detail: "16 oz", price: 2000 },
  { name: "Grande", detail: "20 oz", price: 4000 },
];

export const sweeteners = [
  { name: "Azúcar blanca", price: 0 },
  { name: "Azúcar morena", price: 0 },
  { name: "Panela", price: 0 },
  { name: "Miel", price: 1000 },
  { name: "Stevia", price: 0 },
  { name: "Sin azúcar", price: 0 },
];

export const syrups = [
  { name: "Vainilla", price: 1500 },
  { name: "Caramelo", price: 1500 },
  { name: "Avellana", price: 1500 },
  { name: "Chocolate", price: 1500 },
  { name: "Arequipe", price: 1500 },
];

export const extras = [
  { name: "Shot extra de espresso", price: 2000 },
  { name: "Crema batida", price: 1500 },
  { name: "Chips de chocolate", price: 1000 },
  { name: "Mini malvaviscos", price: 1500 },
  { name: "Canela", price: 500 },
  { name: "Cocoa", price: 500 },
];

export const temperatures = ["Caliente", "Tibia", "Fría", "Extra fría"];
