// =====================================================
// ILUSTRACIONES DE DALY'S COFFEE
// Rosas, ramas, la taza vista desde arriba y la estampilla.
// Todo es SVG dibujado en código: pesa poco, se ve nítido
// en cualquier pantalla y no depende de imágenes externas.
// =====================================================
import { useId } from "react";

const PETAL = "M0 -2 C -14 -4 -24 -22 -16 -36 C -10 -46 10 -46 16 -36 C 24 -22 14 -4 0 -2Z";

// Rosa vista desde arriba. Se dibuja en un cuadro de -50 a 50.
function RoseTopShape({ outline = "#D9708F" }) {
  const layers = [
    { count: 5, scale: 1, turn: 0, fill: "#FFD6E1" },
    { count: 5, scale: 0.82, turn: 36, fill: "#FFC4D3" },
    { count: 5, scale: 0.64, turn: 10, fill: "#FFADC3" },
    { count: 5, scale: 0.46, turn: 46, fill: "#FF94B2" },
    { count: 3, scale: 0.3, turn: 20, fill: "#EE7398" },
  ];
  return (
    <g stroke={outline} strokeWidth="0.9" strokeLinejoin="round">
      {layers.map((layer, l) =>
        Array.from({ length: layer.count }, (_, i) => (
          <path
            key={`${l}-${i}`}
            d={PETAL}
            fill={layer.fill}
            transform={`rotate(${layer.turn + (360 / layer.count) * i}) scale(${layer.scale})`}
          />
        ))
      )}
      <circle r="6" fill="#E2668C" />
      <path d="M-1 -1 c 3 -3 7 0 5 4 c -2 4 -8 3 -8 -2 c 0 -6 8 -9 12 -4" fill="none" stroke="#B9375E" strokeWidth="1.1" />
    </g>
  );
}

export function RoseTop({ size = 80, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-50 -50 100 100" aria-hidden="true">
      <RoseTopShape />
    </svg>
  );
}

// Rosa vista de lado (para las ramas)
function RoseSide({ x, y, scale = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} stroke="#B9375E" strokeWidth="0.7" strokeLinejoin="round">
      <path d="M-5 9 L0 15 L5 9 L0 11Z" fill="#A9BC98" stroke="#7E9670" />
      <path d="M-12 -4 C -14 -14 -6 -19 0 -18 C 6 -19 14 -14 12 -4 C 10 4 -10 4 -12 -4Z" fill="#FFB8CB" />
      <path d="M-5 -6 C -6 -14 2 -18 5 -14 C 7 -10 4 -5 0 -4 C -2 -4 -4 -5 -5 -6Z" fill="#F07A9C" />
      <path d="M-2 -12 C 1 -14 4 -12 3 -9" fill="none" />
      <path d="M-13 -6 C -15 4 -8 11 0 11 C 2 7 0 -2 -6 -6 C -9 -8 -11 -7 -13 -6Z" fill="#FFC9D7" />
      <path d="M13 -6 C 15 4 8 11 0 11 C -3 6 -1 -2 5 -6 C 8 -8 11 -7 13 -6Z" fill="#FFD6E1" />
    </g>
  );
}

function Leaf({ x, y, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0 C 6 -7 17 -7 24 0 C 17 7 6 7 0 0Z" fill="#B9C9AA" stroke="#7E9670" strokeWidth="0.9" />
      <path d="M1 0 L21 0" stroke="#7E9670" strokeWidth="0.7" />
    </g>
  );
}

// Rama de rosas, para las esquinas
export function RoseBranch({ className = "", flip = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 300"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g fill="none" stroke="#7E9670" strokeWidth="1.6" strokeLinecap="round">
        <path d="M112 298 C 100 232 132 182 116 122 C 106 84 120 54 142 34" />
        <path d="M116 156 C 94 136 78 116 62 104" />
        <path d="M121 96 C 140 92 154 84 164 70" />
      </g>
      <Leaf x={112} y={250} rotate={-140} scale={1.2} />
      <Leaf x={110} y={214} rotate={-30} scale={1.1} />
      <Leaf x={118} y={176} rotate={-155} scale={1.05} />
      <Leaf x={92} y={132} rotate={-120} scale={0.9} />
      <Leaf x={124} y={128} rotate={-20} scale={0.95} />
      <Leaf x={140} y={88} rotate={-60} scale={0.85} />
      <RoseSide x={142} y={30} scale={1.6} rotate={12} />
      <RoseSide x={60} y={100} scale={1.25} rotate={-24} />
      <RoseSide x={166} y={64} scale={0.8} rotate={30} />
    </svg>
  );
}

