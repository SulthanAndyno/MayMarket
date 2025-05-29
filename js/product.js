document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
    updateCartCount(); // from cart.js

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
});

let currentProduct = null; // To store the loaded product details

function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const productDetailContent = document.getElementById('product-detail-content');
    const productLoading = document.getElementById('product-loading');

    if (!productId || !productDetailContent) {
        productDetailContent.innerHTML = `<p class="text-center text-red-500 col-span-2">ID produk tidak valid atau elemen tidak ditemukan.</p>`;
        if (productLoading) productLoading.classList.add('hidden');
        return;
    }

    // Use allProducts from script.js (ensure script.js is loaded and allProducts is global)
    if (typeof window.allProducts === 'undefined') {
        productDetailContent.innerHTML = `<p class="text-center text-red-500 col-span-2">Data produk tidak tersedia. Pastikan script.js dimuat dengan benar.</p>`;
         if (productLoading) productLoading.classList.add('hidden');
        return;
    }
    
    currentProduct = window.allProducts.find(p => p.id === productId);

    if (currentProduct) {
        if (productLoading) productLoading.classList.add('hidden');
        
        // Determine initial price and unit based on default variation
        let displayPrice = currentProduct.price;
        let displayUnit = currentProduct.unit;
        let defaultVariationName = '';

        if (currentProduct.variations && currentProduct.variations.length > 0) {
            const defaultVariation = currentProduct.variations.find(v => v.is_default) || currentProduct.variations[0];
            defaultVariationName = defaultVariation.name;
            // If variation has its own base_price, use it. Otherwise, use product's main price.
            displayPrice = typeof defaultVariation.base_price !== 'undefined' ? defaultVariation.base_price : currentProduct.price;
            // Unit could be part of variation name or the main product unit
            displayUnit = defaultVariation.name.toLowerCase().includes(currentProduct.unit) ? currentProduct.unit : defaultVariation.name.split(" ")[1] || currentProduct.unit;
        }


        let variationsOptions = '';
        if (currentProduct.variations && currentProduct.variations.length > 0) {
            variationsOptions = currentProduct.variations.map(v => 
                `<option value="${v.name}" ${v.name === defaultVariationName ? 'selected' : ''} data-price="${typeof v.base_price !== 'undefined' ? v.base_price : currentProduct.price}">
                    ${v.name}
                 </option>`
            ).join('');
        }

        productDetailContent.innerHTML = `
            <div class="product-images">
                <a href="${currentProduct.imageLarge || currentProduct.image || 'https://via.placeholder.com/800x600.png?text=No+Large+Image'}" data-lightbox="product-gallery" data-title="${currentProduct.name}">
                    <img src="${currentProduct.image || 'https://via.placeholder.com/600x400.png?text=No+Image'}" alt="${currentProduct.name}" class="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                </a>
                <!-- Thumbnails if available -->
                ${currentProduct.thumbnails && currentProduct.thumbnails.length > 0 ? `
                <div class="grid grid-cols-4 gap-2 mt-4">
                    ${currentProduct.thumbnails.map(thumb => `<a href="${thumb.large}" data-lightbox="product-gallery" data-title="${currentProduct.name}"><img src="${thumb.small}" alt="thumbnail" class="w-full h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-primary transition-all"></a>`).join('')}
                </div>
                ` : ''}
            </div>

            <div class="product-info">
                <h1 class="text-3xl md:text-4xl font-bold dark-text mb-2">${currentProduct.name}</h1>
                <p class="text-2xl primary-text font-semibold mb-4" id="product-price-display">
                    Rp ${displayPrice.toLocaleString('id-ID')} / ${displayUnit}
                </p>
                <div class="mb-4">
                    <span class="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">Stok: <span id="stock-level">${currentProduct.stock}</span> Tersedia</span>
                     ${currentProduct.category ? `<span class="ml-2 text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">Kategori: ${currentProduct.category}</span>` : ''}
                </div>
                <p class="text-slate-gray mb-6 leading-relaxed">
                    ${currentProduct.description}
                </p>
                
                ${variationsOptions ? `
                <div class="mb-6">
                    <label for="variation" class="block text-sm font-medium text-slate-gray mb-1">Pilihan Kemasan:</label>
                    <select id="variation" name="variation" class="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                        ${variationsOptions}
                    </select>
                </div>` : ''}

                <div class="flex items-center mb-6">
                    <label for="quantity" class="block text-sm font-medium text-slate-gray mr-3">Jumlah:</label>
                    <div class="flex items-center border border-gray-300 rounded-md">
                        <button onclick="updateDetailQuantity(-1)" class="px-3 py-2 text-slate-gray hover:bg-gray-100 rounded-l-md">-</button>
                        <input type="number" id="quantity" name="quantity" value="1" min="1" max="${currentProduct.stock}" class="w-16 text-center border-l border-r border-gray-300 quantity-input p-2 focus:outline-none">
                        <button onclick="updateDetailQuantity(1)" class="px-3 py-2 text-slate-gray hover:bg-gray-100 rounded-r-md">+</button>
                    </div>
                </div>
                <button onclick="addToCartFromDetail()" class="btn-primary w-full md:w-auto text-lg font-semibold py-3 px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <i class="fas fa-cart-plus mr-2"></i> Tambah ke Keranjang
                </button>
                 <p id="add-to-cart-message" class="text-green-600 mt-3 hidden"></p>
            </div>
        `;
        // Add event listener for variation change
        const variationSelect = document.getElementById('variation');
        if (variationSelect) {
            variationSelect.addEventListener('change', handleVariationChange);
        }

    } else {
        if (productLoading) productLoading.classList.add('hidden');
        productDetailContent.innerHTML = `<p class="text-center text-red-500 col-span-2 py-10 text-xl">
                                            <i class="fas fa-exclamation-triangle fa-2x mb-3"></i><br>
                                            Produk tidak ditemukan.
                                            <br>
                                            <a href="index.html" class="text-primary hover:underline mt-4 inline-block">Kembali ke Beranda</a>
                                          </p>`;
    }
}

