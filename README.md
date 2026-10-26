# Daly's Coffee ☕🌸

Aplicación web *full stack* de **Daly's Coffee**, una cafetería romántica y floral en Barranquilla.
Proyecto final de la ruta básica de **Jóvenes creaTIvos** ("Mi emprendimiento digital").

- **Página publicada:** https://dalynssz.github.io/dalys-coffee/
- **API (backend):** https://dalys-coffee-api.onrender.com
- **Repositorio:** https://github.com/dalynssz/dalys-coffee

> El backend usa el plan gratuito de Render, que se "duerme" tras 15 minutos sin uso.
> La primera visita puede tardar 30–50 segundos mientras despierta.

---

## ¿Qué hace la página?

| Sección | Qué permite |
|---|---|
| **Inicio** | Presenta la marca, su mensaje y la navegación. |
| **Catálogo** | Más de 80 productos en 10 categorías, con precio y descripción. Se cargan desde la base de datos. |
| **Personaliza** | Arma tu bebida (leche, tamaño, endulzante, jarabes, extras) y el precio se calcula al instante. |
| **Carrito** | Agrega, cambia cantidades, elimina y confirma el pedido. |
| **Contacto** | Formulario validado que **guarda los mensajes en MongoDB**. |
| **Admin** | Login seguro. Permite ver, marcar y borrar mensajes, y crear, editar, ocultar y borrar productos. |
| **Asistente con IA** | Chat con **Google Gemini** que recomienda productos reales de la carta. Si Gemini no responde, usa un respaldo por palabras clave y lo avisa. |

El diseño es *responsive*: funciona en computador, tablet y celular.

---

## Tecnologías

| Parte | Tecnología |
|---|---|
| Frontend | React 19 + Vite, HTML, CSS y JavaScript |
| Backend | Node.js + Express 5 |
| Base de datos | MongoDB Atlas (Mongoose) |
| Autenticación | Contraseña cifrada con bcrypt + token JWT |
| Inteligencia artificial | Google Gemini (API REST desde el backend) |
| Publicación | GitHub Pages (frontend) y Render (backend) |
| Control de versiones | Git y GitHub |

### ¿Cómo se conectan las partes?

```
Navegador (React en GitHub Pages)
        │  fetch()
        ▼
Backend Express (Render) ──► MongoDB Atlas (productos, mensajes, usuario admin)
        │
        └──► Google Gemini (solo el servidor conoce la clave)
```

La clave de Gemini y la conexión a MongoDB **nunca** llegan al navegador: viven en variables de entorno del servidor.

---

## Estructura del proyecto

```
dalys-coffee/
├── frontend/                 Página en React
│   ├── src/
│   │   ├── components/       Navbar, Hero, Catalog, Customizer, Contact, CartDrawer, ChatWidget...
│   │   ├── pages/            Home, Login, Admin
│   │   ├── context/          Estado del carrito y del catálogo
│   │   ├── data/             Carta y opciones del personalizador
│   │   ├── lib/              Conexión con la API y utilidades
│   │   └── styles/           Estilos por sección
│   └── .env.example
├── backend/                  API en Express
│   ├── server.js             Arranque del servidor
│   ├── seed.js               Carga inicial de productos y usuario admin
│   ├── src/
│   │   ├── models/           Product, Message, User
│   │   ├── routes/           auth, products, contact, chat
│   │   └── middleware/       Protección de rutas con JWT
│   └── .env.example
└── .github/workflows/        Publicación automática en GitHub Pages
```

---

## Cómo ejecutarlo en tu computador

Necesitas **Node.js 18 o superior** y una cuenta gratuita de **MongoDB Atlas**.

### 1. Backend

```bash
cd backend
npm install
copy .env.example .env      # en Mac/Linux: cp .env.example .env
```

Abre `backend/.env` y completa los valores (ver la tabla de abajo). Después:

```bash
npm run seed    # carga los productos y crea el usuario administrador
npm run dev     # inicia la API en http://localhost:3000
```

### 2. Frontend (en otra terminal)

```bash
cd frontend
npm install
npm run dev     # abre http://localhost:5173/dalys-coffee/
```

### Variables de entorno del backend

| Variable | Para qué sirve |
|---|---|
| `MONGODB_URI` | Conexión a MongoDB Atlas (incluye el nombre de la base `dalyscoffee`). |
| `JWT_SECRET` | Texto largo y aleatorio para firmar las sesiones del admin. |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Usuario administrador que crea `npm run seed`. |
| `GEMINI_API_KEY` | Clave de Google AI Studio. |
| `GEMINI_MODEL` / `GEMINI_FALLBACK_MODEL` | Modelo principal y de respaldo de Gemini. |
| `GEMINI_THINKING_LEVEL` | Opcional. `low` hace que el modelo responda más rápido. |
| `FRONTEND_URL` | Páginas autorizadas a usar la API (CORS). |

El archivo `.env` está en `.gitignore`: **no se sube a GitHub**.

---

## API

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/api/products` | Público | Lista de productos |
| POST | `/api/products` | Admin | Crear producto |
| PUT | `/api/products/:id` | Admin | Editar producto |
| DELETE | `/api/products/:id` | Admin | Borrar producto |
| POST | `/api/contact` | Público | Enviar mensaje de contacto |
| GET | `/api/contact` | Admin | Ver mensajes |
| PATCH | `/api/contact/:id` | Admin | Marcar como leído / no leído |
| DELETE | `/api/contact/:id` | Admin | Borrar mensaje |
| POST | `/api/auth/login` | Público | Iniciar sesión (devuelve un token) |
| GET | `/api/auth/me` | Admin | Comprobar la sesión |
| POST | `/api/chat` | Público | Preguntar al asistente con IA |

---

## Publicación

- **Frontend:** cada `git push` a `main` ejecuta el flujo `.github/workflows/deploy.yml`, que compila la página y la publica en GitHub Pages. La dirección del backend se configura en la variable de repositorio `VITE_API_URL`.
- **Backend:** Render despliega automáticamente la carpeta `backend` con cada `git push`. Las variables de entorno se configuran en el panel de Render.

---

## Requisitos del proyecto final

| Requisito | Estado | Dónde se cumple |
|---|---|---|
| Landing / inicio con marca, mensaje y navegación | ✅ | `Hero`, `Navbar` |
| Catálogo con detalles claros | ✅ | `Catalog` + base de datos |
| Contacto real que registre solicitudes | ✅ | `Contact` + `POST /api/contact` + MongoDB |
| Panel admin con login | ✅ | `Login`, `Admin`, JWT + bcrypt |
| IA aplicada a una necesidad real | ✅ | `ChatWidget` + Gemini (recomienda productos de la carta) |
| Frontend con React | ✅ | `frontend/` |
| Backend con APIs, lógica y autenticación | ✅ | `backend/` |
| Base de datos | ✅ | MongoDB Atlas |
| Diseño responsive | ✅ | Probado en computador y celular |
| Git con mínimo 15 commits | ✅ | Historial del repositorio |
| Repositorio en GitHub | ✅ | github.com/dalynssz/dalys-coffee |
| Publicado en GitHub Pages | ✅ | dalynssz.github.io/dalys-coffee |

---

## Créditos

- Diseño, ilustraciones (SVG hechos en código) y desarrollo: **Daly's Coffee**.
- Tipografías: *Aston Script* (marca) y *Lora* (Google Fonts, licencia OFL).
- Inteligencia artificial: Google Gemini.
