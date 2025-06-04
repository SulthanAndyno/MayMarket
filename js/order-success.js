// js/order-success.js

// This script assumes global.js, auth.js, and cart.js are loaded.
// DOMContentLoaded listener and basic setup are handled by inline script in order-success.html.

document.addEventListener('DOMContentLoaded', () => {
    loadOrderDetails();
    // updateCartCount() is called by global.js after navbar load,
    // and also by cart.js when cart is modified (cleared after order).
    // Explicit call here ensures it reflects cleared cart if order-success.js runs late.
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
});

function loadOrderDetails() {
    const orderDetailsString = localStorage.getItem('lastOrderDetails');
    const mainContentArea = document.querySelector('main.container .receipt-card-container'); // Target specific area

    if (!orderDetailsString) {
        if (mainContentArea) {
            mainContentArea.innerHTML = `
                <div class="content-card text-center py-10">
                    <i class="fas fa-exclamation-circle fa-3x text-red-500 mb-4"></i>
                    <h1 class="text-2xl font-bold text-light-text">Gagal Memuat Detail Pesanan</h1>
                    <p class="text-dark-subtext mt-2">Detail pesanan tidak ditemukan. Ini mungkin karena Anda mengunjungi halaman ini secara langsung atau data pesanan sudah tidak tersedia.</p>
                    <a href="index.html" class="btn btn-primary mt-6 py-2 px-6">Kembali ke Beranda</a>
                </div>`;
        }
        return;
    }

    try {
        const order = JSON.parse(orderDetailsString);

        // Populate success message with Order ID
        const orderIdMsgEl = document.getElementById('receipt-order-id-msg');
        if (orderIdMsgEl) orderIdMsgEl.textContent = order.orderId;

        // Populate receipt details
        document.getElementById('receipt-order-id').textContent = order.orderId;
        document.getElementById('receipt-order-date').textContent = new Date(order.orderDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        document.getElementById('receipt-customer-name').textContent = order.customerInfo.fullName;
        document.getElementById('receipt-customer-phone').textContent = order.customerInfo.phone;
        
        document.getElementById('receipt-shipping-address').textContent = order.customerInfo.address;
        document.getElementById('receipt-shipping-city-postal').textContent = `${order.customerInfo.city}, ${order.customerInfo.postalCode}`;

        const notesContainer = document.getElementById('receipt-customer-notes-container');
        const notesEl = document.getElementById('receipt-customer-notes');
        if (order.customerInfo.notes && order.customerInfo.notes.trim() !== "") {
            if (notesContainer) notesContainer.classList.remove('hidden');
            if (notesEl) notesEl.textContent = order.customerInfo.notes;
        } else {
            if (notesContainer) notesContainer.classList.add('hidden');
        }

        const itemsTableBody = document.getElementById('receipt-items-table');
        if (itemsTableBody) {
            itemsTableBody.innerHTML = ''; // Clear any existing rows
            order.items.forEach(item => {
                const rowHTML = `
                    <tr>
                        <td class="item-name-col">
                            <div class="item-name">${item.name}</div>
                            <div class="item-variation">${item.variation || ''}</div>
                        </td>
                        <td class="text-center">${item.quantity}</td>
                        <td class="text-right">Rp ${parseFloat(item.price).toLocaleString('id-ID')}</td>
                        <td class="text-right item-subtotal">Rp ${(parseFloat(item.price) * item.quantity).toLocaleString('id-ID')}</td>
                    </tr>
                `;
                itemsTableBody.innerHTML += rowHTML;
            });
        }

        document.getElementById('receipt-subtotal').textContent = `Rp ${parseFloat(order.summary.subtotal).toLocaleString('id-ID')}`;
        document.getElementById('receipt-shipping').textContent = `Rp ${parseFloat(order.summary.shipping).toLocaleString('id-ID')}`;
        document.getElementById('receipt-payment-method').textContent = order.paymentMethod;
        document.getElementById('receipt-total').textContent = `Rp ${parseFloat(order.summary.total).toLocaleString('id-ID')}`;

    } catch (error) {
        console.error("Error parsing order details:", error);
        if (mainContentArea) {
            mainContentArea.innerHTML = `<div class="content-card text-center py-10"><p class="text-red-500">Terjadi kesalahan saat memuat detail pesanan Anda.</p></div>`;
        }
    }
     // Optional: Do NOT clear 'lastOrderDetails' from localStorage here.
    // This allows the user to refresh the page and see their last order details or print again.
    // It will be overwritten upon a new successful order.
}