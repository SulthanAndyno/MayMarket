document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount(); // Initial count update for header
    setupCheckoutButton(); // Setup checkout button functionality
    
    // Update year in footer if the element exists
    const yearSpan = document.getElementById('current-year-footer');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile menu (copied from script.js for standalone pages like cart.html)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
             const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }
});

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems(); // Re-render cart display after saving
}

function addToCart(productId, productName, productPrice, productImage, quantity = 1, variation = null, productUnit = 'unit') {
    let cart = getCart();
    
    // If allProducts is available, try to get default variation if not provided
    if (!variation && window.allProducts) {
        const productDetails = window.allProducts.find(p => p.id === productId);
        if (productDetails && productDetails.variations && productDetails.variations.length > 0) {
            const defaultVariation = productDetails.variations.find(v => v.is_default);
            variation = defaultVariation ? defaultVariation.name : productDetails.variations[0].name;
             // Adjust price if variation has a specific base_price
            if (defaultVariation && typeof defaultVariation.base_price !== 'undefined') {
                productPrice = defaultVariation.base_price;
            }
        }
    }
    variation = variation || productUnit; // Fallback to unit if no specific variation

    const existingItemIndex = cart.findIndex(item => item.id === productId && item.variation === variation);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ 
            id: productId, 
            name: productName, 
            price: parseFloat(productPrice), 
            image: productImage, 
            quantity: quantity, 
            variation: variation 
        });
    }
    saveCart(cart);
    // Simple alert for now, could be a more sophisticated notification
    alert(`${productName} (${variation}) berhasil ditambahkan ke keranjang!`);
}


function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutButton = document.getElementById('checkout-button');

    if (!cartItemsContainer || !cartEmptyMessage || !cartSummary) return;

    const cart = getCart();
    cartItemsContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartEmptyMessage.classList.remove('hidden');
        cartSummary.classList.add('hidden');
        if (checkoutButton) checkoutButton.disabled = true;
        updateCartTotals(0); // Ensure totals are zeroed out
        return;
    }

    cartEmptyMessage.classList.add('hidden');
    cartSummary.classList.remove('hidden');
    if (checkoutButton) checkoutButton.disabled = false;

    cart.forEach((item, index) => {
        const itemTotalPrice = item.price * item.quantity;
        const cartItemHTML = `
            <div class="cart-item flex flex-col sm:flex-row items-center p-4 border-b border-gray-200">
                <img src="${item.image || 'https://via.placeholder.com/80x80.png?text=No+Image'}" alt="${item.name}" class="w-20 h-20 object-cover rounded mr-0 sm:mr-4 mb-2 sm:mb-0">
                <div class="flex-grow text-center sm:text-left">
                    <h3 class="text-lg font-semibold dark-text">${item.name}</h3>
                    ${item.variation ? `<p class="text-sm text-slate-gray">Variasi: ${item.variation}</p>` : ''}
                    <p class="text-md primary-text font-medium">Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
                <div class="flex items-center my-3 sm:my-0 sm:mx-4">
                    <button onclick="updateQuantity(${index}, -1)" class="px-3 py-1 text-slate-gray hover:bg-gray-100 rounded-l-md border border-r-0 border-gray-300">-</button>
                    <input type="number" value="${item.quantity}" onchange="setQuantity(${index}, this.value)" class="w-12 text-center border-t border-b border-gray-300 quantity-input p-1 focus:outline-none" min="1">
                    <button onclick="updateQuantity(${index}, 1)" class="px-3 py-1 text-slate-gray hover:bg-gray-100 rounded-r-md border border-l-0 border-gray-300">+</button>
                </div>
                <p class="text-lg font-semibold dark-text w-full sm:w-24 text-center sm:text-right my-2 sm:my-0">Rp ${itemTotalPrice.toLocaleString('id-ID')}</p>
                <button onclick="removeFromCart(${index})" class="ml-0 sm:ml-4 text-red-500 hover:text-red-700 transition-colors">
                    <i class="fas fa-trash-alt fa-lg"></i>
                </button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    updateCartTotals();
}

function updateQuantity(index, change) {
    let cart = getCart();
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1; // Minimum quantity is 1
        }
        saveCart(cart);
    }
}

function setQuantity(index, newQuantity) {
    let cart = getCart();
    const quantity = parseInt(newQuantity);
    if (cart[index] && quantity >= 1) {
        cart[index].quantity = quantity;
        saveCart(cart);
    } else {
        // Revert to old value if input is invalid
        displayCartItems();
    }
}

function removeFromCart(index) {
    if (confirm('Anda yakin ingin menghapus item ini dari keranjang?')) {
        let cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
    }
}

function updateCartTotals(subtotalValue = null) {
    const cart = getCart();
    const subtotal = subtotalValue !== null ? subtotalValue : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const shippingCostElement = document.getElementById('shipping-cost');
    const shippingCost = cart.length > 0 ? 10000 : 0; // Example fixed shipping, or 0 if cart empty

    if (shippingCostElement) {
        shippingCostElement.textContent = `Rp ${shippingCost.toLocaleString('id-ID')}${cart.length > 0 ? ' (Estimasi)' : ''}`;
    }
    
    const total = subtotal + shippingCost;

    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartTotalEl = document.getElementById('cart-total');

    if (cartSubtotalEl) cartSubtotalEl.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    if (cartTotalEl) cartTotalEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;

    localStorage.setItem('cartSummary', JSON.stringify({
        subtotal: subtotal,
        shipping: shippingCost,
        total: total
    }));
}


function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}

function setupCheckoutButton() {
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                alert('Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.');
            }
        });
    }
}

// Make functions globally available if they are called from inline HTML event attributes
window.updateQuantity = updateQuantity;
window.setQuantity = setQuantity;
window.removeFromCart = removeFromCart;
window.addToCart = addToCart; // Ensure addToCart from script.js is overridden or consistent
window.updateCartCount = updateCartCount; // Make sure this is global for other scripts
