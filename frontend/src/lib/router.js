// =====================================================
// MINI ROUTER CON "#"
// GitHub Pages no sabe manejar rutas como /admin, por eso
// usamos rutas con almohadilla: #/login, #/admin.
// Un enlace normal como #catalogo sigue llevando a esa sección.
// =====================================================
import { useEffect, useState } from "react";

function currentPath() {
  const hash = window.location.hash.slice(1);
  return hash.startsWith("/") ? hash : "/";
}

export function useRoute() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onChange = () => setPath(currentPath());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return path;
}

export function navigate(path) {
  window.location.hash = path;
}
