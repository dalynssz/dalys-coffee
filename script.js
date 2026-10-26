// =====================================================
// DALY'S COFFEE
// JAVASCRIPT PRINCIPAL
// =====================================================


// =========================
// MENÚ DE PRODUCTOS
// =========================

const products = [
    // CAFÉS CALIENTES
    {
        category: "☕ Cafés Calientes",
        icon: "☕",
        products: [
            ["Espresso", 6000],
            ["Espresso Doble", 7500],
            ["Americano", 7000],
            ["Cappuccino", 9000],
            ["Capuchino de Vainilla", 10000],
            ["Latte", 9500],
            ["Latte Macchiato", 10500],
            ["Moca", 10500],
            ["Moccaccino", 10500],
            ["Caramel Macchiato", 11000],
            ["Café Nutella", 12500],
            ["Café Dalgona", 12000],
            ["Chocolate Caliente", 9000]
        ]
    },

    // CAFÉS FRÍOS
    {
        category: "🧊 Cafés Fríos",
        icon: "🧊",
        products: [
            ["Iced Americano", 8000],
            ["Iced Latte", 10000],
            ["Iced Latte Macchiato", 11500],
            ["Iced Moca", 11000],
            ["Iced Caramel Latte", 11500],
            ["Iced Café Nutella", 13000],
            ["Cold Brew", 10500],
            ["Affogato", 12000]
        ]
    },

    // BEBIDAS ESPECIALES
    {
        category: "✨ Bebidas Especiales",
        icon: "✨",
        products: [
            ["Pink Velvet Latte", 12500],
            ["Matcha Latte", 12000],
            ["Chai Latte", 11500],
            ["Chocolate Blanco Caliente", 10500],
            ["Golden Latte (Cúrcuma y Miel)", 11500],
            ["Chocolate Rosa", 12000]
        ]
    },

    // NIEVES
    {
        category: "❄️ Nieves",
        description: "Bebidas cremosas con hielo y crema batida.",
        icon: "❄️",
        products: [
            ["Nieve de Café Clásico", 14000],
            ["Nieve de Chocolate", 14500],
            ["Nieve de Arequipe", 14500],
            ["Nieve de Caramelo", 14500],
            ["Nieve de Vainilla", 14000],
            ["Nieve de Moca", 15000],
            ["Nieve de Cookies & Cream", 15500],
            ["Nieve de Avellana", 15500],
            ["Nieve de Matcha", 15500],
            ["Nieve de Fresa", 15000]
        ]
    },

    // FRAPPÉS
    {
        category: "🥤 Frappés",
        icon: "🥤",
        products: [
            ["Frappé Clásico", 13000],
            ["Frappé de Chocolate", 14000],
            ["Frappé de Moca", 14000],
            ["Frappé de Caramelo", 14000],
            ["Frappé de Oreo", 15000],
            ["Frappé de Fresa", 14000],
            ["Frappé de Matcha", 15000]
        ]
    },

    // TÉS
    {
        category: "🍵 Tés",
        icon: "🍵",
        products: [
            ["Té Verde", 6500],
            ["Té Negro", 6500],
            ["Té de Manzanilla", 6500],
            ["Té de Frutos Rojos", 7000],
            ["Té Chai", 8000],
            ["Té de Hierbabuena", 7000]
        ]
    },

    // REFRESCANTES
    {
        category: "🫧 Bebidas Refrescantes",
        icon: "🫧",
        products: [
            ["Agua Natural", 3500],
            ["Agua con Gas", 4000],
            ["Limonada Natural", 7500],
            ["Limonada de Coco", 10500],
            ["Limonada Cerezada", 12500],
            ["Soda Italiana", 11000],
            ["Té Helado de Durazno", 8500]
        ]
    },

    // PANADERÍA
    {
        category: "🥐 Panadería",
        icon: "🥐",
        products: [
            ["Croissant de Mantequilla", 5000],
            ["Croissant de Jamón y Queso", 8000],
            ["Pan de Chocolate", 6500],
            ["Roll de Canela", 8500],
            ["Muffin", 7500],
            ["Bagel con Queso Crema", 8500],
            ["Pan de Queso", 4500],
            ["Dedito de Queso", 5000]
        ]
    },

    // POSTRES
    {
        category: "🍰 Postres",
        icon: "🍰",
        products: [
            ["Cheesecake de Fresa", 12000],
            ["Cheesecake de Limón", 12000],
            ["Cheesecake de Maracuyá", 12000],
            ["Flan de Vainilla", 8500],
            ["Flan de Caramelo", 9000],
            ["Tres Leches Clásico", 11500],
            ["Tres Leches de Chocolate", 12500],
            ["Tres Leches de Arequipe", 12500],
            ["Milhojas Napoleón de Vainilla", 12000],
            ["Milhojas Napoleón de Chocolate", 12500],
            ["Milhojas Napoleón de Arequipe", 12500],
            ["Milhojas Napoleón de Fresa", 12500],
            ["Brownie con Helado", 13500],
            ["Torta Red Velvet", 13000],
            ["Torta de Chocolate", 12500],
            ["Tiramisú", 13500],
            ["Galleta Gigante con Chips de Chocolate", 7000],
            ["Macarons (3 unidades)", 9000],
            ["Alfajor", 6500]
        ]
    },

    // COMBOS
    {
        category: "💗 Combos",
        icon: "💗",
        products: [
            ["☀️ Combo Desayuno - Cappuccino + Croissant", 13500],
            ["🍥 Combo Clásico - Latte + Roll de Canela", 16500],
            ["🍰 Combo Dulce - Café + Cheesecake", 19500],
            ["🧊 Combo Frío - Iced Latte + Muffin", 16500],
            ["🥤 Combo Daly's - Frappé + Brownie con Helado", 25500],
            ["👯 Combo Friends - 2 bebidas + 2 postres", 42000]
        ]
    }
];