// Taza vista desde arriba con una rosa flotando en el café
export function CupIllustration({ className = "" }) {
  const id = useId().replace(/:/g, "");
  const scallops = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    return { cx: 210 + Math.cos(a) * 160, cy: 210 + Math.sin(a) * 160 };
  });

  return (
    <svg className={className} viewBox="0 0 420 420" role="img" aria-label="Taza de café con una rosa flotando">
      <defs>
        <radialGradient id={`plato-${id}`} cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.75" stopColor="#FFF6F8" />
          <stop offset="1" stopColor="#F7DDE5" />
        </radialGradient>
        <radialGradient id={`taza-${id}`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F6E2E8" />
        </radialGradient>
        <radialGradient id={`cafe-${id}`} cx="48%" cy="45%" r="60%">
          <stop offset="0" stopColor="#E0BBAA" />
          <stop offset="0.6" stopColor="#C79584" />
          <stop offset="1" stopColor="#9C6455" />
        </radialGradient>
        <filter id={`sombra-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* sombra y plato */}
      <circle cx="220" cy="226" r="172" fill="#522E38" opacity="0.14" filter={`url(#sombra-${id})`} />
      <circle cx="210" cy="210" r="174" fill={`url(#plato-${id})`} stroke="#EBC3CF" strokeWidth="1.5" />
      <circle cx="210" cy="210" r="150" fill="none" stroke="#F1CFDA" strokeWidth="1.2" />
      {scallops.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r="4.2" fill="none" stroke="#EFC2D0" strokeWidth="1.1" />
      ))}

      {/* pétalos sueltos en el plato */}
      <path d={PETAL} transform="translate(92 118) rotate(-35) scale(.42)" fill="#FFC2D4" stroke="#D9708F" strokeWidth="1.6" />
      <path d={PETAL} transform="translate(332 330) rotate(150) scale(.36)" fill="#FFB0C6" stroke="#D9708F" strokeWidth="1.8" />

      {/* oreja de la taza */}
      <g transform="rotate(38 210 210)">
        <rect x="300" y="194" width="76" height="32" rx="16" fill={`url(#taza-${id})`} stroke="#E4B9C6" strokeWidth="1.5" />
        <rect x="322" y="203" width="40" height="14" rx="7" fill="#FBEFF3" stroke="#EBC8D3" />
      </g>

      {/* taza y café */}
      <circle cx="210" cy="210" r="114" fill={`url(#taza-${id})`} stroke="#E4B9C6" strokeWidth="1.5" />
      <circle cx="210" cy="210" r="96" fill={`url(#cafe-${id})`} />
      <circle cx="210" cy="210" r="95" fill="none" stroke="#F3D9CC" strokeWidth="3" opacity="0.7" />
      <path d="M150 182 C 170 160 200 152 224 156" fill="none" stroke="#F3DCCF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

      {/* hojas y rosa */}
      <Leaf x={232} y={232} rotate={30} scale={1.9} />
      <Leaf x={190} y={192} rotate={205} scale={1.6} />
      <g transform="translate(206 206) rotate(-14) scale(1.25)">
        <RoseTopShape />
      </g>
    </svg>
  );
}

// Estampilla para el formulario de contacto
export function Stamp({ className = "" }) {
  const id = useId().replace(/:/g, "");
  const holes = [];
  for (let x = 6; x <= 94; x += 8) holes.push([x, 0], [x, 120]);
  for (let y = 8; y <= 112; y += 8) holes.push([0, y], [100, y]);
  return (
    <svg className={className} viewBox="0 0 100 120" aria-hidden="true">
      <defs>
        <mask id={`perforado-${id}`}>
          <rect width="100" height="120" fill="#fff" />
          {holes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.2" fill="#000" />
          ))}
        </mask>
      </defs>
      <g mask={`url(#perforado-${id})`}>
        <rect width="100" height="120" fill="#FFF6F8" />
        <rect x="9" y="9" width="82" height="102" fill="#FFE0E9" stroke="#B9375E" strokeWidth="1" />
      </g>
      <g transform="translate(50 52) scale(.62)">
        <RoseTopShape />
      </g>
      <text x="50" y="100" textAnchor="middle" fontFamily="Aston, cursive" fontSize="15" fill="#8A2846">
        Daly's
      </text>
    </svg>
  );
}

// Adorno pequeño debajo de los títulos
export function Flourish({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 24" aria-hidden="true">
      <g fill="none" stroke="#B9375E" strokeWidth="1" strokeLinecap="round">
        <path d="M84 12 C 64 4 44 20 18 10" />
        <path d="M116 12 C 136 4 156 20 182 10" />
      </g>
      <Leaf x={58} y={9} rotate={-160} scale={0.5} />
      <Leaf x={142} y={9} rotate={-20} scale={0.5} />
      <g transform="translate(100 12) scale(.2)">
        <RoseTopShape />
      </g>
    </svg>
  );
}
