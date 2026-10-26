// Productos iniciales de Daly's Coffee.
// "npm run seed" los carga en MongoDB la primera vez.
// Generado a partir de frontend/src/data/products.js

const CATEGORY_IDS = ["calientes","frios","especiales","nieves","frappes","tes","refrescantes","panaderia","postres","combos"];

const products = [
  {
    "name": "Espresso",
    "price": 6000,
    "description": "Intenso y corto, para los que aman el sabor puro del café.",
    "category": "calientes",
    "order": 0
  },
  {
    "name": "Espresso Doble",
    "price": 7500,
    "description": "Doble carga de espresso para empezar el día con todo.",
    "category": "calientes",
    "order": 1
  },
  {
    "name": "Americano",
    "price": 7000,
    "description": "Espresso alargado con agua caliente, suave y aromático.",
    "category": "calientes",
    "order": 2
  },
  {
    "name": "Cappuccino",
    "price": 9000,
    "description": "Espresso, leche vaporizada y una nube de espuma.",
    "category": "calientes",
    "order": 3
  },
  {
    "name": "Capuchino de Vainilla",
    "price": 10000,
    "description": "Nuestro cappuccino con un toque de jarabe de vainilla.",
    "category": "calientes",
    "order": 4
  },
  {
    "name": "Latte",
    "price": 9500,
    "description": "Más leche, menos espuma: cremoso y delicado.",
    "category": "calientes",
    "order": 5
  },
  {
    "name": "Latte Macchiato",
    "price": 10500,
    "description": "Leche cremosa manchada con espresso, servida en capas.",
    "category": "calientes",
    "order": 6
  },
  {
    "name": "Moca",
    "price": 10500,
    "description": "Espresso, chocolate y leche vaporizada.",
    "category": "calientes",
    "order": 7
  },
  {
    "name": "Moccaccino",
    "price": 10500,
    "description": "Cappuccino con chocolate y cacao espolvoreado.",
    "category": "calientes",
    "order": 8
  },
  {
    "name": "Caramel Macchiato",
    "price": 11000,
    "description": "Vainilla, leche, espresso y un hilo de caramelo.",
    "category": "calientes",
    "order": 9
  },
  {
    "name": "Café Nutella",
    "price": 12500,
    "description": "Latte con crema de avellanas y cacao.",
    "category": "calientes",
    "order": 10
  },
  {
    "name": "Café Dalgona",
    "price": 12000,
    "description": "Espuma de café batido sobre leche fría o caliente.",
    "category": "calientes",
    "order": 11
  },
  {
    "name": "Chocolate Caliente",
    "price": 9000,
    "description": "Chocolate espeso y cremoso, sin café.",
    "category": "calientes",
    "order": 12
  },
  {
    "name": "Iced Americano",
    "price": 8000,
    "description": "Espresso con agua fría y mucho hielo.",
    "category": "frios",
    "order": 0
  },
  {
    "name": "Iced Latte",
    "price": 10000,
    "description": "Espresso y leche fría sobre hielo.",
    "category": "frios",
    "order": 1
  },
  {
    "name": "Iced Latte Macchiato",
    "price": 11500,
    "description": "Leche fría con espresso servido encima, en capas.",
    "category": "frios",
    "order": 2
  },
  {
    "name": "Iced Moca",
    "price": 11000,
    "description": "Café, chocolate y leche fría con hielo.",
    "category": "frios",
    "order": 3
  },
  {
    "name": "Iced Caramel Latte",
    "price": 11500,
    "description": "Iced latte con jarabe y salsa de caramelo.",
    "category": "frios",
    "order": 4
  },
  {
    "name": "Iced Café Nutella",
    "price": 13000,
    "description": "Café frío con crema de avellanas.",
    "category": "frios",
    "order": 5
  },
  {
    "name": "Cold Brew",
    "price": 10500,
    "description": "Café infusionado en frío durante 18 horas, suave y dulce.",
    "category": "frios",
    "order": 6
  },
  {
    "name": "Affogato",
    "price": 12000,
    "description": "Bola de helado de vainilla bañada en espresso caliente.",
    "category": "frios",
    "order": 7
  },
  {
    "name": "Pink Velvet Latte",
    "price": 12500,
    "description": "Latte rosado con notas de red velvet y vainilla.",
    "category": "especiales",
    "order": 0
  },
  {
    "name": "Matcha Latte",
    "price": 12000,
    "description": "Té verde matcha batido con leche cremosa.",
    "category": "especiales",
    "order": 1
  },
  {
    "name": "Chai Latte",
    "price": 11500,
    "description": "Té negro especiado con canela, cardamomo y leche.",
    "category": "especiales",
    "order": 2
  },
  {
    "name": "Chocolate Blanco Caliente",
    "price": 10500,
    "description": "Chocolate blanco fundido con leche y vainilla.",
    "category": "especiales",
    "order": 3
  },
  {
    "name": "Golden Latte (Cúrcuma y Miel)",
    "price": 11500,
    "description": "Leche con cúrcuma, canela y miel. Sin café.",
    "category": "especiales",
    "order": 4
  },
  {
    "name": "Chocolate Rosa",
    "price": 12000,
    "description": "Chocolate blanco con fresa, de color rosa pastel.",
    "category": "especiales",
    "order": 5
  },
  {
    "name": "Nieve de Café Clásico",
    "price": 14000,
    "description": "Café, hielo y leche licuados, con crema batida.",
    "category": "nieves",
    "order": 0
  },
  {
    "name": "Nieve de Chocolate",
    "price": 14500,
    "description": "Chocolate frappé con crema y virutas.",
    "category": "nieves",
    "order": 1
  },
  {
    "name": "Nieve de Arequipe",
    "price": 14500,
    "description": "Cremosa, dulce y con hilos de arequipe.",
    "category": "nieves",
    "order": 2
  },
  {
    "name": "Nieve de Caramelo",
    "price": 14500,
    "description": "Café helado con salsa de caramelo.",
    "category": "nieves",
    "order": 3
  },
  {
    "name": "Nieve de Vainilla",
    "price": 14000,
    "description": "Suave, fría y perfumada con vainilla.",
    "category": "nieves",
    "order": 4
  },
  {
    "name": "Nieve de Moca",
    "price": 15000,
    "description": "Café y chocolate en versión helada.",
    "category": "nieves",
    "order": 5
  },
  {
    "name": "Nieve de Cookies & Cream",
    "price": 15500,
    "description": "Con galletas de chocolate trituradas.",
    "category": "nieves",
    "order": 6
  },
  {
    "name": "Nieve de Avellana",
    "price": 15500,
    "description": "Café helado con crema de avellanas.",
    "category": "nieves",
    "order": 7
  },
  {
    "name": "Nieve de Matcha",
    "price": 15500,
    "description": "Matcha helado con crema batida.",
    "category": "nieves",
    "order": 8
  },
  {
    "name": "Nieve de Fresa",
    "price": 15000,
    "description": "Fresas naturales, leche y hielo. Sin café.",
    "category": "nieves",
    "order": 9
  },
  {
    "name": "Frappé Clásico",
    "price": 13000,
    "description": "Café, leche y hielo licuados.",
    "category": "frappes",
    "order": 0
  },
  {
    "name": "Frappé de Chocolate",
    "price": 14000,
    "description": "Chocolate intenso y frío.",
    "category": "frappes",
    "order": 1
  },
  {
    "name": "Frappé de Moca",
    "price": 14000,
    "description": "Café con chocolate, licuado con hielo.",
    "category": "frappes",
    "order": 2
  },
  {
    "name": "Frappé de Caramelo",
    "price": 14000,
    "description": "Con salsa de caramelo por dentro y por fuera.",
    "category": "frappes",
    "order": 3
  },
  {
    "name": "Frappé de Oreo",
    "price": 15000,
    "description": "Galletas Oreo licuadas con leche y hielo.",
    "category": "frappes",
    "order": 4
  },
  {
    "name": "Frappé de Fresa",
    "price": 14000,
    "description": "Fresa y crema, sin café.",
    "category": "frappes",
    "order": 5
  },
  {
    "name": "Frappé de Matcha",
    "price": 15000,
    "description": "Té matcha licuado con leche y hielo.",
    "category": "frappes",
    "order": 6
  },
  {
    "name": "Té Verde",
    "price": 6500,
    "description": "Ligero y fresco.",
    "category": "tes",
    "order": 0
  },
  {
    "name": "Té Negro",
    "price": 6500,
    "description": "Con cuerpo, ideal con leche.",
    "category": "tes",
    "order": 1
  },
  {
    "name": "Té de Manzanilla",
    "price": 6500,
    "description": "Relajante, perfecto para la noche.",
    "category": "tes",
    "order": 2
  },
  {
    "name": "Té de Frutos Rojos",
    "price": 7000,
    "description": "Frutal, de color rosado intenso.",
    "category": "tes",
    "order": 3
  },
  {
    "name": "Té Chai",
    "price": 8000,
    "description": "Especiado con canela y cardamomo.",
    "category": "tes",
    "order": 4
  },
  {
    "name": "Té de Hierbabuena",
    "price": 7000,
    "description": "Refrescante y digestivo.",
    "category": "tes",
    "order": 5
  },
  {
    "name": "Agua Natural",
    "price": 3500,
    "description": "Botella de 500 ml.",
    "category": "refrescantes",
    "order": 0
  },
  {
    "name": "Agua con Gas",
    "price": 4000,
    "description": "Botella de 500 ml.",
    "category": "refrescantes",
    "order": 1
  },
  {
    "name": "Limonada Natural",
    "price": 7500,
    "description": "Limón recién exprimido.",
    "category": "refrescantes",
    "order": 2
  },
  {
    "name": "Limonada de Coco",
    "price": 10500,
    "description": "Cremosa, con leche de coco.",
    "category": "refrescantes",
    "order": 3
  },
  {
    "name": "Limonada Cerezada",
    "price": 12500,
    "description": "Limonada con cereza, rosada y dulce.",
    "category": "refrescantes",
    "order": 4
  },
  {
    "name": "Soda Italiana",
    "price": 11000,
    "description": "Agua con gas y jarabe de frutas, con crema opcional.",
    "category": "refrescantes",
    "order": 5
  },
  {
    "name": "Té Helado de Durazno",
    "price": 8500,
    "description": "Té negro frío con durazno.",
    "category": "refrescantes",
    "order": 6
  },
  {
    "name": "Croissant de Mantequilla",
    "price": 5000,
    "description": "Hojaldrado y dorado.",
    "category": "panaderia",
    "order": 0
  },
  {
    "name": "Croissant de Jamón y Queso",
    "price": 8000,
    "description": "Caliente, con queso derretido.",
    "category": "panaderia",
    "order": 1
  },
  {
    "name": "Pan de Chocolate",
    "price": 6500,
    "description": "Hojaldre relleno de chocolate.",
    "category": "panaderia",
    "order": 2
  },
  {
    "name": "Roll de Canela",
    "price": 8500,
    "description": "Con glaseado de queso crema.",
    "category": "panaderia",
    "order": 3
  },
  {
    "name": "Muffin",
    "price": 7500,
    "description": "Pregunta por el sabor del día.",
    "category": "panaderia",
    "order": 4
  },
  {
    "name": "Bagel con Queso Crema",
    "price": 8500,
    "description": "Tostado, con queso crema.",
    "category": "panaderia",
    "order": 5
  },
  {
    "name": "Pan de Queso",
    "price": 4500,
    "description": "Suave por dentro, dorado por fuera.",
    "category": "panaderia",
    "order": 6
  },
  {
    "name": "Dedito de Queso",
    "price": 5000,
    "description": "El clásico, recién frito.",
    "category": "panaderia",
    "order": 7
  },
  {
    "name": "Cheesecake de Fresa",
    "price": 12000,
    "description": "Base de galleta y cobertura de fresa.",
    "category": "postres",
    "order": 0
  },
  {
    "name": "Cheesecake de Limón",
    "price": 12000,
    "description": "Cremoso y cítrico.",
    "category": "postres",
    "order": 1
  },
  {
    "name": "Cheesecake de Maracuyá",
    "price": 12000,
    "description": "Con salsa de maracuyá natural.",
    "category": "postres",
    "order": 2
  },
  {
    "name": "Flan de Vainilla",
    "price": 8500,
    "description": "Suave y tembloroso.",
    "category": "postres",
    "order": 3
  },
  {
    "name": "Flan de Caramelo",
    "price": 9000,
    "description": "Bañado en caramelo dorado.",
    "category": "postres",
    "order": 4
  },
  {
    "name": "Tres Leches Clásico",
    "price": 11500,
    "description": "Bizcocho húmedo con merengue.",
    "category": "postres",
    "order": 5
  },
  {
    "name": "Tres Leches de Chocolate",
    "price": 12500,
    "description": "Versión de chocolate del clásico.",
    "category": "postres",
    "order": 6
  },
  {
    "name": "Tres Leches de Arequipe",
    "price": 12500,
    "description": "Con capa de arequipe.",
    "category": "postres",
    "order": 7
  },
  {
    "name": "Milhojas Napoleón de Vainilla",
    "price": 12000,
    "description": "Hojaldre crujiente y crema pastelera.",
    "category": "postres",
    "order": 8
  },
  {
    "name": "Milhojas Napoleón de Chocolate",
    "price": 12500,
    "description": "Con crema de chocolate.",
    "category": "postres",
    "order": 9
  },
  {
    "name": "Milhojas Napoleón de Arequipe",
    "price": 12500,
    "description": "Con relleno de arequipe.",
    "category": "postres",
    "order": 10
  },
  {
    "name": "Milhojas Napoleón de Fresa",
    "price": 12500,
    "description": "Con crema y fresas frescas.",
    "category": "postres",
    "order": 11
  },
  {
    "name": "Brownie con Helado",
    "price": 13500,
    "description": "Brownie tibio con bola de vainilla.",
    "category": "postres",
    "order": 12
  },
  {
    "name": "Torta Red Velvet",
    "price": 13000,
    "description": "Con frosting de queso crema.",
    "category": "postres",
    "order": 13
  },
  {
    "name": "Torta de Chocolate",
    "price": 12500,
    "description": "Húmeda y con ganache.",
    "category": "postres",
    "order": 14
  },
  {
    "name": "Tiramisú",
    "price": 13500,
    "description": "Bizcocho con café, mascarpone y cacao.",
    "category": "postres",
    "order": 15
  },
  {
    "name": "Galleta Gigante con Chips de Chocolate",
    "price": 7000,
    "description": "Crujiente por fuera, suave por dentro.",
    "category": "postres",
    "order": 16
  },
  {
    "name": "Macarons (3 unidades)",
    "price": 9000,
    "description": "Sabores surtidos.",
    "category": "postres",
    "order": 17
  },
  {
    "name": "Alfajor",
    "price": 6500,
    "description": "Relleno de arequipe y coco.",
    "category": "postres",
    "order": 18
  },
  {
    "name": "Combo Desayuno",
    "price": 13500,
    "description": "Cappuccino + croissant de mantequilla.",
    "category": "combos",
    "order": 0
  },
  {
    "name": "Combo Clásico",
    "price": 16500,
    "description": "Latte + roll de canela.",
    "category": "combos",
    "order": 1
  },
  {
    "name": "Combo Dulce",
    "price": 19500,
    "description": "Café a tu elección + cheesecake.",
    "category": "combos",
    "order": 2
  },
  {
    "name": "Combo Frío",
    "price": 16500,
    "description": "Iced latte + muffin.",
    "category": "combos",
    "order": 3
  },
  {
    "name": "Combo Daly's",
    "price": 25500,
    "description": "Frappé + brownie con helado.",
    "category": "combos",
    "order": 4
  },
  {
    "name": "Combo Friends",
    "price": 42000,
    "description": "2 bebidas + 2 postres para compartir.",
    "category": "combos",
    "order": 5
  }
];

module.exports = { CATEGORY_IDS, products };
