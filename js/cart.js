let cart = JSON.parse(localStorage.getItem('maymartCart')) || [];

function initializeCart() {
    updateCartCount();
    if (document.getElementById('cart-items-container')) { // Jika di halaman cart.html
        loadCartPage();
    }
}

function addItemToCart(item) {
    // Cek apakah item dengan ID dan variasi yang sama sudah ada
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id && cartItem.variation === item.variation);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    saveCart();
    updateCartCount();
}

function updateCartItemQuantity(productId, variationName, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === productId && item.variation === variationName);
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            removeItemFromCart(productId, variationName); // Hapus jika kuantitas 0 atau kurang
        } else {
            // Cek stok (jika perlu, tapi untuk cart kita asumsikan stok sudah divalidasi saat add)
            // const productData = products.find(p => p.id === productId);
            // if (productData && newQuantity > productData.stock) {
            //     alert(`Stok untuk ${productData.name} (${variationName}) tidak mencukupi.`);
            //     cart[itemIndex].quantity = productData.stock; // Set ke maks stok
            // } else {
                 cart[itemIndex].quantity = newQuantity;
            // }
        }
    }
    saveCart();
    loadCartPage(); // Muat ulang tampilan keranjang
}

function removeItemFromCart(productId, variationName) {
    cart = cart.filter(item => !(item.id === productId && item.variation === variationName));
    saveCart();
    loadCartPage(); // Muat ulang tampilan keranjang
}

function saveCart() {
    localStorage.setItem('maymartCart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.classList.toggle('hidden', totalItems === 0);
    }
}

function loadCartPage() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryDiv = document.getElementById('cart-summary');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const checkoutButton = document.getElementById('checkout-button');

    if (!cartItemsContainer) return; // Hanya jalan jika elemen ada

    cartItemsContainer.innerHTML = ''; // Kosongkan dulu

    if (cart.length === 0) {
        cartItemsContainer.classList.add('hidden');
        cartSummaryDiv.classList.add('hidden');
        cartEmptyMessage.classList.remove('hidden');
        if(checkoutButton) checkoutButton.classList.add('pointer-events-none', 'opacity-50');
        updateCartTotals(0); // Pastikan total jadi 0
        return;
    }

    cartItemsContainer.classList.remove('hidden');
    cartSummaryDiv.classList.remove('hidden');
    cartEmptyMessage.classList.add('hidden');
    if(checkoutButton) checkoutButton.classList.remove('pointer-events-none', 'opacity-50');


    let subtotal = 0;
    cart.forEach(item => {
        const itemTotalPrice = item.price * item.quantity;
        subtotal += itemTotalPrice;

        const cartItemHTML = `
            <div class="cart-item flex flex-col sm:flex-row items-start sm:items-center p-4 md:p-6 border-b border-gray-200 last:border-b-0 gap-4">
                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-md shadow">
                <div class="flex-grow">
                    <h3 class="text-lg font-semibold dark-text">${item.name}</h3>
                    <p class="text-sm text-slate-gray">Variasi: ${item.variation}</p>
                    <p class="text-md primary-text font-medium">${formatRupiah(item.price)}</p>
                </div>
                <div class="flex items-center my-2 sm:my-0 sm:mx-4">
                    <button onclick="updateCartItemQuantity(${item.id}, '${item.variation}', ${item.quantity - 1})" class="px-3 py-1 text-slate-gray hover:bg-gray-100 rounded-l-md border border-r-0 border-gray-300 focus:outline-none">-</button>
                    <input type="number" value="${item.quantity}" onchange="updateCartItemQuantity(${item.id}, '${item.variation}', parseInt(this.value))" min="1" class="w-12 text-center border border-gray-300 quantity-input p-1.5 focus:outline-none appearance-none">
                    <button onclick="updateCartItemQuantity(${item.id}, '${item.variation}', ${item.quantity + 1})" class="px-3 py-1 text-slate-gray hover:bg-gray-100 rounded-r-md border border-l-0 border-gray-300 focus:outline-none">+</button>
                </div>
                <p class="text-lg font-semibold dark-text w-full sm:w-28 text-left sm:text-right">${formatRupiah(itemTotalPrice)}</p>
                <button onclick="removeItemFromCart(${item.id}, '${item.variation}')" class="ml-auto sm:ml-4 text-red-500 hover:text-red-700 transition-colors" title="Hapus item">
                    <i class="fas fa-trash-alt fa-lg"></i>
                </button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });

    updateCartTotals(subtotal);
    updateCartCount(); // Pastikan count di header juga update
}

function updateCartTotals(subtotal) {
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    const shippingCost = cart.length > 0 ? 10000 : 0; // Contoh biaya kirim tetap jika ada barang

    if (subtotalElement) subtotalElement.textContent = formatRupiah(subtotal);
    if (totalElement) totalElement.textContent = formatRupiah(subtotal + shippingCost);
}

// Panggil initializeCart saat DOM siap
document.addEventListener('DOMContentLoaded', initializeCart);