function handleVariationChange(event) {
    if (!currentProduct) return;
    const selectedOption = event.target.selectedOptions[0];
    const price = parseFloat(selectedOption.dataset.price); // Price from data-attribute
    
    // Attempt to derive unit from variation name or use product default
    let unit = currentProduct.unit;
    const variationNameParts = selectedOption.value.split(" ");
    if (variationNameParts.length > 1 && isNaN(parseFloat(variationNameParts[0]))) { // e.g. "1 Ikat" vs "Ikat Saja"
         unit = variationNameParts.length > 1 ? variationNameParts.slice(1).join(" ") : currentProduct.unit; // If "1 Ikat", unit is "Ikat"
    } else if (variationNameParts.length > 1) {
         unit = variationNameParts[1]; // "500 gram" -> unit is "gram"
    }


    document.getElementById('product-price-display').textContent = `Rp ${price.toLocaleString('id-ID')} / ${unit}`;
}


function updateDetailQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    currentValue += change;
    if (currentValue < 1) currentValue = 1;
    if (currentProduct && currentValue > currentProduct.stock) currentValue = currentProduct.stock;
    quantityInput.value = currentValue;
}

function addToCartFromDetail() {
    if (!currentProduct) return;

    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value);
    
    const variationSelect = document.getElementById('variation');
    let selectedVariationName = null;
    let finalPrice = currentProduct.price; // Default to product base price

    if (variationSelect && variationSelect.value) {
        selectedVariationName = variationSelect.value;
        const selectedOption = variationSelect.selectedOptions[0];
        finalPrice = parseFloat(selectedOption.dataset.price); // Use price from selected variation
    } else if (currentProduct.variations && currentProduct.variations.length > 0) {
        // If no select, but variations exist, use default
        const defaultVar = currentProduct.variations.find(v => v.is_default) || currentProduct.variations[0];
        selectedVariationName = defaultVar.name;
        finalPrice = typeof defaultVar.base_price !== 'undefined' ? defaultVar.base_price : currentProduct.price;
    } else {
        // No variations, use product's main unit
        selectedVariationName = currentProduct.unit;
    }


    // addToCart function is from cart.js (should be global)
    if (typeof addToCart === "function") {
        addToCart(currentProduct.id, currentProduct.name, finalPrice, currentProduct.imageThumb || currentProduct.image, quantity, selectedVariationName, currentProduct.unit);
        
        const messageEl = document.getElementById('add-to-cart-message');
        if (messageEl) {
            messageEl.textContent = `${quantity} x ${currentProduct.name} (${selectedVariationName}) ditambahkan!`;
            messageEl.classList.remove('hidden');
            setTimeout(() => { messageEl.classList.add('hidden'); }, 3000);
        }
    } else {
        console.error("addToCart function is not defined. Make sure cart.js is loaded.");
        alert("Error: Fungsi keranjang tidak tersedia.");
    }
}