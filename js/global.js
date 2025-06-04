// js/global.js

document.addEventListener('DOMContentLoaded', () => {
    // Load Navbar and Footer components
    loadHTMLComponent('navbar.html', 'page-navbar-container', initializeNavbar);
    loadHTMLComponent('footer.html', 'page-footer-container', initializeFooter);

    // Apply fade-in effect to the body once content is likely ready
    // Small delay to ensure transitions are smooth, especially after component loading
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 50); // A small delay can help CSS transitions catch up

    initializePageTransitions();
});

function loadHTMLComponent(filePath, targetElementId, callback) {
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load ${filePath}: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                targetElement.innerHTML = data;
                if (callback && typeof callback === 'function') {
                    callback(); // Execute callback after HTML is injected
                }
            })
            .catch(error => console.error('Error loading HTML component:', error));
    }
}

function initializeNavbar() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
            mobileMenu.classList.toggle('open'); // 'open' class controls visibility via max-height
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Active link styling
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('[data-navlink]').forEach(link => {
        const linkTargetPage = link.dataset.navlink.split("#")[0];
        link.classList.remove('active-link', 'active-mobile-link'); // Clear previous active states
        if (linkTargetPage === currentPath) {
            link.classList.add(link.closest('.mobile-menu-modern') ? 'active-mobile-link' : 'active-link');
        }
    });
    
    // Disable "Akun" link if on account.html (visual cue, not security)
    if (currentPath === "account.html") {
        document.querySelectorAll('a[data-navlink="account.html"]').forEach(l => {
            if(l) {
                l.style.pointerEvents = 'none';
                l.style.opacity = '0.6';
                l.classList.remove('active-link', 'active-mobile-link'); // Ensure it's not styled as active
            }
        });
    }

    // Search functionality
    const searchInputDesktop = document.getElementById('search-input-desktop');
    const searchButtonDesktop = document.getElementById('search-button-desktop');
    const searchInputMobile = document.getElementById('search-input-mobile');
    const searchButtonMobile = document.getElementById('search-button-mobile');

    function performSearch(searchTerm) {
        if (searchTerm.trim() === "") return;
        
        const isProductsPage = window.location.pathname.endsWith('products.html');

        if (isProductsPage) {
            // If on products.html, filter directly using function from script.js
            if (typeof window.filterProductsBySearch === 'function') {
                window.filterProductsBySearch(searchTerm);
            } else {
                console.warn('filterProductsBySearch function not found on products page.');
                // Fallback: redirect with query param to re-trigger search on load
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm.trim())}`;
            }
        } else { 
            // If on any other page, redirect to products.html with search query
            document.body.classList.remove('loaded');
            setTimeout(() => {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm.trim())}`;
            }, 300); // Match transition duration
        }
        // Close mobile menu if open after search
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenuButton.click(); 
        }
    }

    if (searchButtonDesktop && searchInputDesktop) {
        searchButtonDesktop.addEventListener('click', () => performSearch(searchInputDesktop.value));
        searchInputDesktop.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(searchInputDesktop.value); });
    }
    if (searchButtonMobile && searchInputMobile) {
        searchButtonMobile.addEventListener('click', () => performSearch(searchInputMobile.value));
        searchInputMobile.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(searchInputMobile.value); });
    }
    
    // Sync search input values between desktop and mobile
    if(searchInputDesktop && searchInputMobile){
        searchInputDesktop.addEventListener('input', (e) => { if(searchInputMobile.value !== e.target.value) searchInputMobile.value = e.target.value; });
        searchInputMobile.addEventListener('input', (e) => { if(searchInputDesktop.value !== e.target.value) searchInputDesktop.value = e.target.value; });
    }

    // Call auth.js and cart.js functions to update navbar elements
    if (typeof updateUserLinks === 'function') { updateUserLinks(); }
    if (typeof updateCartCount === 'function') { updateCartCount(); }
}

function initializeFooter() {
    const currentYearSpanFooter = document.getElementById('current-year-footer');
    if (currentYearSpanFooter) {
        currentYearSpanFooter.textContent = new Date().getFullYear();
    }
}

function initializePageTransitions() {
    document.querySelectorAll('a').forEach(link => {
        // Check if the link is internal, not a blank target, and not marked with data-no-transition
        if (link.hostname === window.location.hostname &&
            link.target !== '_blank' &&
            !link.hasAttribute('data-no-transition')) {
            
            const href = link.href;
            // Avoid transition for same-page hash links (e.g., for accordions or tabs if any)
            // but allow transition if it's a link to a different page even if it has a hash.
            const isSamePageHashLink = href.startsWith(window.location.origin + window.location.pathname + '#');
            const isJustHash = link.getAttribute('href')?.startsWith('#') && link.getAttribute('href').length > 1;


            if (!isSamePageHashLink && !isJustHash) {
                link.addEventListener('click', function(e) {
                    // Only prevent default and fade if navigating to a genuinely different page path
                    const currentBase = window.location.href.split('#')[0].split('?')[0];
                    const targetBase = href.split('#')[0].split('?')[0];

                    if (href && targetBase !== currentBase) {
                        e.preventDefault();
                        document.body.classList.remove('loaded'); // Start fade-out
                        setTimeout(() => { window.location.href = href; }, 300); // Duration of fade
                    }
                    // If it's the same base path (e.g. only query params change, or same page hash links not caught above), let default behavior occur.
                });
            }
        }
    });
}