function addToCart(productId) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    if (!cart.includes(productId)) {
        cart.push(productId);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}