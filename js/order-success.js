document.addEventListener('DOMContentLoaded', () => {
    loadOrderDetails();
    updateCartCount(); // From cart.js

    // Update year in footer
    const yearSpan = document.getElementById('current-year-footer');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Mobile menu
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

function loadOrderDetails() {
    const orderDetailsString = localStorage.getItem('lastOrderDetails');
    if (!orderDetailsString) {
        // Handle case where order details are not found, maybe redirect or show error
        const mainContent = document.querySelector('main .bg-white');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
                    <h1 class="text-3xl font-bold dark-text">Gagal Memuat Detail Pesanan</h1>
                    <p class="text-slate-gray mt-2">Detail pesanan tidak ditemukan. Mohon coba lagi atau hubungi dukungan.</p>
                    <a href="index.html" class="btn-primary mt-6 py-2 px-6 rounded-md inline-block">Kembali ke Beranda</a>
                </div>`;
        }
        return;
    }

    const order = JSON.parse(orderDetailsString);

    // Populate success message
    document.getElementById('receipt-order-id-msg').textContent = order.orderId;

    // Populate receipt details
    document.getElementById('receipt-order-id').textContent = order.orderId;
    document.getElementById('receipt-order-date').textContent = new Date(order.orderDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    document.getElementById('receipt-customer-name').textContent = order.customerInfo.fullName;
    document.getElementById('receipt-customer-phone').textContent = order.customerInfo.phone;
    
    document.getElementById('receipt-shipping-address').textContent = order.customerInfo.address;
    document.getElementById('receipt-shipping-city-postal').textContent = `${order.customerInfo.city}, ${order.customerInfo.postalCode}`;

    if (order.customerInfo.notes && order.customerInfo.notes.trim() !== "") {
        document.getElementById('receipt-customer-notes-container').classList.remove('hidden');
        document.getElementById('receipt-customer-notes').textContent = order.customerInfo.notes;
    } else {
        document.getElementById('receipt-customer-notes-container').classList.add('hidden');
    }


    const itemsTableBody = document.getElementById('receipt-items-table');
    itemsTableBody.innerHTML = ''; // Clear any existing rows
    order.items.forEach(item => {
        const row = `
            <tr>
                <td class="px-4 py-3 whitespace-nowrap">
                    <div class="text-sm dark-text">${item.name}</div>
                    <div class="text-xs text-slate-gray">${item.variation || ''}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-slate-gray text-center">${item.quantity}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm text-slate-gray text-right">Rp ${item.price.toLocaleString('id-ID')}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm dark-text text-right font-medium">Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</td>
            </tr>
        `;
        itemsTableBody.innerHTML += row;
    });

    document.getElementById('receipt-subtotal').textContent = `Rp ${order.summary.subtotal.toLocaleString('id-ID')}`;
    document.getElementById('receipt-shipping').textContent = `Rp ${order.summary.shipping.toLocaleString('id-ID')}`;
    document.getElementById('receipt-payment-method').textContent = order.paymentMethod;
    document.getElementById('receipt-total').textContent = `Rp ${order.summary.total.toLocaleString('id-ID')}`;

    // Optional: Clear the lastOrderDetails from localStorage after displaying it,
    // so it's not shown again if the user revisits the page without a new order.
    // localStorage.removeItem('lastOrderDetails'); 
    // For now, let's keep it so user can refresh and see their last order, or print again.
}

// Make updateCartCount available if cart.js is loaded separately.
if (typeof window.updateCartCount === 'undefined') {
    window.updateCartCount = function() {
        // This is a fallback. Actual logic is in cart.js
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            el.textContent = '0'; // Assume cart is empty after order
            el.style.display = 'none';
        });
    };
}