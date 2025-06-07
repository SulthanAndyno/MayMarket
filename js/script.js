// js/script.js
// File ini bertanggung jawab untuk:
// 1. Mendefinisikan data produk awal (allProducts).
// 2. Menampilkan daftar produk di halaman 'products.html' dan produk unggulan di 'index.html'.
// 3. Menangani fungsionalitas pencarian dan pemfilteran produk.
// 4. Menyediakan fungsi pembungkus untuk menambahkan produk ke keranjang dari daftar produk.

// Array `allProducts` berisi daftar semua produk yang tersedia di toko.
// Setiap objek produk memiliki properti berikut:
// - id: Number (Unik) - Identifier unik untuk produk.
// - name: String - Nama produk yang akan ditampilkan.
// - price: Number - Harga dasar produk jika tidak ada variasi default atau jika variasi tidak memiliki harga.
// - originalPrice: Number (Opsional) - Harga asli sebelum diskon (jika ada).
// - image: String - Path ke gambar utama produk (ukuran standar/thumbnail untuk daftar).
// - imageThumb: String (Opsional) - Path ke gambar thumbnail spesifik (jika berbeda dari 'image').
// - imageLarge: String (Opsional) - Path ke gambar versi besar untuk lightbox/detail.
// - description: String - Deskripsi lengkap produk.
// - unit: String - Satuan dasar produk (misalnya, "buah", "kg", "ikat").
// - stock: Number - Jumlah stok produk yang tersedia.
// - variations: Array (Opsional) - Array objek variasi produk. Setiap variasi memiliki:
//      - name: String - Nama variasi (misalnya, "500 gram", "Merah"). Ini juga akan menjadi unit display.
//      - base_price: Number - Harga untuk variasi ini.
//      - is_default: Boolean (Opsional) - Jika true, variasi ini akan dipilih/ditampilkan secara default.
// - category: String (Opsional) - Kategori produk untuk pemfilteran atau tampilan.
// =================================================================================
const allProducts = [
{
        id: 1,
        name: "Kubis",
        price: 8000,
        image: "images/kubis.jpg",
        imageThumb: "images/kubis.jpg",
        imageLarge: "images/kubis.jpg",
        description: "Kubis adalah sayuran yang daunnya padat dan sering dikonsumsi, dikenal juga dengan nama kol. Kubis mengandung vitamin C, vitamin K, serat, dan berbagai nutrisi lainnya. Kubis memiliki banyak manfaat kesehatan, seperti membantu menjaga kesehatan pencernaan, mengurangi peradangan, dan melawan radikal bebas. Penderita asam lambung sebaiknya membatasi asupan kubis karena mengandung fruktosa yang dapat meningkatkan gas dalam tubuh",
        unit: "kg",
        stock: 25,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, base_price: 15000 }, // default variation uses base price
        ],
        category: "Sayuran Hijau"
    },
    {
        id: 2,
        name: "Pare",
        price: 13000,
        image: "images/pare.jpg",
        imageThumb: "images/pare.jpg",
        imageLarge: "images/pare.jpg",
        description: "Pare adalah sebuah sayuran yang dikenal karena rasanya yang pahit. Namun, di balik rasanya yang pahit, pare memiliki berbagai manfaat kesehatan dan sering digunakan dalam masakan Asia, terutama di Indonesia. Pare juga dapat digunakan dalam pengobatan tradisional. Pare mengandung berbagai nutrisi penting seperti vitamin C, vitamin A, vitamin K, zat besi, magnesium, dan serat. Pare memiliki banyak manfaat kesehatan, termasuk membantu menurunkan kadar gula darah, meningkatkan kekebalan tubuh, menjaga kesehatan mata, dan membantu proses pencernaan.",
        unit: "Kg",
        stock: 30,
        variations: [
            { name: "500 gram", price_modifier: 0 },
            { name: "1 Kg", price_modifier: 0, base_price: 25000 },
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
    {
        id: 9,
        name: "Jagung",
        price: 10000,
        image: "images/jagung.jpg",
        imageThumb: "images/jagung.jpg",
        imageLarge: "images/jagung.jpg",
        description: "Jagung adalah tanaman pangan semusim yang menghasilkan biji berwarna kuning dalam tongkol. Tumbuh tegak dengan daun panjang, jagung kaya karbohidrat, serat, vitamin B, dan mineral. Bermanfaat sebagai sumber energi, baik untuk dikonsumsi langsung maupun sebagai bahan dasar dalam berbagai produk pangan.",
        unit: "kg",
        stock: 60,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, base_price:18000 }, // default variation uses base price
        ],
        category: "Tanaman pangan"
    },
    {
        id: 10,
        name: "Cabai Keriting",
        price: 28000,
        originalPrice: 30000, // Optional, for showing discounts
        image: "images/cabai_keriting.jpg",
        imageThumb: "images/cabai_keriting.jpg",
        imageLarge: "images/cabai_keriting.jpg",
        description: "Cabai keriting adalah jenis cabai yang berbentuk panjang, ramping, dan permukaannya berkerut atau berombak. Tanaman ini termasuk dalam kategori tanaman hortikultura, khususnya sayuran buah. Cabai keriting tumbuh pada tanaman semusim dengan batang bercabang dan daun lebar. Buahnya memiliki rasa pedas yang khas dan sering digunakan sebagai bumbu dapur. Cabai ini mengandung vitamin C, vitamin A, serta capsaicin yang bermanfaat untuk metabolisme dan daya tahan tubuh.",
        unit: "kg",
        stock: 80,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, base_price:60000 }, // default variation uses base price
        ],
        category: "Buah"
    },
    {
        id: 11,
        name: "Terong",
        price: 8000,
        image: "images/terong.jpg",
        imageThumb: "images/terong.jpg",
        imageLarge: "images/terong.jpg",
        description: "Terong adalah tanaman sayuran buah yang biasanya berbentuk lonjong dengan kulit berwarna ungu, hijau, atau putih. Tanaman ini termasuk dalam kategori hortikultura dan sayuran buah, serta tergolong tanaman semusim. Terong tumbuh pada batang berkayu lunak dengan daun lebar dan bunga berwarna ungu muda. Buahnya kaya akan serat, vitamin B, dan antioksidan, serta bermanfaat untuk pencernaan dan kesehatan jantung..",
        unit: "kg",
        stock: 60,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, base_price:14000 }, // default variation uses base price
        ],
        category: "Buah"
    },
    {
        id: 12,
        name: "Tomat",
        price: 10000,
        image: "images/tomat.jpg",
        imageThumb: "images/tomat.jpg",
        imageLarge: "images/tomat.jpg",
        description: "Tomat adalah tanaman sayuran buah yang berbentuk bulat atau sedikit lonjong, dengan warna merah, oranye, atau kuning saat matang. Tanaman ini termasuk kategori hortikultura dan sayuran buah, serta merupakan tanaman semusim. Tomat tumbuh pada batang yang lunak dan bercabang, dengan daun menyirip dan bunga kecil berwarna kuning. Buah tomat kaya akan vitamin C, vitamin A, likopen, dan antioksidan yang baik untuk kesehatan kulit, mata, dan sistem imun.",
        unit: "kg",
        stock: 60,
        variations: [
            { name: "500 gram", price_modifier: 0 }, // base price is for 500g if selected
            { name: "1 kilogram", price_modifier: 0, base_price:18000 }, // default variation uses base price
        ],
        category: "Buah"
    },
];
// Mengekspos `allProducts` ke scope global agar bisa diakses oleh skrip lain (misalnya product.js)
window.allProducts = allProducts;

