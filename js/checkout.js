document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutSummary();
    updateCartCount(); // From cart.js, ensure it's loaded

    const shippingForm = document.getElementById('shipping-form');
    const placeOrderButton = document.getElementById('place-order-button');

    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', () => {
            if (shippingForm.checkValidity()) {
                handlePlaceOrder();
            } else {
                shippingForm.reportValidity(); // Show HTML5 validation messages
                alert('Mohon lengkapi semua data pengiriman yang wajib diisi.');
            }
        });
    }
    
    // Update year in footer
    const yearSpan = document.getElementById('current-year-footer');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile menu (copied from script.js for standalone pages)
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

    // Redirect if cart is empty
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Keranjang Anda kosong. Anda akan diarahkan kembali ke halaman utama.");
        window.location.href = 'index.html';
    }
});

function loadCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummaryData = JSON.parse(localStorage.getItem('cartSummary')) || { subtotal: 0, shipping: 0, total: 0 };
    
    const orderSummaryContainer = document.getElementById('checkout-order-summary');
    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const totalEl = document.getElementById('summary-total');

    if (!orderSummaryContainer || !subtotalEl || !shippingEl || !totalEl) return;

    orderSummaryContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        orderSummaryContainer.innerHTML = '<p class="text-slate-gray">Tidak ada item di keranjang.</p>';
    } else {
        cart.forEach(item => {
            const itemHTML = `
                <div class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div class="flex items-center">
                        <img src="${item.image || 'https://via.placeholder.com/40x40.png?text=N/A'}" alt="${item.name}" class="w-10 h-10 object-cover rounded mr-3">
                        <div>
                            <p class="text-sm font-medium dark-text">${item.name} <span class="text-xs text-slate-gray">(x${item.quantity})</span></p>
                            <p class="text-xs text-slate-gray">${item.variation || ''}</p>
                        </div>
                    </div>
                    <p class="text-sm font-medium dark-text">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</p>
                </div>
            `;
            orderSummaryContainer.innerHTML += itemHTML;
        });
    }

    subtotalEl.textContent = `Rp ${cartSummaryData.subtotal.toLocaleString('id-ID')}`;
    shippingEl.textContent = `Rp ${cartSummaryData.shipping.toLocaleString('id-ID')}`;
    totalEl.textContent = `Rp ${cartSummaryData.total.toLocaleString('id-ID')}`;
}

function handlePlaceOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummary = JSON.parse(localStorage.getItem('cartSummary')) || { subtotal: 0, shipping: 0, total: 0 };

    if (cart.length === 0) {
        alert('Keranjang Anda kosong. Tidak dapat membuat pesanan.');
        return;
    }

    const shippingForm = document.getElementById('shipping-form');
    const shippingData = {
        fullName: shippingForm.elements.fullName.value,
        phone: shippingForm.elements.phone.value,
        address: shippingForm.elements.address.value,
        city: shippingForm.elements.city.value,
        postalCode: shippingForm.elements.postalCode.value,
        notes: shippingForm.elements.notes.value || ""
    };

    const orderDetails = {
        orderId: `MAYMART-${Date.now()}`, // Simple unique order ID
        orderDate: new Date().toISOString(),
        customerInfo: shippingData,
        items: cart,
        summary: cartSummary,
        paymentMethod: "Bayar di Tempat (COD)" // Hardcoded for now
    };

    // Store order details for the success page
    localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));

    // Clear the cart
    localStorage.removeItem('cart');
    localStorage.removeItem('cartSummary');
    
    // Update cart count in header (should be 0 now)
    if (typeof updateCartCount === "function") {
        updateCartCount();
    } else {
        console.warn("updateCartCount function is not available to reset header count.");
    }
    

    // Redirect to order success page
    window.location.href = 'order-success.html';
}

// Ensure updateCartCount is available if cart.js is loaded separately.
if (typeof window.updateCartCount === 'undefined') {
    window.updateCartCount = function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'inline-block' : 'none';
        });
    };
}