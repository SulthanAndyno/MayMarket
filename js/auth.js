document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginErrorDiv = document.getElementById('login-error'); // Changed to a div
    
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
                window.location.href = 'index.html'; 
            } else {
                if(loginErrorDiv) {
                    // More descriptive error message
                    loginErrorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Autentikasi Gagal. Periksa kembali User Identifier dan Authentication Key Anda.`;
                    loginErrorDiv.classList.remove('hidden');
                    // Optionally, add a class to trigger re-animation if error persists
                    loginErrorDiv.classList.remove('shake'); // Remove class first
                    void loginErrorDiv.offsetWidth; // Trigger reflow
                    loginErrorDiv.classList.add('shake'); // Add class back
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
        accountLinkElements.forEach(link => {
            if (link) {
                link.classList.remove('hidden');
                link.innerHTML = `<i class="fas fa-cog"></i> Akun`; // Or something similar
            }
        });

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
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateUserLinks(); 
    if (window.location.pathname.includes('account.html') || window.location.pathname.includes('checkout.html')) {
        window.location.href = 'login.html';
    } else {
       window.location.href = 'index.html'; 
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