// =================================================================================
// EVENT LISTENER UTAMA & INISIALISASI HALAMAN
// =================================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Selektor untuk elemen daftar produk utama di 'products.html'
    const productListEl = document.getElementById('product-list'); 
    
    // Logika ini hanya berjalan jika elemen 'product-list' ditemukan (artinya kita di halaman products.html)
    if (productListEl) { 
        const urlParams = new URLSearchParams(window.location.search);
        const searchQueryFromUrl = urlParams.get('search'); // Ambil query pencarian dari URL

        // Jika ada query pencarian di URL, isi input pencarian dan filter produk
        if (searchQueryFromUrl) {
            const searchInputDesktop = document.getElementById('search-input-desktop');
            const searchInputMobile = document.getElementById('search-input-mobile');
            if (searchInputDesktop) searchInputDesktop.value = searchQueryFromUrl;
            if (searchInputMobile) searchInputMobile.value = searchQueryFromUrl;
            filterProductsBySearch(searchQueryFromUrl);
        } else {
            // Jika tidak ada query pencarian, tampilkan semua produk
            displayProducts(allProducts, 'product-list', true); // true untuk 'showDescription'
        }
    }
    // Catatan: Pemanggilan `displayFeaturedProducts` untuk halaman 'index.html' 
    // biasanya dilakukan dari skrip inline di 'index.html' setelah elemen targetnya siap,
    // atau bisa juga dipanggil di sini jika ada elemen target yang pasti di 'index.html'.
});

