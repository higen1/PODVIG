// Retrieve the cart items (IDs) from localStorage
function getCartItems() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Fetch all products from products.json
function fetchProducts() {
    return fetch('products.json')
             .then(response => response.json());
}

// Render the cart items onto the page
function renderCart() {
    const cartRow = document.getElementById('cart-row');
    const cartItems = getCartItems();

    if (cartItems.length === 0) {
        cartRow.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    fetchProducts().then(products => {
        // Filter products to only those in the cart
        const itemsToDisplay = products.filter(product => cartItems.includes(product.id));
        let html = '';
        itemsToDisplay.forEach(item => {
            html += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" style="max-width: 50px;">
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price}</p>
                    </div>
                </div>
            `;
        });
        cartRow.innerHTML = html;
    }).catch(error => {
        console.error('Error fetching products:', error);
        cartRow.innerHTML = '<p>Error loading cart items.</p>';
    });
}

// Run renderCart when the page loads
document.addEventListener('DOMContentLoaded', renderCart);