// =========================
// MOSTRAR MENÚ
// =========================

const menuContainer =
    document.getElementById("menu-container");

function formatPrice(price) {
    return "$" + price.toLocaleString("es-CO");
}

products.forEach(category => {

    const categoryElement =
        document.createElement("div");

    categoryElement.className = "category";

    categoryElement.innerHTML = `
        <h3 class="category-title">
            ${category.category}
        </h3>

        ${
            category.description
            ? `<p class="category-description">
                ${category.description}
              </p>`
            : ""
        }

        <div class="products-grid"></div>
    `;

    const grid =
        categoryElement.querySelector(".products-grid");

    category.products.forEach(product => {

        const name = product[0];
        const price = product[1];

        const card =
            document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-icon">
                ${category.icon}
            </div>

            <h4>${name}</h4>

            <p class="product-price">
                ${formatPrice(price)}
            </p>

            <button
                class="add-button"
                data-name="${name}"
                data-price="${price}">
                Agregar ♡
            </button>
        `;

        grid.appendChild(card);
    });

    menuContainer.appendChild(categoryElement);
});


// =========================
// CARRITO
// =========================

let cart = [];

const cartOverlay =
    document.getElementById("cart-overlay");

const cartItems =
    document.getElementById("cart-items");

const cartTotal =
    document.getElementById("cart-total");

const cartCount =
    document.getElementById("cart-count");


// =========================
// AGREGAR PRODUCTOS NORMALES
// =========================

document.addEventListener("click", event => {

    if (event.target.classList.contains("add-button")) {

        const name =
            event.target.dataset.name;

        const price =
            Number(event.target.dataset.price);

        const existingProduct =
            cart.find(item =>
                item.name === name &&
                !item.custom
            );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1,
                custom: false
            });
        }

        updateCart();

        event.target.textContent =
            "¡Agregado! ♡";

        setTimeout(() => {
            event.target.textContent =
                "Agregar ♡";
        }, 1000);
    }
});


// =========================
// ACTUALIZAR CARRITO
// =========================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let quantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p>
                Tu carrito está vacío ☕
            </p>
        `;
    }

    cart.forEach((item, index) => {

        total +=
            item.price * item.quantity;

        quantity +=
            item.quantity;

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <h4>
                ${item.name}
            </h4>

            <p>
                ${formatPrice(item.price)}
            </p>

            ${
                item.details
                ? `<p>${item.details}</p>`
                : ""
            }

            <div class="cart-controls">

                <button
                    onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

                <button
                    class="remove-item"
                    onclick="removeItem(${index})">
                    ✕
                </button>

            </div>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent =
        formatPrice(total);

    cartCount.textContent =
        quantity;
}


// =========================
// CAMBIAR CANTIDAD
// =========================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);
    }

    updateCart();
}


// =========================
// ELIMINAR PRODUCTO
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// =========================
// ABRIR / CERRAR CARRITO
// =========================

document
    .getElementById("open-cart")
    .addEventListener("click", () => {

        cartOverlay.classList.add("active");
    });


document
    .getElementById("close-cart")
    .addEventListener("click", () => {

        cartOverlay.classList.remove("active");
    });


// =========================
// FINALIZAR PEDIDO
// =========================

document
    .getElementById("checkout")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            alert(
                "Tu carrito está vacío ☕"
            );

            return;
        }

        alert(
            "¡Gracias por tu pedido en Daly's Coffee! ♡\n\n" +
            "Tu pedido ha sido registrado correctamente."
        );

        cart = [];

        updateCart();

        cartOverlay.classList.remove("active");
    });


