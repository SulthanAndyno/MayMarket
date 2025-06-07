# MayMarket
# MAYMART E-Commerce Platform

MAYMART adalah sebuah platform e-commerce yang didesain untuk menjual produk-produk segar, khususnya sayuran, langsung dari petani ke konsumen. Website ini dibangun dengan HTML, CSS, dan JavaScript vanilla, dengan fokus pada pengalaman pengguna yang modern, futuristik, dan responsif.

## Daftar Isi

1.  [Fitur Utama](#fitur-utama)
2.  [Struktur Proyek](#struktur-proyek)
3.  [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4.  [Kredensial Demo (Login)](#kredensial-demo-login)

## Fitur Utama

*   **Beranda Dinamis**: Menampilkan hero section menarik dan produk unggulan yang diambil dari data produk.
*   **Katalog Produk Lengkap**: Halaman produk (`products.html`) menampilkan semua produk dengan opsi pencarian.
*   **Detail Produk**: Halaman individual (`product-detail.html`) untuk setiap produk, menampilkan gambar (dengan galeri Lightbox2), deskripsi, harga, pilihan variasi (jika ada), dan stok.
*   **Pencarian Produk**: Fungsionalitas pencarian global di navbar yang memfilter produk di halaman `products.html` berdasarkan nama, kategori, atau deskripsi.
*   **Keranjang Belanja Interaktif**:
    *   Pengguna dapat menambah, mengurangi jumlah, atau menghapus item dari keranjang.
    *   Keranjang disimpan di `localStorage` browser, persisten antar sesi selama pengguna tidak logout (karena logout membersihkan cart).
    *   Update jumlah item di ikon keranjang navbar secara real-time.
*   **Proses Checkout Sederhana**:
    *   Formulir detail pengiriman yang divalidasi.
    *   Ringkasan pesanan dan total biaya (termasuk biaya pengiriman tetap).
    *   Metode pembayaran saat ini hanya "Bayar di Tempat (COD)".
*   **Konfirmasi Pesanan**: Halaman sukses pesanan (`order-success.html`) menampilkan nota digital yang dapat dicetak, berisi detail pesanan, pelanggan, dan pengiriman.
*   **Autentikasi Pengguna (Simulasi)**:
    *   Sistem login menggunakan kredensial statis yang didefinisikan dalam `auth.js`.
    *   Pengguna yang berhasil login dapat mengakses halaman Akun dan menyimpan keranjang belanja.
    *   Beberapa halaman (Keranjang, Checkout, Akun) memerlukan login.
*   **Portal Akun Pengguna**: Halaman `account.html` menampilkan nama pengguna, dan placeholder untuk riwayat pesanan serta pengaturan akun. Menyediakan tombol logout.
*   **Desain Responsif**: Tampilan website menyesuaikan dengan berbagai ukuran layar (desktop, tablet, mobile) menggunakan CSS modern.
*   **Komponen Modular**: Navbar (`navbar.html`) dan Footer (`footer.html`) dimuat secara dinamis menggunakan JavaScript (`global.js`), memungkinkan pengelolaan yang lebih mudah.
*   **Efek Transisi Halaman**: Transisi fade-out/fade-in halus antar halaman untuk meningkatkan pengalaman pengguna.
*   **Informasi Tambahan**: Halaman "Tentang Kami" (`about.html`) dengan visi, keunggulan, dan profil tim.

## Struktur Proyek

```
/
├── css/
│   ├── theme.css           # Gaya global dan tema utama
│   ├── auth.css            # Gaya untuk halaman login & register
│   ├── index.css           # Gaya spesifik halaman Beranda
│   ├── about.css           # Gaya spesifik halaman Tentang Kami
│   ├── products.css        # Gaya spesifik halaman Produk
│   ├── product-detail.css  # Gaya spesifik halaman Detail Produk
│   ├── cart.css            # Gaya spesifik halaman Keranjang
│   ├── checkout.css        # Gaya spesifik halaman Checkout
│   ├── account.css         # Gaya spesifik halaman Akun
│   └── order-success.css   # Gaya spesifik halaman Sukses Pesanan
├── js/
│   ├── global.js           # Skrip global (navbar, footer, transisi, search)
│   ├── auth.js             # Logika autentikasi
│   ├── script.js           # Data produk utama, logika tampilan produk di halaman produk
│   ├── product.js          # Logika untuk halaman detail produk
│   ├── cart.js             # Manajemen keranjang belanja
│   ├── checkout.js         # Logika untuk proses checkout
│   └── order-success.js    # Logika untuk halaman sukses pesanan
├── images/
│   ├── logo.png
│   ├── Background.png
│   ├── (produk images: kubis.jpg, pare.jpg, etc.)
│   └── team/
│       ├── sulthan.jpg
│       └── (other team member images)
├── _navbar.html            # Komponen Navbar
├── _footer.html            # Komponen Footer
├── index.html              # Halaman Beranda
├── about.html              # Halaman Tentang Kami
├── products.html           # Halaman daftar semua produk
├── product-detail.html     # Halaman detail produk individual
├── cart.html               # Halaman Keranjang Belanja
├── checkout.html           # Halaman Proses Checkout
├── login.html              # Halaman Login Pengguna
├── register.html           # Halaman Registrasi Pengguna
├── account.html            # Halaman Akun Pengguna
├── order-success.html      # Halaman konfirmasi pesanan berhasil
├── .gitattributes
└── README.md               # File ini
```

## Teknologi yang Digunakan

*   **HTML5**: Struktur dasar halaman web.
*   **CSS3**: Styling tampilan, termasuk layout modern (Flexbox, Grid), desain responsif, dan efek visual.
*   **Vanilla JavaScript (ES6+)**: Fungsionalitas dinamis, manipulasi DOM, manajemen state sisi klien (`localStorage`).
*   **FontAwesome**: Ikon.
*   **Google Fonts**: Tipografi (Poppins, Orbitron).
*   **Lightbox2**: Galeri gambar zoomable di halaman detail produk.

## Kredensial Demo (Login)

Pengguna didefinisikan secara statis di `js/auth.js`. Berikut adalah kredensial yang valid:

*   Username: `Andyno`, Password: `00023`
*   Username: `Althaf`, Password: `00032`
*   Username: `Balya`, Password: `00003`
*   Username: `Rasya`, Password: `00044`