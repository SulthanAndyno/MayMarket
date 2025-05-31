document.addEventListener('DOMContentLoaded', () => {
    // Logika global sudah dihandle di skrip inline HTML
    // Logika spesifik checkout.js:
    // Pengecekan login dan keranjang kosong akan dipanggil dari skrip global
    // loadCheckoutSummary(); // Akan dipanggil dari skrip global setelah cek login
    // updateCartCount(); // Sudah di skrip global

    // Form handling akan tetap di sini tapi dipastikan berjalan setelah cek login
});

function loadCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummaryData = JSON.parse(localStorage.getItem('cartSummary')) || { subtotal: 0, shipping: 0, total: 0 };
    
    const orderSummaryContainer = document.getElementById('checkout-order-summary');
    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const totalEl = document.getElementById('summary-total');

    if (!orderSummaryContainer || !subtotalEl || !shippingEl || !totalEl) return;

    orderSummaryContainer.innerHTML = ''; 

    if (cart.length === 0) {
        orderSummaryContainer.innerHTML = '<p class="text-slate-gray dark:text-dark-subtext">Tidak ada item di keranjang.</p>';
    } else {
        cart.forEach(item => {
            const itemHTML = `
                <div class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-dark-border/20 last:border-b-0">
                    <div class="flex items-center">
                        <img src="${item.image || 'https://via.placeholder.com/40x40.png?text=N/A'}" alt="${item.name}" class="w-10 h-10 object-cover rounded mr-3">
                        <div>
                            <p class="text-sm font-medium text-gray-800 dark:text-light-text">${item.name} <span class="text-xs text-gray-500 dark:text-dark-subtext">(x${item.quantity})</span></p>
                            <p class="text-xs text-gray-500 dark:text-dark-subtext">${item.variation || ''}</p>
                        </div>
                    </div>
                    <p class="text-sm font-medium text-gray-800 dark:text-light-text">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</p>
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
        orderId: `MAYMART-${Date.now()}`, 
        orderDate: new Date().toISOString(),
        customerInfo: shippingData,
        items: cart,
        summary: cartSummary,
        paymentMethod: "Bayar di Tempat (COD)" 
    };

    localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
    localStorage.removeItem('cart');
    localStorage.removeItem('cartSummary');
    
    if (typeof updateCartCount === "function") updateCartCount();
    
    // Transisi fade out sebelum redirect
    if (document.body.classList.contains('loaded')) {
        document.body.classList.remove('loaded');
        setTimeout(() => {
            window.location.href = 'order-success.html';
        }, 500);
    } else {
        window.location.href = 'order-success.html';
    }
}

if (typeof window.updateCartCount === 'undefined') {
    window.updateCartCount = function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            if(el){
                el.textContent = totalItems;
                el.style.display = totalItems > 0 ? 'inline-block' : 'none';
            }
        });
    };
}