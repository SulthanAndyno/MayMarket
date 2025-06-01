// js/global.js
document.addEventListener('DOMContentLoaded', () => {
    loadHTML('_navbar.html', 'page-navbar-container', () => {
        initializeNavbarInteractions();
        if (typeof updateUserLinks === 'function') { updateUserLinks(); }
        if (typeof updateCartCount === 'function') { updateCartCount(); }
    });
    loadHTML('_footer.html', 'page-footer-container', () => {
        // Pindahkan logika update tahun ke sini agar pasti berjalan setelah footer dimuat
        const currentYearSpanFooter = document.getElementById('current-year-footer');
        if (currentYearSpanFooter) {
            currentYearSpanFooter.textContent = new Date().getFullYear();
        }
    });

    document.body.classList.add('loaded');

    // Page transition for internal links (lebih hati-hati dengan hash)
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname &&
            link.target !== '_blank' &&
            !link.hasAttribute('data-no-transition')) {
            
            const isHashLink = link.href.includes('#');
            const isSamePageHashLink = isHashLink && (new URL(link.href).pathname === window.location.pathname);

            if (!isSamePageHashLink) { // Hanya terapkan transisi jika bukan link hash di halaman yang sama
                 link.addEventListener('click', function(e) {
                    const href = this.href;
                    // Cek apakah hanya hash yang berbeda atau path/query juga
                    const currentBase = window.location.href.split('#')[0];
                    const targetBase = href.split('#')[0];

                    if (href && targetBase !== currentBase) {
                        e.preventDefault();
                        document.body.classList.remove('loaded');
                        setTimeout(() => { window.location.href = href; }, 300);
                    }
                    // Jika hanya hash yang berbeda di halaman yang sama, biarkan default behavior (smooth scroll)
                });
            }
        }
    });
});

function loadHTML(filePath, targetElementId, callback) {
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
        fetch(filePath)
            .then(response => response.ok ? response.text() : Promise.reject(`Could not load ${filePath}: ${response.statusText}`))
            .then(data => {
                targetElement.innerHTML = data;
                if (callback && typeof callback === 'function') { callback(); }
            })
            .catch(error => console.error('Error loading HTML partial:', error));
    }
}

function initializeNavbarInteractions() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
            mobileMenu.classList.toggle('open'); // CSS akan menangani animasi max-height
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const currentHash = window.location.hash;
    document.querySelectorAll('.nav-links a, .mobile-menu-modern a').forEach(link => {
        const linkHref = link.getAttribute('href');
        const navLinkData = link.dataset.navlink; // Gunakan data-navlink jika ada
        let linkPath = navLinkData ? (navLinkData.split("#")[0] || "index.html") : (linkHref.split("/").pop().split("#")[0] || "index.html");
        const linkHash = navLinkData && navLinkData.includes("#") ? "#" + navLinkData.split("#")[1] : (linkHref.includes("#") ? "#" + linkHref.split("#")[1] : "");
        
        link.classList.remove('active-link', 'active-mobile-link');

        if (linkPath === currentPath) {
            if ((linkHash && linkHash === currentHash) || (!linkHash && !currentHash && !linkHref.includes('#'))) {
                link.classList.add(link.closest('.mobile-menu-modern') ? 'active-mobile-link' : 'active-link');
            }
        }
    });
    
    if (currentPath === "account.html") {
        document.querySelectorAll('a[data-navlink="account.html"]').forEach(l => {
            if(l) {
                l.style.pointerEvents = 'none';
                l.style.opacity = '0.6';
                l.classList.remove('active-link', 'active-mobile-link');
            }
        });
    }

    const searchInputDesktop = document.getElementById('search-input-desktop');
    const searchButtonDesktop = document.getElementById('search-button-desktop');
    const searchInputMobile = document.getElementById('search-input-mobile');
    const searchButtonMobile = document.getElementById('search-button-mobile');

    function performSearchNavigation(searchTerm) {
        if (searchTerm.trim() === "") return;
        const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');

        if (isIndexPage) {
            if (typeof window.filterProductsBySearch === 'function') {
                window.filterProductsBySearch(searchTerm);
            } else {
                console.warn('filterProductsBySearch function not found on index page.');
            }
            const productsSection = document.getElementById('products');
            if (productsSection) {
                setTimeout(() => { // Beri waktu DOM update
                    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
             // Tutup menu mobile jika terbuka setelah pencarian
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenuButton.click(); 
            }
        } else {
            document.body.classList.remove('loaded');
            setTimeout(() => {
                window.location.href = `index.html?search=${encodeURIComponent(searchTerm.trim())}#products`;
            }, 300);
        }
    }

    if (searchButtonDesktop && searchInputDesktop) {
        searchButtonDesktop.addEventListener('click', () => performSearchNavigation(searchInputDesktop.value));
        searchInputDesktop.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearchNavigation(searchInputDesktop.value); });
    }
    if (searchButtonMobile && searchInputMobile) {
        searchButtonMobile.addEventListener('click', () => performSearchNavigation(searchInputMobile.value));
        searchInputMobile.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearchNavigation(searchInputMobile.value); });
    }

    if(searchInputDesktop && searchInputMobile){
        searchInputDesktop.addEventListener('input', (e) => { if(searchInputMobile.value !== e.target.value) searchInputMobile.value = e.target.value; });
        searchInputMobile.addEventListener('input', (e) => { if(searchInputDesktop.value !== e.target.value) searchInputDesktop.value = e.target.value; });
    }
}