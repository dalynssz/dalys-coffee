import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// "base" debe coincidir con el nombre del repositorio en GitHub
// para que GitHub Pages encuentre los archivos:
// https://dalynssz.github.io/dalys-coffee/
export default defineConfig({
  plugins: [react()],
  base: "/dalys-coffee/",
});
