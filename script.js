/* =========================
   PANIER
========================= */

let cart = JSON.parse(localStorage.getItem("nayaCart")) || [];


function saveCart() {

    localStorage.setItem(
        "nayaCart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const counters =
        document.querySelectorAll("#cart-count");

    counters.forEach(counter => {

        counter.textContent = cart.length;

    });

}


function addToCart(name, price) {

    cart.push({
        name: name,
        price: Number(price)
    });

    saveCart();

    updateCartCount();

    alert(name + " a été ajouté au panier.");

}


document.querySelectorAll(".add-cart")
.forEach(button => {

    button.addEventListener("click", () => {

        addToCart(
            button.dataset.name,
            button.dataset.price
        );

    });

});


/* =========================
   AFFICHAGE PANIER
========================= */

function displayCart() {

    const container =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");


    if (!container) return;


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML =
            "<p>Votre panier est vide.</p>";

        if (totalElement) {
            totalElement.textContent = "0 FCFA";
        }

        return;

    }


    let total = 0;


    cart.forEach((product, index) => {

        total += product.price;


        const item =
            document.createElement("div");

        item.classList.add("cart-item");


        item.innerHTML = `

            <div>

                <strong>
                    ${product.name}
                </strong>

                <p>
                    ${product.price.toLocaleString()} FCFA
                </p>

            </div>

            <button
                class="remove-product"
                data-index="${index}">

                Supprimer

            </button>

        `;


        container.appendChild(item);

    });


    totalElement.textContent =
        total.toLocaleString() + " FCFA";


    document
        .querySelectorAll(".remove-product")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    cart.splice(
                        button.dataset.index,
                        1
                    );

                    saveCart();

                    displayCart();

                    updateCartCount();

                }
            );

        });

}


displayCart();

updateCartCount();


/* =========================
   FILTRES BOUTIQUE
========================= */

const filters =
    document.querySelectorAll(".filter");

const products =
    document.querySelectorAll(".product");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item =>
            item.classList.remove("active")
        );

        filter.classList.add("active");


        const category =
            filter.dataset.category;


        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});