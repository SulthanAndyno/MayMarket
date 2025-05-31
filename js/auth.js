document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginErrorDiv = document.getElementById('login-error'); 

    updateUserLinks(); 

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
                if (document.body.classList.contains('loaded')) { // Cek apakah transisi fade out perlu
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
    const userLink = document.getElementById('user-link');
    const mobileUserLink = document.getElementById('mobile-user-link');
    const accountLinkElements = document.querySelectorAll('#account-link, #mobile-account-link'); 

    if (currentUser) {
        const displayName = currentUser.username.length > 10 ? currentUser.username.substring(0,10) + "..." : currentUser.username;
        if (userLink) {
            userLink.innerHTML = `<i class="fas fa-user-circle mr-1"></i> ${displayName}`; 
            userLink.href = 'account.html';
        }
        if (mobileUserLink) {
            mobileUserLink.innerHTML = `<i class="fas fa-user-circle mr-1"></i> ${displayName}`;
            mobileUserLink.href = 'account.html';
        }
        // Perubahan: Link Akun di header index.html hanya muncul jika login
        const indexAccountLink = document.getElementById('account-link-index'); // ID baru untuk di index.html
        const mobileIndexAccountLink = document.getElementById('mobile-account-link-index'); // ID baru untuk di index.html

        accountLinkElements.forEach(link => { // Ini untuk account.html
            if (link && window.location.pathname.includes('account.html')) {
                 link.classList.remove('hidden'); // Tampilkan di account.html
            } else if (link) {
                link.classList.add('hidden'); // Sembunyikan di halaman lain
            }
        });
        
        // Tampilkan link akun di index.html jika user login
        if (indexAccountLink) indexAccountLink.classList.remove('hidden');
        if (mobileIndexAccountLink) mobileIndexAccountLink.classList.remove('hidden');


    } else {
        if (userLink) {
            userLink.innerHTML = '<i class="fas fa-sign-in-alt mr-1"></i> Login';
            userLink.href = 'login.html';
        }
        if (mobileUserLink) {
            mobileUserLink.innerHTML = '<i class="fas fa-sign-in-alt mr-1"></i> Login';
            mobileUserLink.href = 'login.html';
        }
        accountLinkElements.forEach(link => {
            if (link) link.classList.add('hidden');
        });
        // Sembunyikan link akun di index.html jika tidak login
        const indexAccountLink = document.getElementById('account-link-index');
        const mobileIndexAccountLink = document.getElementById('mobile-account-link-index');
        if (indexAccountLink) indexAccountLink.classList.add('hidden');
        if (mobileIndexAccountLink) mobileIndexAccountLink.classList.add('hidden');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart'); // Kosongkan keranjang saat logout
    localStorage.removeItem('cartSummary');
    updateUserLinks();
    if (typeof updateCartCount === 'function') updateCartCount(); // Update tampilan cart count

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
        fadeOutAndRedirect('index.html'); // Atau refresh halaman saat ini jika diinginkan
    }
}

if (typeof window.updateCartCount === 'undefined') {
    window.updateCartCount = function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'inline-block' : 'none';
        });
    };
}
if (typeof updateCartCount === "function") {
    document.addEventListener('DOMContentLoaded', updateCartCount);
}

// Fungsi validasi login dan redirect
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