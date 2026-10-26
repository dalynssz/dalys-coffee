// =====================================================
// CONEXIÓN CON EL BACKEND
// La dirección viene del archivo .env (VITE_API_URL).
// Si no existe, se usa el servidor local en el puerto 3000.
// =====================================================

export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const TOKEN_KEY = "dalys_admin_token";

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function saveToken(token) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* el navegador no permite guardar: la sesión dura solo esta pestaña */
  }
}

export function clearToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* nada que borrar */
  }
}

// Hace una petición al backend y devuelve el JSON.
// Si algo falla, lanza un Error con un mensaje claro en español.
export async function apiRequest(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(
      "No hay conexión con el servidor de Daly's Coffee. Inténtalo de nuevo en unos minutos."
    );
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    /* respuesta sin JSON */
  }

  if (!response.ok) {
    throw new Error(data.mensaje || `El servidor respondió con un error (${response.status}).`);
  }
  return data;
}
