document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginErrorDiv = document.getElementById('login-error');

    updateUserLinks(); // Update links on page load based on login state

    // Static credentials for demo purposes - Now an array of user objects
    const VALID_USERS = [
        { username: "Andyno", password: "00023" },
        { username: "Althaf", password: "00032" },
        { username: "Balya", password: "00003" },
        { username: "Rasya", password: "00044" }
    ];

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = loginForm.username.value;
            const passwordInput = loginForm.password.value;

            const foundUser = VALID_USERS.find(user => user.username === usernameInput && user.password === passwordInput);

            if (foundUser) {
                // Store the found user object, which includes the role
                localStorage.setItem('currentUser', JSON.stringify({ 
                    username: foundUser.username, 
                    role: foundUser.role 
                }));
                
                const redirectTarget = localStorage.getItem('loginRedirect');
                localStorage.removeItem('loginRedirect'); // Clear after use

                // Perform fade-out then redirect
                document.body.classList.remove('loaded'); // Assuming 'loaded' class controls opacity
                setTimeout(() => {
                    window.location.href = redirectTarget || 'index.html'; 
                }, 300); // Match transition duration

            } else {
                if(loginErrorDiv) {
                    loginErrorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Autentikasi Gagal. Periksa kembali User Identifier dan Authentication Key Anda.`;
                    loginErrorDiv.classList.remove('hidden');
                    // Trigger shake animation
                    loginErrorDiv.classList.remove('shake'); 
                    void loginErrorDiv.offsetWidth; // Force reflow to restart animation
                    loginErrorDiv.classList.add('shake'); 
                }
            }
        });
    }
});

function updateUserLinks() {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser')); // Renamed for clarity

    // Common selectors for navbar elements loaded by global.js
    const navUserLink = document.getElementById('nav-user-link'); 
    const mobileNavUserLink = document.getElementById('mobile-nav-user-link'); 
    const navAccountLink = document.getElementById('nav-account-link'); 
    const mobileNavAccountLink = document.getElementById('mobile-nav-account-link'); 
    // Example: Link to an admin panel if user is admin
    const navAdminPanelLink = document.getElementById('nav-admin-panel-link'); 
    const mobileNavAdminPanelLink = document.getElementById('mobile-nav-admin-panel-link');

    if (currentUserData) {
        const displayName = currentUserData.username.length > 10 ? currentUserData.username.substring(0,10) + "..." : currentUserData.username;

        if (navUserLink) {
            navUserLink.innerHTML = `<i class="fas fa-user-circle nav-icon"></i> ${displayName}`;
            navUserLink.href = 'account.html';
            navUserLink.dataset.navlink = 'account.html';
        }
        if (mobileNavUserLink) {
            mobileNavUserLink.innerHTML = `<i class="fas fa-user-circle nav-icon-mobile"></i> ${displayName}`;
            mobileNavUserLink.href = 'account.html';
            mobileNavUserLink.dataset.navlink = 'account.html';
        }
        if (navAccountLink) navAccountLink.classList.remove('hidden');
        if (mobileNavAccountLink) mobileNavAccountLink.classList.remove('hidden');

        // Show/hide admin link based on role
        if (currentUserData.role === 'admin') {
            if (navAdminPanelLink) navAdminPanelLink.classList.remove('hidden');
            if (mobileNavAdminPanelLink) mobileNavAdminPanelLink.classList.remove('hidden');
        } else {
            if (navAdminPanelLink) navAdminPanelLink.classList.add('hidden');
            if (mobileNavAdminPanelLink) mobileNavAdminPanelLink.classList.add('hidden');
        }


    } else { // Not logged in
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
        if (navAdminPanelLink) navAdminPanelLink.classList.add('hidden'); // Hide admin link if not logged in
        if (mobileNavAdminPanelLink) mobileNavAdminPanelLink.classList.add('hidden');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart'); 
    localStorage.removeItem('cartSummary'); // Clear cart summary on logout
    
    updateUserLinks(); // This will now also hide role-specific links like admin panel
    if (typeof updateCartCount === 'function') {
        updateCartCount(); // Update cart display in navbar
    }

    const fadeOutAndRedirect = (url) => {
        document.body.classList.remove('loaded');
        setTimeout(() => { window.location.href = url; }, 300); // Match transition duration
    };

    // Redirect to login if on a protected page, otherwise to index
    const protectedPaths = ['account.html', 'checkout.html', 'cart.html', 'admin-panel.html']; // Added admin-panel
    const currentPath = window.location.pathname.split("/").pop();
    
    if (protectedPaths.includes(currentPath)) {
        fadeOutAndRedirect('login.html');
    } else {
        if (document.body.classList.contains('loaded')) {
             document.body.classList.remove('loaded');
             setTimeout(() => { window.location.reload(); }, 300);
        } else {
            window.location.reload();
        }
    }
}

function isLoggedIn() {
    return !!localStorage.getItem('currentUser');
}

// Function to check if the current user has a specific role
function hasRole(roleName) {
    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    return currentUserData && currentUserData.role === roleName;
}
window.hasRole = hasRole; // Expose globally if needed by other scripts


function redirectToLogin(targetPage = null) {
    if (targetPage) {
        localStorage.setItem('loginRedirect', targetPage);
    } else {
        localStorage.removeItem('loginRedirect');
    }
    document.body.classList.remove('loaded');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 300); 
}

if (typeof window.updateCartCount === 'undefined') {
    window.updateCartCount = function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(el => {
            if (el) {
                el.textContent = totalItems;
                el.style.display = totalItems > 0 ? 'inline-block' : 'none';
            }
        });
    };
    document.addEventListener('DOMContentLoaded', window.updateCartCount);
}