// =========================
// MENÚ HAMBURGUESA
// =========================

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");
});


document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
        });
    });


// =========================
// PERSONALIZACIÓN
// =========================

document
    .getElementById("save-customization")
    .addEventListener("click", () => {

        // BEBIDA BASE

        const baseSelect =
            document.getElementById("custom-base");

        const baseName =
            baseSelect.value;

        const basePrice =
            Number(
                baseSelect
                    .options[
                        baseSelect.selectedIndex
                    ]
                    .dataset.price
            );


        // LECHE

        const milkInput =
            document.querySelector(
                'input[name="milk"]:checked'
            );

        const milk =
            milkInput.value;

        const milkPrice =
            Number(milkInput.dataset.price);


        // TAMAÑO

        const sizeInput =
            document.querySelector(
                'input[name="size"]:checked'
            );

        const size =
            sizeInput.value;

        const sizePrice =
            Number(sizeInput.dataset.price);


        // ENDULZANTE

        const sweetenerSelect =
            document.getElementById("sweetener");

        const sweetener =
            sweetenerSelect.value;

        const sweetenerPrice =
            Number(
                sweetenerSelect
                    .options[
                        sweetenerSelect.selectedIndex
                    ]
                    .dataset.price
            );


        // TEMPERATURA

        const temperature =
            document.getElementById(
                "temperature"
            ).value;


        // EXTRAS

        const extras = [];

        let extrasPrice = 0;

        document
            .querySelectorAll(
                '.custom-group input[type="checkbox"]:checked'
            )
            .forEach(input => {

                extras.push(input.value);

                extrasPrice +=
                    Number(input.dataset.price);
            });


        // PRECIO FINAL

        const totalPrice =
            basePrice +
            milkPrice +
            sizePrice +
            sweetenerPrice +
            extrasPrice;


        // DETALLES

        const details = [
            size,
            milk,
            sweetener,
            temperature
        ];

        if (extras.length > 0) {

            details.push(
                "Extras: " +
                extras.join(", ")
            );
        }


        // AGREGAR AL CARRITO

        cart.push({

            name:
                `${baseName} personalizado`,

            price:
                totalPrice,

            quantity:
                1,

            details:
                details.join(" · "),

            custom:
                true
        });


        // ACTUALIZAR CARRITO

        updateCart();


        // MENSAJE

        const message =
            document.getElementById(
                "custom-message"
            );

        message.textContent =
            `¡${baseName} personalizado agregado al carrito! ♡ ` +
            `${formatPrice(totalPrice)}`;
    });


// =========================
// FORMULARIO DE CONTACTO
// =========================

const contactForm =
    document.getElementById(
        "contact-form"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("contact-name")
                .value
                .trim();


        const email =
            document
                .getElementById("contact-email")
                .value
                .trim();


        const message =
            document
                .getElementById("contact-message")
                .value
                .trim();


        const nameError =
            document.getElementById(
                "name-error"
            );


        const emailError =
            document.getElementById(
                "email-error"
            );


        const messageError =
            document.getElementById(
                "message-error"
            );


        const formMessage =
            document.getElementById(
                "form-message"
            );


        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        formMessage.textContent = "";


        let valid = true;


        if (name === "") {

            nameError.textContent =
                "Escribe tu nombre.";

            valid = false;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (email === "") {

            emailError.textContent =
                "Escribe tu correo.";

            valid = false;

        } else if (
            !emailPattern.test(email)
        ) {

            emailError.textContent =
                "Escribe un correo válido.";

            valid = false;
        }


        if (message === "") {

            messageError.textContent =
                "Escribe un mensaje.";

            valid = false;

        } else if (
            message.length < 10
        ) {

            messageError.textContent =
                "El mensaje debe tener mínimo 10 caracteres.";

            valid = false;
        }


        if (valid) {

            formMessage.textContent =
                "¡Mensaje enviado correctamente! ♡";

            contactForm.reset();

        } else {

            formMessage.textContent =
                "Revisa los campos marcados.";
        }
    }
);
// =========================
// ASISTENTE DALY'S COFFEE
// =========================