// =================================================================================
// FUNGSI UNTUK MENAMPILKAN PRODUK KE DOM
// =================================================================================
/**
 * Menampilkan daftar produk ke elemen HTML yang ditentukan.
 * @param {Array} productsToDisplay - Array objek produk yang akan ditampilkan.
 * @param {string} targetElementId - ID elemen HTML tempat produk akan ditampilkan (default: 'product-list').
 * @param {boolean} showDescription - Apakah akan menampilkan deskripsi singkat produk di kartu (default: true).
 */
function displayProducts(productsToDisplay, targetElementId = 'product-list', showDescription = true) {
    const productListEl = document.getElementById(targetElementId);
    
    // Jika elemen target tidak ditemukan, hentikan fungsi
    if (!productListEl) {
        console.warn(`Target element with ID "${targetElementId}" not found for displaying products.`);
        return;
    }
    
    productListEl.innerHTML = ''; // Kosongkan konten sebelumnya

    const isMainProductListing = targetElementId === 'product-list';

    // Logika untuk menampilkan pesan jika tidak ada produk (khusus untuk halaman daftar produk utama)
    if (isMainProductListing) {
        const searchMessageEl = document.getElementById('search-message');
        const noProductsMessageEl = document.getElementById('no-products-message');
        const searchInputDesktop = document.getElementById('search-input-desktop');
        const searchInputMobile = document.getElementById('search-input-mobile');
        const currentSearchTerm = (searchInputDesktop?.value || searchInputMobile?.value || "").trim();

        if (productsToDisplay.length === 0) {
            if (noProductsMessageEl) noProductsMessageEl.classList.remove('hidden');
            if (searchMessageEl && currentSearchTerm) {
                 searchMessageEl.textContent = `Tidak ada produk yang cocok dengan "${currentSearchTerm}".`;
                 searchMessageEl.classList.remove('hidden');
            } else if (searchMessageEl) {
                searchMessageEl.classList.add('hidden'); // Sembunyikan jika tidak ada term pencarian
            }
        } else {
            if (noProductsMessageEl) noProductsMessageEl.classList.add('hidden');
            if (searchMessageEl && currentSearchTerm) {
                searchMessageEl.textContent = `Menampilkan ${productsToDisplay.length} produk untuk "${currentSearchTerm}"`;
                searchMessageEl.classList.remove('hidden');
            } else if (searchMessageEl) {
                searchMessageEl.classList.add('hidden');
            }
        }
    } else if (productsToDisplay.length === 0) {
        // Pesan placeholder untuk kasus lain (misalnya, produk unggulan tidak ada)
        const placeholder = productListEl.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.textContent = 'Produk tidak tersedia saat ini.';
        } else {
             productListEl.innerHTML = '<p class="placeholder-text text-center text-subtle col-span-full">Produk tidak tersedia saat ini.</p>';
        }
        return; // Hentikan jika tidak ada produk untuk ditampilkan di target non-utama
    }

    // Iterasi melalui setiap produk dan buat elemen kartunya
    productsToDisplay.forEach((product, index) => {
        // Tentukan variasi default atau variasi pertama jika tidak ada yang default
        const defaultVariation = product.variations?.find(v => v.is_default) ?? 
                                 (product.variations?.[0] ?? 
                                 { name: product.unit, base_price: product.price }); // Fallback ke data produk utama

        const priceToDisplay = defaultVariation.base_price ?? product.price;
        const unitToDisplay = defaultVariation.name; // Unit diambil dari nama variasi
        
        // Potong deskripsi jika ditampilkan dan terlalu panjang
        const cardDescriptionHTML = showDescription ? 
            `<p class="card-description">${product.description.substring(0, 60)}...</p>` : '';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'product-card'; // Kelas CSS untuk styling kartu produk
        
        // Terapkan animasi masuk untuk kartu produk unggulan di index.html
        if (targetElementId === 'featured-product-list' || targetElementId === 'recommended-product-list') {
            cardDiv.style.opacity = 0; // Mulai transparan untuk animasi
            cardDiv.style.animation = `cardFadeInUpFeatured 0.5s ease-out ${index * 0.1}s forwards`;
        }

        // Bangun HTML internal untuk kartu produk
        cardDiv.innerHTML = `
            <a href="product-detail.html?id=${product.id}" class="block product-card-image-link" data-no-transition>
                <div class="product-card-image-wrapper">
                    <img src="${product.image || 'images/placeholder.png'}" alt="${product.name}" class="product-card-image">
                    <div class="product-card-image-overlay">
                        <i class="fas fa-eye"></i>
                    </div>
                </div>
            </a>
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-category">${product.category || 'Umum'}</p>
                <div class="price-stock-row">
                    <p class="card-price">
                        Rp ${parseFloat(priceToDisplay).toLocaleString('id-ID')} / ${unitToDisplay}
                        ${product.originalPrice ? `<span class="original-price">Rp ${parseFloat(product.originalPrice).toLocaleString('id-ID')}</span>` : ''}
                    </p>
                    <!-- Contoh jika ingin menampilkan stok: <span class="card-stock">Stok: ${product.stock}</span> -->
                </div>
                ${cardDescriptionHTML}
                <div class="card-actions">
                    <button onclick="addToCartWrapper(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${priceToDisplay}, '${(product.imageThumb || product.image || '').replace(/'/g, "\\'")}', 1, '${defaultVariation.name.replace(/'/g, "\\'")}')" class="btn btn-primary">
                        <i class="fas fa-cart-plus mr-1"></i><span class="btn-text">Tambah</span>
                    </button>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-secondary detail-link-btn" data-no-transition>
                        <i class="fas fa-search-plus mr-1"></i><span class="btn-text">Detail</span>
                    </a>
                </div>
            </div>
        `;
        productListEl.appendChild(cardDiv); // Tambahkan kartu ke elemen daftar
    });
}
// Mengekspos fungsi ke scope global agar bisa dipanggil dari HTML inline atau skrip lain
window.displayProducts = displayProducts;

