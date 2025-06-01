// js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginErrorDiv = document.getElementById('login-error');

    updateUserLinks(); // Panggil saat halaman dimuat

    const MANUAL_USERNAME = "maymartadmin";
    const MANUAL_PASSWORD = "password123";

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            if (username === MANUAL_USERNAME && password === MANUAL_PASSWORD) {
                localStorage.setItem('currentUser', JSON.stringify({ username: username }));
                
                const redirectTarget = localStorage.getItem('loginRedirect');
                if (document.body.classList.contains('loaded')) {
                    document.body.classList.remove('loaded');
                    setTimeout(() => {
                        if (redirectTarget) {
                            localStorage.removeItem('loginRedirect');
                            window.location.href = redirectTarget;
                        } else {
                            window.location.href = 'index.html'; 
                        }
                    }, 500);
                } else {
                    if (redirectTarget) {
                        localStorage.removeItem('loginRedirect');
                        window.location.href = redirectTarget;
                    } else {
                        window.location.href = 'index.html'; 
                    }
                }
            } else {
                if(loginErrorDiv) {
                    loginErrorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Autentikasi Gagal. Periksa kembali User Identifier dan Authentication Key Anda.`;
                    loginErrorDiv.classList.remove('hidden');
                    loginErrorDiv.classList.remove('shake'); 
                    void loginErrorDiv.offsetWidth; 
                    loginErrorDiv.classList.add('shake'); 
                }
            }
        });
    }
});

function updateUserLinks() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // --- Untuk komponen _navbar.html (digunakan di index.html, about.html, dll via global.js) ---
    const navUserLink = document.getElementById('nav-user-link'); 
    const mobileNavUserLink = document.getElementById('mobile-nav-user-link'); 
    const navAccountLink = document.getElementById('nav-account-link'); 
    const mobileNavAccountLink = document.getElementById('mobile-nav-account-link'); 

    // --- Untuk navbar yang ter-embed langsung di halaman lain (account.html, cart.html, checkout.html, order-success.html) ---
    const embeddedUserLink = document.getElementById('user-link'); 
    const embeddedMobileUserLink = document.getElementById('mobile-user-link'); 
    
    // --- Untuk link "Akun" spesifik yang mungkin ada di beberapa halaman (index, checkout, order-success) ---
    const indexAccountLink = document.getElementById('account-link-index');
    const mobileIndexAccountLink = document.getElementById('mobile-account-link-index');

    // --- Untuk link "Akun" di halaman account.html itu sendiri ---
    const accountPageAccountLinks = document.querySelectorAll('#account-link, #mobile-account-link');


    if (currentUser) {
        const displayName = currentUser.username.length > 10 ? currentUser.username.substring(0,10) + "..." : currentUser.username;

        // Perbarui _navbar.html
        if (navUserLink) {
            navUserLink.innerHTML = `<i class="fas fa-user-circle nav-icon"></i> ${displayName}`;
            navUserLink.href = 'account.html';
            navUserLink.dataset.navlink = 'account.html'; // Untuk styling link aktif
        }
        if (mobileNavUserLink) {
            mobileNavUserLink.innerHTML = `<i class="fas fa-user-circle nav-icon-mobile"></i> ${displayName}`;
            mobileNavUserLink.href = 'account.html';
            mobileNavUserLink.dataset.navlink = 'account.html';
        }
        if (navAccountLink) navAccountLink.classList.remove('hidden');
        if (mobileNavAccountLink) mobileNavAccountLink.classList.remove('hidden');

        // Perbarui navbar ter-embed
        if (embeddedUserLink) {
            embeddedUserLink.innerHTML = `<i class="fas fa-user-circle mr-1"></i> ${displayName}`;
            embeddedUserLink.href = 'account.html';
        }
        if (embeddedMobileUserLink) {
            embeddedMobileUserLink.innerHTML = `<i class="fas fa-user-circle mr-1"></i> ${displayName}`;
            embeddedMobileUserLink.href = 'account.html';
        }

        // Tampilkan link "Akun" spesifik
        if (indexAccountLink) indexAccountLink.classList.remove('hidden');
        if (mobileIndexAccountLink) mobileIndexAccountLink.classList.remove('hidden');
        
        // Tampilkan link "Akun" di halaman account.html
        accountPageAccountLinks.forEach(link => {
            if (link && window.location.pathname.includes('account.html')) {
                 link.classList.remove('hidden');
            } else if (link) {
                // Jangan sembunyikan #nav-account-link di sini, sudah dihandle di atas
                if (link.id !== 'nav-account-link' && link.id !== 'mobile-nav-account-link') {
                    link.classList.add('hidden');
                }
            }
        });

    } else { // Jika tidak ada pengguna login
        // Reset _navbar.html
        if (navUserLink) {
            navUserLink.innerHTML = '<i class="fas fa-sign-in-alt nav-icon"></i> Login';
            navUserLink.href = 'login.html';
            navUserLink.dataset.navlink = 'login.html';
        }
        if (mobileNavUserLink) {
            mobileNavUserLink.innerHTML = '<i class="fas fa-sign-in-alt nav-icon-mobile"></i> Login';
            mobileNavUserLink.href = 'login.html';
            mobileNavUserLink.dataset.navlink = 'login.html';
        }
        if (navAccountLink) navAccountLink.classList.add('hidden');
        if (mobileNavAccountLink) mobileNavAccountLink.classList.add('hidden');

        // Reset navbar ter-embed
        if (embeddedUserLink) {
            embeddedUserLink.innerHTML = '<i class="fas fa-sign-in-alt mr-1"></i> Login';
            embeddedUserLink.href = 'login.html';
        }
        if (embeddedMobileUserLink) {
            embeddedMobileUserLink.innerHTML = '<i class="fas fa-sign-in-alt mr-1"></i> Login';
            embeddedMobileUserLink.href = 'login.html';
        }

        // Sembunyikan link "Akun" spesifik
        if (indexAccountLink) indexAccountLink.classList.add('hidden');
        if (mobileIndexAccountLink) mobileIndexAccountLink.classList.add('hidden');

        // Sembunyikan link "Akun" di halaman account.html
        accountPageAccountLinks.forEach(link => {
            if (link) link.classList.add('hidden');
        });
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart'); 
    localStorage.removeItem('cartSummary');
    updateUserLinks();
    if (typeof updateCartCount === 'function') updateCartCount(); 

    const fadeOutAndRedirect = (url) => {
        if (document.body.classList.contains('loaded')) {
            document.body.classList.remove('loaded');
            setTimeout(() => { window.location.href = url; }, 500);
        } else {
            window.location.href = url;
        }
    };

    if (window.location.pathname.includes('account.html') || window.location.pathname.includes('checkout.html') || window.location.pathname.includes('cart.html')) {
        fadeOutAndRedirect('login.html');
    } else {
        fadeOutAndRedirect('index.html'); 
    }
}

if (typeof window.updateCartCount === 'undefined') {
    window.updateCartCount = function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count'); // Global selector
        cartCountElements.forEach(el => {
            if (el) { // Pastikan elemen ada
                el.textContent = totalItems;
                el.style.display = totalItems > 0 ? 'inline-block' : 'none';
            }
        });
    };
}
// Panggil updateCartCount setelah DOM siap dan juga setelah updateUserLinks
// Karena updateCartCount mungkin juga dipanggil dari global.js setelah _navbar.html dimuat
if (typeof updateCartCount === "function") {
    document.addEventListener('DOMContentLoaded', () => {
        updateCartCount();
    });
}


function isLoggedIn() {
    return !!localStorage.getItem('currentUser');
}

function redirectToLogin(redirectPage = null) {
    if (redirectPage) {
        localStorage.setItem('loginRedirect', redirectPage);
    } else {
        localStorage.removeItem('loginRedirect');
    }
    if (document.body.classList.contains('loaded')) {
        document.body.classList.remove('loaded');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    } else {
        window.location.href = 'login.html';
    }
}