// Data Produk (Simulasi Database)
const products = [
    { 
        id: 1, 
        name: "Bayam Segar Organik", 
        price: 12000, 
        image: "https://plus.unsplash.com/premium_photo-1667050582196-3ac993f8e39e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        imageLarge: "https://plus.unsplash.com/premium_photo-1667050582196-3ac993f8e39e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Bayam hijau segar langsung dari petani lokal, ditanam secara organik tanpa pestisida. Kaya akan zat besi dan vitamin.",
        stock: 30,
        variations: [
            { name: "250 gram", priceModifier: 0 }, // Harga dasar untuk 250g
            { name: "500 gram", priceModifier: 10000 }, // Tambahan harga jika 500g
            { name: "1 ikat", priceModifier: -2000 } // Pengurangan harga jika 1 ikat
        ]
    },
    { 
        id: 2, 
        name: "Wortel Manis Premium", 
        price: 15000, // Harga per kg
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        imageLarge: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=80",
        description: "Wortel impor berkualitas premium, rasa manis alami dan tekstur renyah. Sempurna untuk jus atau masakan.",
        stock: 50,
        variations: [
            { name: "500 gram", priceModifier: -7000 },
            { name: "1 kilogram", priceModifier: 0 },
        ]
    },
    { 
        id: 3, 
        name: "Kangkung Hidroponik", 
        price: 8000, // harga per ikat
        image: "https://images.unsplash.com/photo-1627989091619-539307a697c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBzcGluYWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        imageLarge: "https://images.unsplash.com/photo-1627989091619-539307a697c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBzcGluYWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=80",
        description: "Kangkung segar hasil budidaya hidroponik, bersih dan bebas hama. Cepat matang saat dimasak.",
        stock: 20,
        variations: [
            { name: "1 Ikat", priceModifier: 0 },
            { name: "3 Ikat (Promo)", priceModifier: 14000 } // Harga total untuk 3 ikat
        ]
    },
    { 
        id: 4, 
        name: "Tomat Cherry Merah", 
        price: 18000, // harga per 250gr
        image: "https://images.unsplash.com/photo-1591376894230-04fce239ef4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlcnJ5JTIwdG9tYXRvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        imageLarge: "https://images.unsplash.com/photo-1591376894230-04fce239ef4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlcnJ5JTIwdG9tYXRvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Tomat cherry dengan rasa manis sedikit asam, cocok untuk salad atau camilan sehat.",
        stock: 15,
        variations: [
            { name: "250 gram", priceModifier: 0 },
            { name: "500 gram", priceModifier: 17000 }
        ]
    },
    { 
        id: 5, 
        name: "Kangkung Merah", 
        price: 8000, // harga per ikat
        image: "https://images.unsplash.com/photo-1627989091619-539307a697c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBzcGluYWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        imageLarge: "https://images.unsplash.com/photo-1627989091619-539307a697c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBzcGluYWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=80",
        description: "Kangkung segar hasil budidaya hidroponik, bersih dan bebas hama. Cepat matang saat dimasak.",
        stock: 20,
        variations: [
            { name: "1 Ikat", priceModifier: 0 },
            { name: "3 Ikat (Promo)", priceModifier: 14000 } // Harga total untuk 3 ikat
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = currentYear;
    const yearSpanFooter = document.getElementById('current-year-footer');
    if (yearSpanFooter) yearSpanFooter.textContent = currentYear;


    // Mobile Menu Toggle
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
    
    // Fungsi untuk menampilkan produk di homepage
    const productListContainer = document.getElementById('product-list');
    if (productListContainer) {
        renderProducts(products, productListContainer);
    }

    // Panggil fungsi dari auth.js dan cart.js jika ada
    if (typeof initializeAuth !== 'undefined') initializeAuth();
    if (typeof initializeCart !== 'undefined') initializeCart();
    if (typeof loadProductDetail !== 'undefined') loadProductDetail(); // Untuk halaman detail
    if (typeof loadCartPage !== 'undefined') loadCartPage(); // Untuk halaman keranjang
});

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
}

function renderProducts(productsToRender, container) {
    container.innerHTML = ''; // Kosongkan kontainer
    productsToRender.forEach(product => {
        const productCard = `
            <div class="futuristic-card bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                <a href="product-detail.html?id=${product.id}" class="block">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover">
                </a>
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="text-xl font-semibold dark-text mb-2 truncate">${product.name}</h3>
                    <p class="primary-text text-lg font-bold mb-3">${formatRupiah(product.price)} <span class="text-sm text-slate-gray font-normal">/ ${product.variations[0].name.split(' ')[1] || 'unit'}</span></p>
                    <p class="text-sm text-slate-gray mb-4 flex-grow">${product.description.substring(0, 70)}...</p>
                    <div class="mt-auto">
                         <button onclick="handleAddToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}', '${product.variations[0].name}')" class="w-full btn-primary font-semibold py-2 px-4 rounded-lg hover:shadow-md transition-all duration-300">
                            <i class="fas fa-cart-plus mr-2"></i> Tambah
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

function handleAddToCart(id, name, price, image, defaultVariationName) {
    // Cek dulu apakah produk sudah ada dengan variasi yang sama
    // Untuk simplifikasi, kita anggap variasi default saat klik dari homepage
    const item = { id, name, price, image, quantity: 1, variation: defaultVariationName };
    addItemToCart(item); // Fungsi ini ada di cart.js
    // Beri feedback visual
    alert(`${name} (${defaultVariationName}) telah ditambahkan ke keranjang!`);
}