// =================================================================================
// FUNGSI UNTUK MENAMPILKAN PRODUK UNGGULAN (FEATURED PRODUCTS)
// =================================================================================
/**
 * Menampilkan sejumlah produk unggulan ke elemen 'featured-product-list'.
 * @param {number} count - Jumlah produk unggulan yang akan ditampilkan (default: 4).
 */
function displayFeaturedProducts(count = 4) {
    const featuredProductListEl = document.getElementById('featured-product-list');
    if (!featuredProductListEl) {
        console.warn("Element with ID 'featured-product-list' not found for featured products.");
        return;
    }

    if (typeof window.allProducts !== 'undefined' && window.allProducts.length > 0) {
        // Ambil produk dari awal array sebagai produk unggulan
        const featured = window.allProducts.slice(0, count);
        displayProducts(featured, 'featured-product-list', false); // false untuk tidak menampilkan deskripsi
    } else {
        const placeholder = featuredProductListEl.querySelector('.placeholder-text');
        if (placeholder) {
            placeholder.textContent = 'Produk unggulan akan segera hadir!';
        } else {
            featuredProductListEl.innerHTML = '<p class="placeholder-text text-center text-subtle col-span-full">Produk unggulan akan segera hadir!</p>';
        }
    }
}
window.displayFeaturedProducts = displayFeaturedProducts;

// =================================================================================
// FUNGSI UNTUK MEMFILTER PRODUK BERDASARKAN PENCARIAN
// =================================================================================
/**
 * Memfilter daftar produk berdasarkan kata kunci pencarian dan menampilkannya.
 * @param {string} searchTerm - Kata kunci yang digunakan untuk memfilter produk.
 */
function filterProductsBySearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(term) ||
        (product.category && product.category.toLowerCase().includes(term)) ||
        product.description.toLowerCase().includes(term)
    );
    // Tampilkan produk yang sudah difilter ke elemen 'product-list' dengan deskripsi
    displayProducts(filtered, 'product-list', true);
}
// Tidak perlu diekspos ke global lagi karena dipanggil dari dalam event listener DOMContentLoaded atau oleh fungsi search di global.js
// window.filterProductsBySearch = filterProductsBySearch; 
// Jika fungsi search di global.js memanggil ini, maka biarkan terekspos.
// Untuk saat ini, saya asumsikan dipanggil dari dalam sini atau global.js sudah punya referensi.
// Demi keamanan jika ada pemanggilan dari global.js, kita tetap ekspos:
window.filterProductsBySearch = filterProductsBySearch;


// =================================================================================
// FUNGSI PEMBUNGKUS UNTUK MENAMBAHKAN PRODUK KE KERANJANG
// =================================================================================
/**
 * Fungsi pembungkus (wrapper) untuk memanggil fungsi addToCart dari cart.js.
 * Ini digunakan pada tombol "Tambah ke Keranjang" di kartu produk.
 * Menggunakan replace(/'/g, "\\'") untuk menangani nama produk/variasi yang mengandung tanda kutip.
 */
function addToCartWrapper(productId, productName, productPrice, productImage, quantity, variationName) {
    if (typeof window.addToCart === 'function') {
        // Memanggil fungsi addToCart yang seharusnya sudah tersedia global dari cart.js
        window.addToCart(productId, productName, productPrice, productImage, quantity, variationName);
    } else {
        console.error("Fungsi addToCart dari cart.js tidak tersedia.");
        alert("Terjadi kesalahan, fungsi keranjang tidak ditemukan.");
    }
}
window.addToCartWrapper = addToCartWrapper;