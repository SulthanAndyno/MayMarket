// js/checkout.js

// This script assumes global.js, auth.js, and cart.js are loaded.
// DOMContentLoaded listener and login/cart checks are handled by inline script in checkout.html

function loadCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummaryData = JSON.parse(localStorage.getItem('cartSummary')) || { subtotal: 0, shipping: 0, total: 0 };
    
    const orderSummaryContainer = document.getElementById('checkout-order-summary');
    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const totalEl = document.getElementById('summary-total');

    if (!orderSummaryContainer || !subtotalEl || !shippingEl || !totalEl) {
        console.error("Checkout summary elements not found.");
        return;
    }

    orderSummaryContainer.innerHTML = ''; // Clear previous summary

    if (cart.length === 0) {
        orderSummaryContainer.innerHTML = '<p class="text-subtle">Tidak ada item di keranjang untuk checkout.</p>';
    } else {
        cart.forEach(item => {
            const itemHTML = `
                <div class="summary-item">
                    <div class="summary-item-info">
                        <img src="${item.image || 'images/placeholder.png'}" alt="${item.name}" class="summary-item-image">
                        <div>
                            <p class="summary-item-name">${item.name} <span class="summary-item-qty">(x${item.quantity})</span></p>
                            <p class="summary-item-variation">${item.variation || ''}</p>
                        </div>
                    </div>
                    <p class="summary-item-price">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</p>
                </div>
            `;
            orderSummaryContainer.innerHTML += itemHTML;
        });
    }

    subtotalEl.textContent = `Rp ${cartSummaryData.subtotal.toLocaleString('id-ID')}`;
    shippingEl.textContent = `Rp ${cartSummaryData.shipping.toLocaleString('id-ID')}`;
    totalEl.textContent = `Rp ${cartSummaryData.total.toLocaleString('id-ID')}`;
}
// Expose if needed by inline script, though current setup calls it from inline script's DOMContentLoaded
window.loadCheckoutSummary = loadCheckoutSummary;


function handlePlaceOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummary = JSON.parse(localStorage.getItem('cartSummary')) || { subtotal: 0, shipping: 0, total: 0 };

    // This check is also in HTML's inline script, but good for robustness
    if (cart.length === 0) {
        alert('Keranjang Anda kosong. Tidak dapat membuat pesanan.');
        window.location.href = 'products.html'; // Redirect to products page
        return;
    }

    const shippingForm = document.getElementById('shipping-form');
    if (!shippingForm.checkValidity()) {
        shippingForm.reportValidity();
        alert('Mohon lengkapi semua data pengiriman yang wajib diisi.');
        return;
    }

    const shippingData = {
        fullName: shippingForm.elements.fullName.value,
        phone: shippingForm.elements.phone.value,
        address: shippingForm.elements.address.value,
        city: shippingForm.elements.city.value,
        postalCode: shippingForm.elements.postalCode.value,
        notes: shippingForm.elements.notes.value.trim() || "" // Ensure notes is empty string if blank
    };

    const orderDetails = {
        orderId: `MAYMART-${Date.now()}`, 
        orderDate: new Date().toISOString(),
        customerInfo: shippingData,
        items: cart,
        summary: cartSummary,
        paymentMethod: "Bayar di Tempat (COD)" // Hardcoded for now
    };

    localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
    
    // Clear cart and summary from localStorage after order is placed
    localStorage.removeItem('cart');
    localStorage.removeItem('cartSummary');
    
    if (typeof updateCartCount === "function") {
        updateCartCount(); // Update navbar cart count to 0
    }
    
    // Transition fade out then redirect to order success page
    document.body.classList.remove('loaded');
    setTimeout(() => {
        window.location.href = 'order-success.html';
    }, 300); // Match transition duration
}
// Expose if needed, though current setup calls it from inline script
window.handlePlaceOrder = handlePlaceOrder;