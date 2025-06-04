// js/product.js

// This script assumes global.js, auth.js, cart.js, and script.js (for allProducts) are loaded.

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
});

let currentProductData = null; // Store the currently loaded product's data

function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const productDetailContentEl = document.getElementById('product-detail-content');
    const productLoadingEl = document.getElementById('product-loading-placeholder');

    if (!productId || !productDetailContentEl) {
        if (productLoadingEl) productLoadingEl.classList.add('hidden');
        productDetailContentEl.innerHTML = `<p class="text-center text-red-500 col-span-2 py-10 text-xl">ID produk tidak valid atau elemen target tidak ditemukan.</p>`;
        return;
    }

    // Ensure allProducts is loaded. If not, try waiting a bit (simple retry, can be improved)
    if (typeof window.allProducts === 'undefined' || window.allProducts.length === 0) {
        console.warn("allProducts not immediately available. Retrying in 500ms...");
        setTimeout(() => {
            if (typeof window.allProducts === 'undefined' || window.allProducts.length === 0) {
                if (productLoadingEl) productLoadingEl.classList.add('hidden');
                productDetailContentEl.innerHTML = `<p class="text-center text-red-500 col-span-2 py-10 text-xl">Data produk tidak tersedia. Gagal memuat detail.</p>`;
                return;
            }
            findAndRenderProduct(productId, productDetailContentEl, productLoadingEl);
        }, 500);
    } else {
        findAndRenderProduct(productId, productDetailContentEl, productLoadingEl);
    }
}

function findAndRenderProduct(productId, productDetailContentEl, productLoadingEl) {
    // Make a shallow copy to avoid modifying the global allProducts array directly
    // if we change stock values here. Deep copy if variations had their own stock.
    const productFromSource = window.allProducts.find(p => p.id === productId);
    if (productFromSource) {
        currentProductData = { ...productFromSource }; 
        // If variations are complex objects, they'd need deep cloning if their stock changes too
        // For now, assuming stock is at product level or variation price only.
        if (currentProductData.variations) {
            currentProductData.variations = JSON.parse(JSON.stringify(currentProductData.variations));
        }
    }


    if (currentProductData) {
        if (productLoadingEl) productLoadingEl.classList.add('hidden');
        renderProductDetails(currentProductData, productDetailContentEl);
    } else {
        if (productLoadingEl) productLoadingEl.classList.add('hidden');
        productDetailContentEl.innerHTML = `<p class="text-center text-red-500 col-span-2 py-10 text-xl">
                                            <i class="fas fa-exclamation-triangle fa-2x mb-3"></i><br>
                                            Produk tidak ditemukan.
                                            <br>
                                            <a href="products.html" class="primary-text hover:underline mt-4 inline-block">Kembali ke Daftar Produk</a>
                                          </p>`;
    }
}


