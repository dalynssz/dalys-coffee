// =====================================================
// ÍCONOS DE DALY'S COFFEE (reemplazan a los emojis)
// Dibujos de línea en SVG. Toman el color del texto
// (currentColor), así que se pintan con CSS.
// Uso: <Icon name="hot" size={28} />
// =====================================================

const paths = {
  // Categorías
  hot: (
    <>
      <path d="M5 10h11v3.5A5.5 5.5 0 0 1 10.5 19h0A5.5 5.5 0 0 1 5 13.5z" />
      <path d="M16 11.5h1.2a2.3 2.3 0 0 1 0 4.6H15.6" />
      <path d="M8.5 3.2c-.9.9.9 1.8 0 3M12 3.2c-.9.9.9 1.8 0 3" />
      <path d="M3 21.2h16" />
    </>
  ),
  iced: (
    <>
      <path d="M6 6h12l-1.6 14.2a1 1 0 0 1-1 .8H8.6a1 1 0 0 1-1-.8z" />
      <path d="M13.5 6l2.2-4" />
      <rect x="8.6" y="10.4" width="3.4" height="3.4" rx=".6" transform="rotate(-12 10.3 12.1)" />
      <rect x="12.2" y="13.6" width="3" height="3" rx=".6" transform="rotate(10 13.7 15.1)" />
    </>
  ),
  special: (
    <>
      <path d="M4 10h11v3.5A5.5 5.5 0 0 1 9.5 19h0A5.5 5.5 0 0 1 4 13.5z" />
      <path d="M15 11.5h1.2a2.3 2.3 0 0 1 0 4.6H14.6" />
      <path d="M9.5 15.2s-2.2-1.3-2.2-2.8a1.1 1.1 0 0 1 2.2-.3 1.1 1.1 0 0 1 2.2.3c0 1.5-2.2 2.8-2.2 2.8z" />
      <path d="M18.5 2.5l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6z" />
    </>
  ),
  snow: (
    <>
      <path d="M6.5 11h11l-1.4 9.2a1 1 0 0 1-1 .8H8.9a1 1 0 0 1-1-.8z" />
      <path d="M5.8 11c-.6-2 1-3.4 2.6-3.1.2-1.9 2-3 3.6-2.4 1.5-.9 3.7.1 3.8 2 1.7-.2 3 1.4 2.4 3.5" />
      <path d="M12 13.5v5M9.9 14.8l4.2 2.4M14.1 14.8l-4.2 2.4" />
    </>
  ),
  frappe: (
    <>
      <path d="M6 9.5a6 6 0 0 1 12 0z" />
      <path d="M5 9.5h14" />
      <path d="M6.6 9.5l1.3 11a1 1 0 0 0 1 .9h6.2a1 1 0 0 0 1-.9l1.3-11" />
      <path d="M12.8 3.6l1.8-2.4" />
      <path d="M7.4 14h9.2" />
    </>
  ),
  tea: (
    <>
      <path d="M4 10h12v3a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6z" />
      <path d="M16 11h1.3a2.2 2.2 0 0 1 0 4.4H15.4" />
      <path d="M10.5 10V5.5l3 -1.5" />
      <rect x="12.6" y="2" width="3.4" height="3.6" rx=".5" transform="rotate(-20 14.3 3.8)" />
      <path d="M2.5 21.2h15" />
    </>
  ),
  fresh: (
    <>
      <path d="M6 6h11l-1.4 14.2a1 1 0 0 1-1 .8H8.4a1 1 0 0 1-1-.8z" />
      <circle cx="17.2" cy="5.6" r="3.2" />
      <path d="M17.2 2.4v6.4M14 5.6h6.4" />
      <circle cx="10.5" cy="12" r=".7" />
      <circle cx="12.6" cy="15.6" r=".7" />
      <circle cx="10" cy="17.6" r=".7" />
    </>
  ),
  bread: (
    <>
      <path d="M3 15.5c1.6-5.6 5.6-8.5 9-8.5s7.4 2.9 9 8.5c-1.8 1-3.6.4-4.6-.6-1.3 1.6-3.5 2.3-4.4 2.3s-3.1-.7-4.4-2.3c-1 1-2.8 1.6-4.6.6z" />
      <path d="M9.4 8l1.3 7.5M14.6 8l-1.3 7.5" />
    </>
  ),
  cake: (
    <>
      <path d="M3.5 19.5h17v-6.8L3.5 8.5z" />
      <path d="M3.5 13.4l17 3.6" />
      <circle cx="9" cy="6.2" r="1.6" />
      <path d="M9.6 4.7c.4-1.2 1.4-2 2.6-2.2" />
    </>
  ),
  combo: (
    <>
      <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
      <path d="M12 7.6V4M9.6 2.6c1 .2 1.8.8 2.4 1.4.6-.6 1.4-1.2 2.4-1.4" />
    </>
  ),

  // Interfaz
  bag: (
    <>
      <path d="M5 8h14l-1 12a1 1 0 0 1-1 .9H7a1 1 0 0 1-1-.9z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: (
    <>
      <path d="M4.5 7h15M9.5 7V4.5h5V7" />
      <path d="M6.5 7l1 12.5a1 1 0 0 0 1 .9h7a1 1 0 0 0 1-.9l1-12.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  at: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M15.6 12v1.4a2.4 2.4 0 0 0 4.8 0V12a8.4 8.4 0 1 0-3.3 6.7" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  logout: (
    <>
      <path d="M14 4.5h4a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-4" />
      <path d="M10 8l-4 4 4 4M6 12h9.5" />
    </>
  ),
  send: <path d="M4 12l16-7.5-5.5 15.5-2.8-6.2zM11.7 13.8L20 4.5" />,
  chat: (
    <>
      <path d="M4 5.5h16v10.5H10l-4.5 3.8V16H4z" />
      <path d="M12 13.2s-2.6-1.5-2.6-3.3a1.3 1.3 0 0 1 2.6-.4 1.3 1.3 0 0 1 2.6.4c0 1.8-2.6 3.3-2.6 3.3z" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  sparkle: <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" />,
};

export default function Icon({ name, size = 24, strokeWidth = 1.5, className = "", title }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}
