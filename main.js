// Products array with details about each product (name, price, description, image, etc.)
let products = [
  { 
    id: 1, 
    name: "Renate Hair Treatment Set", 
    price: 99.0, 
    description: "Renate Hair Treatment Sets will treat, heal, pamper, and grow your hair super fast. The No.1 selling hair products kit in 15+ countries, the 6 products in the Renate Hair Treatment set will help you cure dandruff, grow edges, soften stubborn hair, stop split ends, breakage and promote quick healthy hair growth. ", 
    image: "images/renate.jpg"
  },
  { 
    id: 2, 
    name: "Olive Oil", 
    price: 25.0, 
    description: "Organics by Africa's Best Olive Oil Hair Relaxer Kit | No-Lye Super Coarse System | Conditions & Moisturizes | for Healthier, Softer, I recommend the dark and lovely range because I recommend the dark and lovely range because Silkier,ts in the Renate Hair Treatment set will help you cure dandruff, grow edges,  Straighter Hair", 
    image: "images/olive.jpg"
  },
  { 
    id: 3, 
    name: "Dark and Lovely", 
    price: 50.0, 
    description: "To keep relaxed hair moisturized, use a moisturizing lotion, hydrating spray and/or leave-in conditioner. I recommend the dark and lovely range because it’s not only affordable but it works really well. We can also all agree that Dark and Lovely was the ambassador of relaxed hair. I believe most of us used their new beginnings relaxing kit..", 
    image: "images/Dark.jpg"
  },
  { 
    id: 4, 
    name: "Cantu hair product", 
    price: 1000.0, 
    description: "This Cantu Essentials -  Bundle helps you embrace your natural, beautiful and textured hair as well as owning your unique style. Cantu is here to celebrate these strong, gorgeous women and their strong, gorgeous hair, because perfect natural is what Cantu is all about.and it a good. It Nourishes & treats your hair.", 
    image: "images/1.jpg"
  },
  { 
    id: 5, 
    name: "Natural Black Hair Shampoo", 
    price: 50.0, 
    description: "Natural Black Hair Shampoo, ts in the Renate Hair Treatment set will help you cure dandruff, grow edges, White to Black Shampoo for Men and Women,because it’s not only affordable but it White Hair Removal Dye Hair Coloring Shampoo(250ml)", 
    image: "images/2.jpg"
  },
  { 
    id: 6, 
    name: "Lotta Gel", 
    price: 50.0, 
    description: "Lottabody has been a staple hair care product for several years; its practically synonymous with term setting lotion. It was the go-to product for set styles and wraps, whether you were at the salon or doing your own hair at home.", 
    image: "images/lotta.jpg"
  },

];
// Cart array to store items that the user adds to their cart
const cart = [];

//Render the list of products on the page.
// Maps over the `products` array and dynamically generates HTML for each product.
 
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (p) => `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>$${p.price.toFixed(2)}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `
    )
    .join("");
}

/**
 * Render the cart section, including all items in the cart and the total price.
 * Adds input fields to allow quantity changes and includes "Remove" buttons for each item.
 */
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <li>
        ${item.name} - $${item.price.toFixed(2)} x 
        <input type="number" min="1" value="${item.quantity}" onchange="updateCart(${item.id}, this.value)">
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </li>
    `
    )
    .join("");
// Calculate the total price of items in the cart
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
  // Show or hide the checkout button based on whether the cart is empty
  checkoutBtn.classList.toggle("hidden", cart.length === 0);
}

/**
 * Add a product to the cart.
 * If the product is already in the cart, increment its quantity. Otherwise, add it as a new item.
 */
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

/**
 * Update the quantity of an item in the cart.
 * Ensures the quantity is at least 1.
 */
function updateCart(id, quantity) {
  const cartItem = cart.find((item) => item.id === id);
  if (cartItem) {
    cartItem.quantity = Math.max(1, parseInt(quantity));
  }
  renderCart();
}

// Remove item from cart
function removeFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);
  if (index > -1) {
    cart.splice(index, 1);
  }
  renderCart();
}
// Edit Cart Item
function editCartItem(id) {
  const cartItem = cart.find((item) => item.id === id);
  if (!cartItem) return;

  // Prompt the user for a new quantity (you can replace this with a modal or inline edit)
  const newQuantity = prompt(
    `Edit quantity for ${cartItem.name}:`,
    cartItem.quantity
  );

  // Validate and update the cart
  const parsedQuantity = parseInt(newQuantity);
  if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
    cartItem.quantity = parsedQuantity;
    renderCart();
  } else {
    alert("Invalid quantity! Please enter a valid number.");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById("checkout-btn");
  const closeModalButton = document.getElementById("close-modal-btn");
  const modal = document.getElementById("checkout-modal");

  // Open Modal when clicking Checkout
  checkoutButton.addEventListener("click", () => toggleModal(true));

  // Close Modal when clicking Close Button
  closeModalButton.addEventListener("click", () => toggleModal(false));

  // Close Modal when clicking outside the modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) toggleModal(false);
  });
});

function toggleModal(visible) {
  const modal = document.getElementById("checkout-modal");
  modal.classList.toggle("hidden", !visible);
}


/**
 * Handle the checkout process.
 * Prevents the default form submission, clears the cart, and shows a success message.
 */

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Order placed successfully!");
  cart.length = 0; // Clear the cart
  renderCart();
  document.getElementById("checkout-section").classList.add("hidden");
});

// Search functionality
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(query));
  document.getElementById("product-list").innerHTML = filteredProducts
    .map(
      (p) => `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>$${p.price.toFixed(2)}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `
    )
    .join("");
});

// Initialize the app by rendering the products
document.addEventListener("DOMContentLoaded", renderProducts);