function renderProductDetails(product, targetElement) {
    let displayPrice = product.price;
    let displayUnit = product.unit;
    let defaultVariationName = product.unit;

    if (product.variations && product.variations.length > 0) {
        const defaultVariation = product.variations.find(v => v.is_default) || product.variations[0];
        defaultVariationName = defaultVariation.name;
        displayPrice = typeof defaultVariation.base_price !== 'undefined' ? defaultVariation.base_price : product.price;
        displayUnit = defaultVariation.name;
    }

    let variationsOptionsHTML = '';
    if (product.variations && product.variations.length > 0) {
        variationsOptionsHTML = product.variations.map(v => 
            `<option value="${v.name}" ${v.name === defaultVariationName ? 'selected' : ''} data-price="${typeof v.base_price !== 'undefined' ? v.base_price : product.price}">
                ${v.name}
             </option>`
        ).join('');
    }

    let mainImageHTML = `
        <a href="${product.imageLarge || product.image || 'images/placeholder-large.png'}" data-lightbox="product-gallery" data-title="${product.name}">
            <img src="${product.image || 'images/placeholder.png'}" alt="${product.name}" class="main-product-image">
        </a>`;
    
    let thumbnailsHTML = '';
    const allImagesForGallery = [{ large: product.imageLarge || product.image, small: product.image, title: product.name }];
    if (product.thumbnails && product.thumbnails.length > 0) {
        product.thumbnails.forEach(thumb => allImagesForGallery.push({large: thumb.large, small: thumb.small, title: product.name}));
        
        // Ensure main image is first in thumbnails if it's not implicitly duplicated
        let uniqueThumbnails = [];
        const mainImgSrc = product.image;
        if (mainImgSrc) {
             uniqueThumbnails.push({large: product.imageLarge || mainImgSrc, small: mainImgSrc, title: product.name, isMain: true});
        }
        product.thumbnails.forEach(thumb => {
            if (thumb.small !== mainImgSrc) { // Avoid duplicating main image if it's also in thumbnails list
                uniqueThumbnails.push(thumb);
            }
        });


        thumbnailsHTML = `<div class="product-thumbnails">
            ${uniqueThumbnails.map((thumb, index) => `
                <a href="${thumb.large}" data-lightbox="product-gallery" data-title="${thumb.title || product.name}" class="thumbnail-link ${thumb.isMain || index === 0 ? 'active' : ''}" onclick="updateMainImage(event, '${thumb.large || thumb.small}')">
                    <img src="${thumb.small}" alt="Thumbnail ${product.name} ${index + 1}">
                </a>`).join('')}
        </div>`;
    } else if(product.image) {
         thumbnailsHTML = `<div class="product-thumbnails">
            <a href="${product.imageLarge || product.image}" data-lightbox="product-gallery" data-title="${product.name}" class="thumbnail-link active" onclick="updateMainImage(event, '${product.imageLarge || product.image}')">
                <img src="${product.image}" alt="Thumbnail ${product.name}">
            </a>
        </div>`;
    }


    targetElement.innerHTML = `
        <div class="product-images">
            ${mainImageHTML}
            ${thumbnailsHTML}
        </div>

        <div class="product-info">
            <h1>${product.name}</h1>
            <p class="price-display" id="product-price-display">
                Rp ${parseFloat(displayPrice).toLocaleString('id-ID')} / ${displayUnit}
            </p>
            <div class="stock-category-info mb-4">
                <span class="stock-badge ${product.stock <= 0 ? 'out-of-stock' : ''}" id="stock-badge">
                    Stok: <span id="stock-level">${product.stock > 0 ? product.stock : 'Habis'}</span> 
                    ${product.stock > 0 ? '' : ''}
                </span>
                ${product.category ? `<span class="category-badge">Kategori: ${product.category}</span>` : ''}
            </div>
            <p class="description-text mb-6">
                ${product.description}
            </p>
            
            ${variationsOptionsHTML ? `
            <div class="form-group mb-4"> <!-- Reduced mb -->
                <label for="variation-select" class="block text-sm font-medium text-slate-gray mb-1">Pilihan Kemasan/Ukuran:</label>
                <select id="variation-select" name="variation" class="variation-select w-full md:w-2/3">
                    ${variationsOptionsHTML}
                </select>
            </div>` : ''}

            <div class="form-group mb-4"> <!-- Reduced mb -->
                <label for="quantity-input" class="block text-sm font-medium text-slate-gray mb-1">Jumlah:</label>
                <div class="quantity-controls">
                    <button onclick="updateDetailQuantity(-1)" class="minus-btn" id="minus-qty-btn">-</button>
                    <input type="number" id="quantity-input" name="quantity" value="${product.stock > 0 ? 1 : 0}" min="${product.stock > 0 ? 1 : 0}" max="${product.stock}" class="text-center" ${product.stock <=0 ? 'disabled' : ''}>
                    <button onclick="updateDetailQuantity(1)" class="plus-btn" id="plus-qty-btn">+</button>
                </div>
            </div>

            <div class="add-to-cart-section">
                <button id="add-to-cart-btn-detail" onclick="handleAddToCartFromDetail()" class="btn btn-primary add-to-cart-button" ${product.stock <= 0 ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus mr-2"></i> 
                    ${product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                </button>
                <p id="add-to-cart-message" class="add-to-cart-message hidden"></p>
            </div>
        </div>
    `;
    
    const variationSelectEl = document.getElementById('variation-select');
    if (variationSelectEl) {
        variationSelectEl.addEventListener('change', handleVariationChange);
    }
    if (product.stock <= 0) {
        disablePurchaseControls();
    }

    // Activate lightbox if new images were added
    if (typeof lightbox !== 'undefined') {
        lightbox.init(); // Re-initialize for newly added gallery items
    }
}