const aiButton =
    document.getElementById("ai-button");

const aiChat =
    document.getElementById("ai-chat");

const aiClose =
    document.getElementById("ai-close");


aiButton.addEventListener(
    "click",
    () => {

        aiChat.classList.toggle("active");

    }
);


aiClose.addEventListener(
    "click",
    () => {

        aiChat.classList.remove("active");

    }
);


// =========================
// RECOMENDACIONES
// =========================

function aiRecommend(type) {

    let recommendation;
    let price;
    let description;


    if (type === "coffee") {

        recommendation =
            "Cappuccino";

        price = 9000;

        description =
            "Un clásico cremoso y equilibrado, perfecto si amas el sabor del café.";

    }


    if (type === "sweet") {

        recommendation =
            "Café Nutella";

        price = 12500;

        description =
            "Dulce, cremoso y chocolatoso. Una opción perfecta para darte un gustico.";

    }


    if (type === "cold") {

        recommendation =
            "Iced Moca";

        price = 11000;

        description =
            "Frío, refrescante y con una deliciosa combinación de café y chocolate.";

    }


    if (type === "special") {

        recommendation =
            "Pink Velvet Latte";

        price = 12500;

        description =
            "Una bebida diferente, dulce y con ese toque especial de Daly's Coffee.";

    }


    const messages =
        document.getElementById(
            "ai-messages"
        );


    messages.innerHTML = `

        <div class="ai-message bot">

            Según lo que elegiste,
            tengo una recomendación para ti 🩷

        </div>


        <div class="ai-result">

            <h3>
                ✨ ${recommendation}
            </h3>

            <p>
                ${description}
            </p>

            <p>
                <strong>
                    $${price.toLocaleString("es-CO")}
                </strong>
            </p>


            <button
                class="ai-cart-button"
                onclick="
                    addAIProduct(
                        '${recommendation}',
                        ${price}
                    )
                "
            >
                🛒 Agregar al carrito
            </button>

        </div>


        <div
            class="ai-options"
            style="margin-top: 15px;"
        >

            <button
                type="button"
                onclick="aiRestart()"
            >
                🔄 Elegir otra opción
            </button>

        </div>

    `;

}


// =========================
// AGREGAR RECOMENDACIÓN
// AL CARRITO
// =========================

function addAIProduct(
    name,
    price
) {

    const existingProduct =
        cart.find(item =>
            item.name === name &&
            !item.custom
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1,

            custom: false

        });

    }


    updateCart();


    const messages =
        document.getElementById(
            "ai-messages"
        );


    messages.innerHTML += `

        <div
            class="ai-message bot"
        >
            🩷 ¡Listo! ${name}
            fue agregado a tu carrito.
        </div>

    `;

}


// =========================
// REINICIAR ASISTENTE
// =========================

function aiRestart() {

    const messages =
        document.getElementById(
            "ai-messages"
        );


    messages.innerHTML = `

        <div class="ai-message bot">

            ¡Claro! ☕🩷
            <br><br>
            Vamos a buscar otra bebida para ti.

        </div>


        <div class="ai-question">

            ¿Qué se te antoja?

        </div>


        <div class="ai-options">

            <button
                type="button"
                onclick="aiRecommend('coffee')"
            >
                ☕ Algo con café
            </button>

            <button
                type="button"
                onclick="aiRecommend('sweet')"
            >
                🍫 Algo dulce
            </button>

            <button
                type="button"
                onclick="aiRecommend('cold')"
            >
                🧊 Algo frío
            </button>

            <button
                type="button"
                onclick="aiRecommend('special')"
            >
                ✨ Algo diferente
            </button>

        </div>

    `;

}