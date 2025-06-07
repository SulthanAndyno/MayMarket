document.addEventListener('DOMContentLoaded', () => {
    // Check if the necessary UI elements for cart display exist on the current page
    if (document.getElementById('cart-items-container')) {
        if (isLoggedIn()) { // isLoggedIn from auth.js
            displayCartItems();
            setupCheckoutButton();
        } else {
            // If on cart.html and not logged in, the inline script in cart.html handles message/redirect.
            // This check is more for other pages that might interact with cart display functions.
        }
    }
    updateCartCount(); // Always update cart count in navbar
});

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    // Re-render cart display only if the cart items container is present
    if (document.getElementById('cart-items-container')) {
        displayCartItems();
    }
    // Also update totals if summary section is present
    if (document.getElementById('cart-summary')) {
        updateCartTotals();
    }
}

function addToCart(productId, productName, productPrice, productImage, quantity = 1, variation = null) {
    if (!isLoggedIn()) {
        alert("Anda harus login untuk menambahkan item ke keranjang.");
        redirectToLogin(window.location.href); // Redirect back to current page after login
        return;
    }

    let cart = getCart();
    // Ensure productPrice is a number
    productPrice = parseFloat(productPrice);
    if (isNaN(productPrice)) {
        console.error("Invalid product price for:", productName);
        return; // Or handle with a default price / error message
    }

    // Default variation to product unit if not provided explicitly
    // This relies on allProducts being available if product details are needed for unit
    let productUnit = 'unit'; // Default unit
    if (window.allProducts) {
        const productData = window.allProducts.find(p => p.id === productId);
        if (productData) productUnit = productData.unit;
    }
    variation = variation || productUnit;

    const existingItemIndex = cart.findIndex(item => item.id === productId && item.variation === variation);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ 
            id: productId, 
            name: productName, 
            price: productPrice, 
            image: productImage, 
            quantity: quantity, 
            variation: variation 
        });
    }
    saveCart(cart);
    // Provide user feedback (e.g., a toast notification or simple alert)
    alert(`${quantity} x ${productName} (${variation}) telah ditambahkan ke keranjang!`);
}
window.addToCart = addToCart; // Expose globally for onclick handlers in product cards

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartSummaryDiv = document.getElementById('cart-summary');
    
    if (!cartItemsContainer) return; // Only run if cart display elements are on the page

    const cart = getCart();
    cartItemsContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        if (cartEmptyMessage) cartEmptyMessage.classList.remove('hidden');
        if (cartSummaryDiv) cartSummaryDiv.classList.add('hidden');
        updateCartTotals(0); // Ensure totals are zeroed out
        return;
    }

    if (cartEmptyMessage) cartEmptyMessage.classList.add('hidden');
    if (cartSummaryDiv) cartSummaryDiv.classList.remove('hidden');

    cart.forEach((item, index) => {
        const itemTotalPrice = item.price * item.quantity;
        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image || 'images/placeholder.png'}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    ${item.variation ? `<p class="cart-item-variation">Variasi: ${item.variation}</p>` : ''}
                    <p class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
                <div class="cart-item-quantity-controls">
                    <button onclick="updateCartItemQuantity(${index}, -1)" class="quantity-button minus">-</button>
                    <input type="number" value="${item.quantity}" onchange="setCartItemQuantity(${index}, this.value)" class="quantity-input" min="1">
                    <button onclick="updateCartItemQuantity(${index}, 1)" class="quantity-button plus">+</button>
                </div>
                <p class="cart-item-total-price">Rp ${itemTotalPrice.toLocaleString('id-ID')}</p>
                <button onclick="removeFromCart(${index})" class="cart-item-remove-button" aria-label="Hapus item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    updateCartTotals();
}

function updateCartItemQuantity(index, change) {
    let cart = getCart();
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1; // Minimum quantity is 1
        }
        saveCart(cart);
    }
}
window.updateCartItemQuantity = updateCartItemQuantity; // Expose for onclick

function setCartItemQuantity(index, newQuantity) {
    let cart = getCart();
    const quantity = parseInt(newQuantity);
    if (cart[index] && quantity >= 1) {
        cart[index].quantity = quantity;
        saveCart(cart);
    } else if (cart[index]) {
        // If input is invalid (e.g., less than 1 or not a number), revert to current display
        // This will effectively refresh the input to its last valid state from the cart
        displayCartItems(); 
    }
}
window.setCartItemQuantity = setCartItemQuantity; // Expose for onchange

function removeFromCart(index) {
    if (confirm('Anda yakin ingin menghapus item ini dari keranjang?')) {
        let cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
    }
}
window.removeFromCart = removeFromCart; // Expose for onclick

function updateCartTotals(subtotalValue = null) {
    const cart = getCart();
    const subtotal = subtotalValue !== null ? subtotalValue : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const shippingCostElement = document.getElementById('shipping-cost');
    // Example fixed shipping, or 0 if cart empty. Could be more dynamic.
    const shippingCost = cart.length > 0 ? 10000 : 0; 

    if (shippingCostElement) {
        shippingCostElement.textContent = `Rp ${shippingCost.toLocaleString('id-ID')}${cart.length > 0 ? ' (Estimasi)' : ''}`;
    }
    
    const total = subtotal + shippingCost;

    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    if (cartSubtotalEl) cartSubtotalEl.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    if (cartTotalEl) cartTotalEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    if (checkoutButton) checkoutButton.disabled = cart.length === 0;


    // Save summary to localStorage for checkout page
    localStorage.setItem('cartSummary', JSON.stringify({
        subtotal: subtotal,
        shipping: shippingCost,
        total: total
    }));
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountBadges = document.querySelectorAll('#cart-count'); // Targets all cart count badges
    cartCountBadges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}
// Make updateCartCount globally available as it's called by other scripts like auth.js
window.updateCartCount = updateCartCount;

function setupCheckoutButton() {
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (!isLoggedIn()) {
                alert('Anda harus login untuk melanjutkan ke checkout.');
                redirectToLogin('checkout.html');
                return;
            }
            const cart = getCart();
            if (cart.length > 0) {
                document.body.classList.remove('loaded');
                setTimeout(() => { window.location.href = 'checkout.html'; }, 300);
            } else {
                alert('Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.');
            }
        });
    }
}