function updateMainImage(event, newImageSrc) {
    event.preventDefault();
    const mainImageEl = document.querySelector('.main-product-image');
    const mainImageLinkEl = mainImageEl.parentElement; // The <a> tag for lightbox
    if (mainImageEl && newImageSrc) {
        mainImageEl.src = newImageSrc; // Or a smaller version if newImageSrc is for large view
        mainImageLinkEl.href = newImageSrc; // Update lightbox link too
    }
    // Update active thumbnail
    document.querySelectorAll('.product-thumbnails .thumbnail-link').forEach(link => link.classList.remove('active'));
    event.currentTarget.classList.add('active');
}
window.updateMainImage = updateMainImage;


function handleVariationChange(event) {
    if (!currentProductData) return;
    const selectedOption = event.target.selectedOptions[0];
    const price = parseFloat(selectedOption.dataset.price);
    const variationName = selectedOption.value;

    document.getElementById('product-price-display').textContent = `Rp ${price.toLocaleString('id-ID')} / ${variationName}`;
    // Note: Stock is assumed to be product-level, not per-variation in this model.
    // If variations had their own stock, you'd update stock display and controls here too.
}
// window.handleVariationChange = handleVariationChange; // Not directly called by HTML anymore

function updateDetailQuantity(change) {
    const quantityInput = document.getElementById('quantity-input');
    if (!quantityInput || !currentProductData || currentProductData.stock <= 0) return;

    let currentValue = parseInt(quantityInput.value) || 0;
    currentValue += change;

    if (currentValue < 1 && currentProductData.stock > 0) currentValue = 1;
    else if (currentValue < 0) currentValue = 0;

    if (currentValue > currentProductData.stock) currentValue = currentProductData.stock;
    
    quantityInput.value = currentValue;
}
window.updateDetailQuantity = updateDetailQuantity;

function handleAddToCartFromDetail() {
    if (!currentProductData || currentProductData.stock <= 0) return;

    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value);

    if (quantity <= 0) {
        alert("Jumlah harus minimal 1.");
        return;
    }
    if (quantity > currentProductData.stock) {
        alert(`Stok tidak mencukupi. Maksimal pembelian ${currentProductData.stock}.`);
        quantityInput.value = currentProductData.stock; // Correct input
        return;
    }
    
    const variationSelect = document.getElementById('variation-select');
    let selectedVariationName = currentProductData.unit;
    let finalPrice = currentProductData.price;

    if (variationSelect && variationSelect.value) {
        const selectedOption = variationSelect.selectedOptions[0];
        selectedVariationName = selectedOption.value;
        finalPrice = parseFloat(selectedOption.dataset.price);
    } else if (currentProductData.variations && currentProductData.variations.length > 0) {
        const defaultVar = currentProductData.variations.find(v => v.is_default) || currentProductData.variations[0];
        selectedVariationName = defaultVar.name;
        finalPrice = typeof defaultVar.base_price !== 'undefined' ? defaultVar.base_price : currentProductData.price;
    }

    if (typeof addToCart === "function") {
        addToCart(currentProductData.id, currentProductData.name, finalPrice, currentProductData.imageThumb || currentProductData.image, quantity, selectedVariationName);
        
        // Simulate stock reduction
        currentProductData.stock -= quantity;
        updateStockDisplay();

        const messageEl = document.getElementById('add-to-cart-message');
        if (messageEl) {
            messageEl.textContent = `${quantity} x ${currentProductData.name} (${selectedVariationName}) berhasil ditambahkan!`;
            messageEl.classList.remove('hidden');
            setTimeout(() => { messageEl.classList.add('hidden'); }, 3000);
        }
    } else {
        console.error("addToCart function is not defined. Ensure cart.js is loaded.");
        alert("Error: Fungsi keranjang tidak tersedia.");
    }
}
window.handleAddToCartFromDetail = handleAddToCartFromDetail;

