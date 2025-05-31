// Sample Product Data (replace with your actual data source or products.js)
const allProducts = [
    {
        id: 1,
        name: "Kubis",
        price: 15000,
        originalPrice: 18000, // Optional, for showing discounts
        image: "images/kubis.jpg",
        imageThumb: "images/kubis.jpg",
        imageLarge: "images/kubis.jpg",
        description: "Kubis adalah sayuran yang daunnya padat dan sering dikonsumsi, dikenal juga dengan nama kol. Kubis mengandung vitamin C, vitamin K, serat, dan berbagai nutrisi lainnya. Kubis memiliki banyak manfaat kesehatan, seperti membantu menjaga kesehatan pencernaan, mengurangi peradangan, dan melawan radikal bebas. Penderita asam lambung sebaiknya membatasi asupan kubis karena mengandung fruktosa yang dapat meningkatkan gas dalam tubuh",
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
        name: "Pare",
        price: 15000,
        image: "images/pare.jpg",
        imageThumb: "images/pare.jpg",
        imageLarge: "images/pare.jpg",
        description: "Pare adalah sebuah sayuran yang dikenal karena rasanya yang pahit. Namun, di balik rasanya yang pahit, pare memiliki berbagai manfaat kesehatan dan sering digunakan dalam masakan Asia, terutama di Indonesia. Pare juga dapat digunakan dalam pengobatan tradisional. Pare mengandung berbagai nutrisi penting seperti vitamin C, vitamin A, vitamin K, zat besi, magnesium, dan serat. Pare memiliki banyak manfaat kesehatan, termasuk membantu menurunkan kadar gula darah, meningkatkan kekebalan tubuh, menjaga kesehatan mata, dan membantu proses pencernaan.",
        unit: "Kg",
        stock: 30,
        variations: [
            { name: "500 gram", price_modifier: 0 },
            { name: "1 Kg", price_modifier: 0, is_default: true },
        ],
        category: "Buah"
    },
    {
        id: 3,
        name: "Kangkung",
        price: 3000,
        image: "images/kangkung.jpg",
        imageThumb: "images/kangkung.jpg",
        imageLarge: "images/kangkung.jpg",
        description: "Tomat ceri merah merona, rasa manis asam segar. Sempurna untuk camilan sehat, salad, atau hiasan masakan.",
        unit: "ikat",
        stock: 15,
        variations: [
            { name: "1 Ikat", price_modifier: 0, is_default: true },
            { name: "3 Ikat (Hemat)", price_modifier: 0, base_price: 8000 } // Example of bundle pricing
        ],
        category: "Sayuran Hijau"
    },
    {
        id: 4,
        name: "Bayam Hijau",
        price: 8000,
        image: "images/bayam.jpg",
        imageThumb: "images/bayam.jpg",
        imageLarge: "images/bayam.jpg",
        description: "Bayam merupakan salah satu tumbuhan yang sering ditanam untuk dijadikan sayuran hijau. Daun bayam ini dikonsumsi karena kandungan nutrisi yang bergizi. Bayam juga kaya akan beragam vitamin, mulai dari vitamin A, vitamin B, vitamin C, vitamin E, hingga vitamin K, serta mengandung beragam jenis antioksidan, seperti lutein, karotenoid, dan zeaxanthin. Sayuran ini telah terbukti bermanfaat bagi kesehatan dalam beberapa cara. Bayam dapat mengurangi stres oksidatif, meningkatkan kesehatan mata, dan membantu mencegah penyakit jantung dan kanker .",
        unit: "ikat",
        stock: 50,
        variations: [
            { name: "1 Ikat", price_modifier: 0, is_default: true },
            { name: "3 Ikat (Hemat)", price_modifier: 0, base_price: 20000 } // Example of bundle pricing
        ],
        category: "Sayuran Hijau"
    },
    {
        id: 5,
        name: "Wortel",
        price: 13000,
        originalPrice: 15000, // Optional, for showing discounts
        image: "images/wortel.jpg",
        imageThumb: "images/wortel.jpg",
        imageLarge: "images/wortel.jpg",
        description: "Wortel adalah tumbuhan sayuran umbi yang biasa berwarna kuning kemerahan atau jingga kekuningan. Tanaman ini memiliki akar tunggang yang membesar dan berfungsi sebagai tempat penyimpanan cadangan makanan. Wortel termasuk tanaman biennial, artinya ia memiliki siklus hidup dua tahun. Wortel mengandung berbagai nutrisi penting, seperti vitamin A, vitamin K, dan vitamin B6. Wortel juga kaya akan antioksidan dan bermanfaat untuk kesehatan mata, jantung, dan pencernaan.",
        unit: "kg",
        stock: 60,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, base_price:25000 }, // default variation uses base price
        ],
        category: "Sayuran umbi akar"
    },
    {
        id: 6,
        name: "Kol Merah",
        price: 25000,
        originalPrice: 30000, // Optional, for showing discounts
        image: "images/kol_merah.jpg",
        imageThumb: "images/kol_merah.jpg",
        imageLarge: "images/kol_merah.jpg",
        description: "Kol merah, yang juga dikenal sebagai kubis ungu atau kraut merah, adalah jenis sayuran kol yang memiliki warna merah keunguan pada daunnya. Sayuran ini kaya akan nutrisi seperti serat, kalium, antioksidan, dan vitamin. Kol merah dapat dikonsumsi mentah dalam salad, dimasak dalam berbagai masakan, atau diolah menjadi kraut.",
        unit: "kg",
        stock: 80,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, base_price:45000 }, // default variation uses base price
        ],
        category: "Tanaman kubis"
    },
    {
        id: 7,
        name: "Ubi",
        price: 7500,
        originalPrice: 10000, // Optional, for showing discounts
        image: "images/ubi.jpg",
        imageThumb: "images/ubi.jpg",
        imageLarge: "images/ubi.jpg",
        description: "Ubi adalah istilah umum untuk berbagai jenis tanaman umbi-umbian yang dapat dimakan. Meskipun sering dikaitkan dengan ubi kayu atau ketela pohon, ubi juga mencakup ubi jalar, ubi kelapa, talas, dan banyak jenis lainnya. Ubi sering dijadikan sebagai sumber karbohidrat pengganti nasi atau sebagai bahan makanan dalam berbagai olahan, baik tradisional maupun modern. ubi merupakan tanaman Pangan sebagai cadangan bahan makanan pokok selain beras. Tanaman ubi kayu dimana hasil olahannya sangat luas bisa dilihat di pasar tradisional begitu juga sudah merambah ke Supermaket.",
        unit: "kg",
        stock: 60,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, base_price:14000 }, // default variation uses base price
        ],
        category: "Umbi-umbian"
    },
    {
        id: 8,
        name: "Selada",
        price: 14000,
        originalPrice: 15000, // Optional, for showing discounts
        image: "images/selada.jpg",
        imageThumb: "images/selada.jpg",
        imageLarge: "images/selada.jpg",
        description: "Selada adalah tanaman sayuran hijau yang sering dimakan mentah sebagai lalapan atau dalam hidangan salad. Selada memiliki berbagai jenis.selada juga kaya nutrisi dan antioksidan yang bermanfaat bagi kesehatan. Selada merupakan sayuran hijau yang kaya kandungan antioksidan sehingga berperan penting dalam memperkuat fungsi sel tubuh. Kandungan antioksidan dalam daun selada di antaranya adalah antosianin, beta karoten, dan vitamin C. Ketiganya dapat menangkal radikal bebas yang bisa menyebabkan kerusakan pada sel-sel tubuh.",
        unit: "kg",
        stock: 60,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, base_price:26000 }, // default variation uses base price
        ],
        category: "Umbi-umbian"
    },
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