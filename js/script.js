// Sample Product Data (replace with your actual data source or products.js)
const allProducts = [
    {
        id: 1,
        name: "Brokoli Segar",
        price: 15000,
        originalPrice: 18000, // Optional, for showing discounts
        image: "https://plus.unsplash.com/premium_photo-1671013001499-3d8af5fd062b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvY2NvbGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        imageThumb: "https://plus.unsplash.com/premium_photo-1671013001499-3d8af5fd062b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvY2NvbGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&q=60",
        imageLarge: "https://plus.unsplash.com/premium_photo-1671013001499-3d8af5fd062b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvY2NvbGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
        description: "Brokoli segar pilihan, kaya akan vitamin dan mineral. Cocok untuk tumisan, sup, atau dikukus. Dipanen dari kebun lokal.",
        unit: "kg",
        stock: 25,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, is_default: true }, // default variation uses base price
        ],
        category: "Sayuran Hijau"
    },
    {
        id: 2,
        name: "Wortel Manis",
        price: 12000,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        imageThumb: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fHww&auto=format&fit=crop&w=200&q=60",
        imageLarge: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80",
        description: "Wortel manis dan renyah, sumber beta-karoten yang baik untuk mata. Ideal untuk jus, salad, atau masakan lainnya.",
        unit: "kg",
        stock: 30,
        variations: [
            { name: "500 gram", price_modifier: 0 },
            { name: "1 kilogram", price_modifier: 0, is_default: true },
        ],
        category: "Umbi-umbian"
    },
    {
        id: 3,
        name: "Tomat Ceri",
        price: 20000,
        image: "https://images.unsplash.com/photo-1591378605424-f275591330fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlcnJ5JTIwdG9tYXRvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        imageThumb: "https://images.unsplash.com/photo-1591378605424-f275591330fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlcnJ5JTIwdG9tYXRvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&q=60",
        imageLarge: "https://images.unsplash.com/photo-1591378605424-f275591330fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlcnJ5JTIwdG9tYXRvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80",
        description: "Tomat ceri merah merona, rasa manis asam segar. Sempurna untuk camilan sehat, salad, atau hiasan masakan.",
        unit: "pack",
        stock: 15,
        variations: [
            { name: "250 gram", price_modifier: 0, is_default: true },
        ],
        category: "Buah Sayur"
    },
    {
        id: 4,
        name: "Bayam Hijau",
        price: 8000,
        image: "https://images.unsplash.com/photo-1586103436805-279521993335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        imageThumb: "https://images.unsplash.com/photo-1586103436805-279521993335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=200&q=60",
        imageLarge: "https://images.unsplash.com/photo-1586103436805-279521993335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
        description: "Bayam hijau segar, kaya zat besi dan vitamin. Mudah diolah menjadi berbagai masakan lezat dan bergizi.",
        unit: "ikat",
        stock: 50,
        variations: [
            { name: "1 Ikat", price_modifier: 0, is_default: true },
            { name: "3 Ikat (Hemat)", price_modifier: 0, base_price: 20000 } // Example of bundle pricing
        ],
        category: "Sayuran Hijau"
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const currentYearSpan = document.getElementById('current-year');
    const currentYearFooterSpan = document.getElementById('current-year-footer');
    const searchInput = document.getElementById('search-input');
    const searchInputMobile = document.getElementById('search-input-mobile');
    const searchMessage = document.getElementById('search-message');
    const noProductsMessage = document.getElementById('no-products-message');


    // Function to display products
    function displayProducts(productsToDisplay) {
        if (!productList) return;
        productList.innerHTML = ''; // Clear existing products

        if (productsToDisplay.length === 0) {
            if (noProductsMessage) noProductsMessage.classList.remove('hidden');
            if (searchMessage && (searchInput.value || searchInputMobile.value)) {
                 searchMessage.textContent = `Tidak ada produk yang cocok dengan pencarian "${searchInput.value || searchInputMobile.value}".`;
                 searchMessage.classList.remove('hidden');
            } else if (searchMessage) {
                searchMessage.classList.add('hidden');
            }
        } else {
            if (noProductsMessage) noProductsMessage.classList.add('hidden');
            if (searchMessage && (searchInput.value || searchInputMobile.value)) {
                searchMessage.textContent = `Menampilkan ${productsToDisplay.length} produk untuk "${searchInput.value || searchInputMobile.value}"`;
                searchMessage.classList.remove('hidden');
            } else if (searchMessage) {
                searchMessage.classList.add('hidden');
            }
        }


        productsToDisplay.forEach(product => {
            const priceToDisplay = product.variations && product.variations.find(v => v.is_default) && product.variations.find(v => v.is_default).base_price ? product.variations.find(v => v.is_default).base_price : product.price;
            const unitToDisplay = product.variations && product.variations.find(v => v.is_default) ? product.variations.find(v => v.is_default).name.toLowerCase().includes(product.unit) ? product.unit : product.variations.find(v => v.is_default).name : product.unit;
            
            const card = `
                <div class="futuristic-card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                    <a href="product-detail.html?id=${product.id}" class="block">
                        <img src="${product.image || 'https://via.placeholder.com/300x200.png?text=No+Image'}" alt="${product.name}" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-5 flex flex-col flex-grow">
                        <h3 class="text-xl font-semibold dark-text mb-2">${product.name}</h3>
                        <p class="text-sm text-slate-gray mb-1">Kategori: ${product.category || 'Umum'}</p>
                        <p class="primary-text text-lg font-bold mb-3">
                            Rp ${priceToDisplay.toLocaleString('id-ID')} / ${unitToDisplay}
                            ${product.originalPrice ? `<span class="text-sm text-slate-gray line-through ml-2">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>` : ''}
                        </p>
                        <p class="text-slate-gray text-sm mb-4 flex-grow">${product.description.substring(0, 70)}...</p>
                        <div class="mt-auto">
                            <button onclick="addToCart(${product.id}, '${product.name}', ${priceToDisplay}, '${product.imageThumb || product.image}', 1, '${product.variations.find(v => v.is_default)?.name || product.unit}')" class="btn-primary w-full py-2 px-4 rounded-md text-sm font-semibold hover:shadow-lg transition-shadow">
                                <i class="fas fa-cart-plus mr-2"></i>Tambah ke Keranjang
                            </button>
                            <a href="product-detail.html?id=${product.id}" class="mt-2 block text-center primary-text hover:underline text-sm">Lihat Detail</a>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += card;
        });
    }

    // Initial display of all products
    if (productList) {
        displayProducts(allProducts);
    }

    // Search functionality
    function handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    if (searchInputMobile) {
        searchInputMobile.addEventListener('input', handleSearch);
         // Sync search inputs if both are visible (though typically one is hidden)
        searchInput.addEventListener('input', (e) => { if(searchInputMobile.value !== e.target.value) searchInputMobile.value = e.target.value; });
        searchInputMobile.addEventListener('input', (e) => { if(searchInput.value !== e.target.value) searchInput.value = e.target.value; });
    }


    // Mobile menu toggle
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

    // Set current year in footer
    const year = new Date().getFullYear();
    if (currentYearSpan) {
        currentYearSpan.textContent = year;
    }
    if (currentYearFooterSpan) {
        currentYearFooterSpan.textContent = year;
    }

    // Update cart count on load (function defined in cart.js, ensure cart.js is loaded before this)
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }
});

// Expose allProducts globally for product-detail.js and cart.js to access
window.allProducts = allProducts;

// Ensure addToCart function is globally available (it will be if cart.js is loaded)
// This is a placeholder if cart.js isn't loaded or addToCart isn't global in cart.js
if (typeof addToCart === 'undefined') {
    window.addToCart = function(productId, productName, productPrice, productImage, quantity, variation) {
        console.warn("addToCart function not fully initialized. Please ensure cart.js is loaded correctly.");
        // Basic placeholder for adding to cart (actual logic in cart.js)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const defaultVariation = variation || (allProducts.find(p=>p.id === productId)?.variations?.find(v=>v.is_default)?.name);

        const existingItemIndex = cart.findIndex(item => item.id === productId && item.variation === defaultVariation);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: quantity, variation: defaultVariation });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        if (typeof updateCartCount === "function") {
            updateCartCount();
        }
        alert(`${productName} (${defaultVariation}) ditambahkan ke keranjang!`);
    };
}