function updateStockDisplay() {
    if (!currentProductData) return;
    const stockLevelEl = document.getElementById('stock-level');
    const quantityInputEl = document.getElementById('quantity-input');
    const stockBadgeEl = document.getElementById('stock-badge');

    if (stockLevelEl) {
        stockLevelEl.textContent = currentProductData.stock > 0 ? currentProductData.stock : 'Habis';
    }
    if (stockBadgeEl) {
        if (currentProductData.stock <= 0) {
            stockBadgeEl.classList.add('out-of-stock');
            if (!stockBadgeEl.textContent.includes('Habis')) { // Avoid "Habis "
                 const stockTextNode = Array.from(stockBadgeEl.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes(''));
                 if(stockTextNode) stockTextNode.textContent = '';
            }
        } else {
            stockBadgeEl.classList.remove('out-of-stock');
             const stockTextNode = Array.from(stockBadgeEl.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '');
             if(stockTextNode) stockTextNode.textContent = ''; else if(!stockBadgeEl.textContent.includes('')) stockBadgeEl.insertAdjacentText('beforeend', '');

        }
    }
    if (quantityInputEl) {
        quantityInputEl.max = currentProductData.stock;
        if (currentProductData.stock <= 0) {
            quantityInputEl.value = 0; // Set to 0 if out of stock
            disablePurchaseControls();
        } else if (parseInt(quantityInputEl.value) > currentProductData.stock) {
            quantityInputEl.value = currentProductData.stock; // Adjust if current qty exceeds new stock
        } else if (parseInt(quantityInputEl.value) === 0 && currentProductData.stock > 0) {
            quantityInputEl.value = 1; // Reset to 1 if stock becomes available
        }
    }

    // If stock becomes 0, disable controls
    if (currentProductData.stock <= 0) {
        disablePurchaseControls();
    } else { // If stock is available (e.g. after a cart removal not implemented here)
        enablePurchaseControls();
    }
}

function disablePurchaseControls() {
    const addToCartBtn = document.getElementById('add-to-cart-btn-detail');
    const quantityInput = document.getElementById('quantity-input');
    const plusBtn = document.getElementById('plus-qty-btn');
    const minusBtn = document.getElementById('minus-qty-btn');

    if (addToCartBtn) {
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = `<i class="fas fa-times-circle mr-2"></i> Stok Habis`;
    }
    if (quantityInput) quantityInput.disabled = true;
    if (plusBtn) plusBtn.disabled = true;
    if (minusBtn) minusBtn.disabled = true;
}

function enablePurchaseControls() { // Could be called if stock is replenished
    const addToCartBtn = document.getElementById('add-to-cart-btn-detail');
    const quantityInput = document.getElementById('quantity-input');
    const plusBtn = document.getElementById('plus-qty-btn');
    const minusBtn = document.getElementById('minus-qty-btn');

    if (addToCartBtn) {
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML = `<i class="fas fa-cart-plus mr-2"></i> Tambah ke Keranjang`;
    }
    if (quantityInput) quantityInput.disabled = false;
    if (plusBtn) plusBtn.disabled = false;
    if (minusBtn) minusBtn.disabled = false;
}