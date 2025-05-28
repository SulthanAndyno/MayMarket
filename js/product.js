// Ini akan dieksekusi di product-detail.html
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId); // 'products' dari script.js

    const productDetailContainer = document.getElementById('product-detail-content');

    if (product && productDetailContainer) {
        let variationsOptions = '';
        if (product.variations && product.variations.length > 0) {
            variationsOptions = product.variations.map((v, index) => 
                `<option value="${index}" data-price-modifier="${v.priceModifier}">${v.name}</option>`
            ).join('');
        }

        productDetailContainer.innerHTML = `
            <div class="product-images">
                <a href="${product.imageLarge || product.image}" data-lightbox="product-gallery" data-title="${product.name}">
                    <img src="${product.image}" alt="${product.name}" id="main-product-image" class="w-full max-h-[500px] object-contain rounded-lg shadow-lg cursor-zoom-in border border-gray-200">
                </a>
                <!-- Tambahkan thumbnail jika ada array gambar lain -->
            </div>

            <div class="product-info">
                <h1 class="text-3xl md:text-4xl font-bold dark-text mb-2">${product.name}</h1>
                <p class="text-2xl primary-text font-semibold mb-4" id="product-price">${formatRupiah(product.price)}</p>
                
                <div class="mb-4">
                    <span class="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                        Stok: <span id="stock-level">${product.stock}</span> Tersedia
                    </span>
                </div>

                <p class="text-slate-gray mb-6 leading-relaxed">${product.description}</p>

                ${variationsOptions ? `
                <div class="mb-6">
                    <label for="variation-select" class="block text-sm font-medium text-slate-gray mb-1">Pilihan Kemasan:</label>
                    <select id="variation-select" name="variation" class="w-full md:w-2/3 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                        ${variationsOptions}
                    </select>
                </div>` : ''}

                <div class="flex items-center mb-6">
                    <label for="quantity-input" class="block text-sm font-medium text-slate-gray mr-3">Jumlah:</label>
                    <div class="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button onclick="updateDetailQuantity(-1, ${product.stock})" class="px-4 py-2 text-slate-gray hover:bg-gray-100 transition-colors focus:outline-none">-</button>
                        <input type="number" id="quantity-input" name="quantity" value="1" min="1" max="${product.stock}" class="w-16 text-center border-l border-r border-gray-300 quantity-input p-2 focus:outline-none appearance-none">
                        <button onclick="updateDetailQuantity(1, ${product.stock})" class="px-4 py-2 text-slate-gray hover:bg-gray-100 transition-colors focus:outline-none">+</button>
                    </div>
                </div>

                <button onclick="addToCartFromDetail(${product.id})" class="btn-primary w-full md:w-auto text-lg font-semibold py-3 px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <i class="fas fa-cart-plus mr-2"></i> Tambah ke Keranjang
                </button>
                 <p id="add-to-cart-message" class="text-sm primary-text mt-3 hidden"></p>
            </div>
        `;

        // Update harga berdasarkan variasi terpilih
        const variationSelect = document.getElementById('variation-select');
        const priceDisplay = document.getElementById('product-price');
        if (variationSelect && priceDisplay) {
            variationSelect.addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                const priceModifier = parseFloat(selectedOption.dataset.priceModifier);
                const basePrice = product.price;
                let finalPrice = basePrice;

                // Logika modifier: jika nama variasi mengandung "Promo" atau harga total, gunakan modifier sbg harga akhir
                const variationName = selectedOption.textContent.toLowerCase();
                if (variationName.includes("promo") || variationName.includes("total")) {
                    finalPrice = priceModifier; // Modifier adalah harga total
                } else {
                    finalPrice = basePrice + priceModifier; // Modifier adalah tambahan/pengurangan
                }
                priceDisplay.textContent = formatRupiah(finalPrice);
            });
            // Trigger change untuk set harga awal jika ada variasi
            if(product.variations && product.variations.length > 0) variationSelect.dispatchEvent(new Event('change'));
        }


    } else {
        productDetailContainer.innerHTML = `<p class="text-center text-xl text-slate-gray col-span-2">Produk tidak ditemukan.</p>`;
    }
}

function updateDetailQuantity(amount, maxStock) {
    const quantityInput = document.getElementById('quantity-input');
    let currentValue = parseInt(quantityInput.value);
    currentValue += amount;
    if (currentValue < 1) currentValue = 1;
    if (currentValue > maxStock) currentValue = maxStock; // Batasi dengan stok
    quantityInput.value = currentValue;
}

function addToCartFromDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value);

    const variationSelect = document.getElementById('variation-select');
    let selectedVariationName = product.variations[0].name; // Default jika tidak ada pilihan
    let finalPrice = product.price;

    if (variationSelect) {
        const selectedOption = variationSelect.options[variationSelect.selectedIndex];
        selectedVariationName = selectedOption.textContent;
        const priceModifier = parseFloat(selectedOption.dataset.priceModifier);
        
        const variationNameLower = selectedVariationName.toLowerCase();
        if (variationNameLower.includes("promo") || variationNameLower.includes("total")) {
            finalPrice = priceModifier; // Modifier adalah harga total, bukan per item
        } else {
            finalPrice = product.price + priceModifier; // Modifier adalah tambahan/pengurangan dari harga dasar produk
        }
    }


    const item = {
        id: product.id,
        name: product.name,
        price: finalPrice, // Harga per unit setelah variasi
        image: product.image,
        quantity: quantity,
        variation: selectedVariationName
    };

    addItemToCart(item); // Fungsi dari cart.js
    
    const messageEl = document.getElementById('add-to-cart-message');
    messageEl.textContent = `${quantity} x ${product.name} (${selectedVariationName}) ditambahkan ke keranjang!`;
    messageEl.classList.remove('hidden');
    setTimeout(() => { messageEl.classList.add('hidden') }, 3000);

    // Update stok (simulasi)
    const stockLevelEl = document.getElementById('stock-level');
    const currentStock = parseInt(stockLevelEl.textContent);
    const newStock = currentStock - quantity;
    stockLevelEl.textContent = newStock;
    product.stock = newStock; // Update data produk di memori (untuk sesi ini)
    quantityInput.max = newStock; // Update max di input
    if (quantityInput.value > newStock) quantityInput.value = newStock > 0 ? newStock : 1;
}

// Panggil fungsi loadProductDetail saat DOM siap
// Ini akan dijalankan jika product.js di-include di product-detail.html
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-detail-content')) { // Pastikan ini halaman detail
        loadProductDetail();
    }
});