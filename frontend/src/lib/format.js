// Convierte 12500 en "$12.500"
export function formatPrice(value) {
  return "$" + Number(value).toLocaleString("es-CO");
}
