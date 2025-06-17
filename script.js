// Initialize an empty array for the cart
let cart = [];

// Function to add an item to the cart
function addToCart(productId, productName, productPrice) {
    // Retrieve cart from localStorage or use the empty cart array
    const storedCart = localStorage.getItem('shoppingCart');
    cart = storedCart ? JSON.parse(storedCart) : [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        // If yes, increment its quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If no, add a new object to the cart
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    console.log(`${productName} added to cart. Current cart:`, cart);
    alert(`${productName} has been added to your cart!`); // Optional: user feedback
}

// Function to display the cart items
function displayCart() {
    const storedCart = localStorage.getItem('shoppingCart');
    cart = storedCart ? JSON.parse(storedCart) : [];

    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer) {
        // Not on cart.html or element is missing
        return;
    }

    // Clear any existing content
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        if (cartTotalElement) cartTotalElement.textContent = '$0.00';
        return;
    }

    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        total += itemSubtotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Subtotal: $${itemSubtotal.toFixed(2)}</p>
            <hr>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    if (cartTotalElement) {
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // For products.html
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            const productName = button.dataset.name;
            const productPrice = button.dataset.price;
            addToCart(productId, productName, productPrice);
        });
    });

    // For cart.html
    // Check if we are on cart.html by looking for the cart-items container
    if (document.getElementById('cart-items')) {
        displayCart();
    }
});
