// Simulasi State Login
let currentUser = JSON.parse(localStorage.getItem('maymartUser')) || null;

function initializeAuth() {
    updateUserLinks();
    // Jika ada di halaman login atau register
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Jika ada di halaman akun
    const accountInfo = document.getElementById('account-info');
    if (accountInfo && currentUser) {
        displayAccountInfo();
    } else if (accountInfo && !currentUser) {
        // Jika belum login dan mencoba akses halaman akun, redirect ke login
        window.location.href = 'login.html';
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value; // Dalam aplikasi nyata, jangan simpan password plain text

    // Simulasi: Cek jika user ada di localStorage (dari register)
    // Dalam aplikasi nyata, ini adalah panggilan API ke backend
    const storedUsers = JSON.parse(localStorage.getItem('maymartRegisteredUsers')) || [];
    const foundUser = storedUsers.find(user => user.email === email && user.password === password); // Password check sederhana

    if (foundUser) {
        currentUser = { email: foundUser.email, name: foundUser.name || 'Pengguna MAYMART' }; // Ambil nama jika ada
        localStorage.setItem('maymartUser', JSON.stringify(currentUser));
        alert('Login berhasil!');
        window.location.href = 'account.html'; // Redirect ke halaman akun atau beranda
    } else {
        alert('Email atau password salah.');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const confirmPassword = event.target['confirm-password'].value;

    // if (password !== confirmPassword) {
    //     alert('Password dan konfirmasi password tidak cocok!');
    //     return;
    // }

    // Simulasi: Simpan user ke localStorage
    let storedUsers = JSON.parse(localStorage.getItem('maymartRegisteredUsers')) || [];
    if (storedUsers.find(user => user.email === email)) {
        alert('Email sudah terdaftar.');
        return;
    }

    storedUsers.push({ name, email, password }); // Simpan password (tidak aman untuk produksi!)
    localStorage.setItem('maymartRegisteredUsers', JSON.stringify(storedUsers));

    alert('Registrasi berhasil! Silakan login.');
    window.location.href = 'login.html';
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('maymartUser');
    // localStorage.removeItem('maymartCart'); // Opsional: hapus keranjang saat logout
    alert('Anda telah logout.');
    updateUserLinks();
    window.location.href = 'index.html';
}

function updateUserLinks() {
    const userLink = document.getElementById('user-link');
    const mobileUserLink = document.getElementById('mobile-user-link');
    // const accountLink = document.getElementById('account-link'); // Jika ada link akun terpisah

    if (currentUser) {
        if (userLink) {
            userLink.textContent = `Hi, ${currentUser.name.split(' ')[0] || 'User'}`;
            userLink.href = 'account.html';
        }
        if (mobileUserLink) {
            mobileUserLink.textContent = `Akun Saya`;
            mobileUserLink.href = 'account.html';
        }
        // if (accountLink) accountLink.classList.remove('hidden');
    } else {
        if (userLink) {
            userLink.textContent = 'Login';
            userLink.href = 'login.html';
        }
        if (mobileUserLink) {
            mobileUserLink.textContent = 'Login/Register';
            mobileUserLink.href = 'login.html';
        }
        // if (accountLink) accountLink.classList.add('hidden');
    }
}

function displayAccountInfo() {
    const accountInfoDiv = document.getElementById('account-info');
    const orderHistoryDiv = document.getElementById('order-history-content'); // Pastikan ada elemen ini di account.html

    if (accountInfoDiv && currentUser) {
        accountInfoDiv.innerHTML = `
            <h2 class="text-2xl font-semibold mb-2">Profil Saya</h2>
            <p class="mb-1"><strong class="text-slate-gray">Nama:</strong> ${currentUser.name || 'Belum diatur'}</p>
            <p><strong class="text-slate-gray">Email:</strong> ${currentUser.email}</p>
            <button id="edit-profile-btn" class="mt-4 btn-secondary py-2 px-4 rounded-md text-sm">Edit Profil</button>
        `;
        // Tambahkan event listener untuk edit profil jika diperlukan
    }

    if (orderHistoryDiv) {
        // Simulasi riwayat pesanan
        const orders = JSON.parse(localStorage.getItem('maymartOrders')) || [];
        const userOrders = orders.filter(order => order.userEmail === currentUser.email);

        if (userOrders.length > 0) {
            orderHistoryDiv.innerHTML = userOrders.map(order => `
                <div class="p-4 border border-gray-200 rounded-md mb-3 bg-white shadow">
                    <p class="font-semibold">Pesanan #${order.id} <span class="text-sm text-slate-gray">- ${new Date(order.date).toLocaleDateString('id-ID')}</span></p>
                    <p>Total: ${formatRupiah(order.total)} - Status: <span class="font-medium ${order.status === 'Dikirim' ? 'text-blue-600' : 'text-green-600'}">${order.status}</span></p>
                    ${order.trackingNumber ? `<p class="text-sm">No. Resi: ${order.trackingNumber} <button onclick="trackOrder('${order.trackingNumber}')" class="text-primary hover:underline ml-2">Lacak</button></p>` : ''}
                </div>
            `).join('');
        } else {
            orderHistoryDiv.innerHTML = `<p class="text-slate-gray">Anda belum memiliki riwayat pesanan.</p>`;
        }
    }
}

function trackOrder(trackingNumber) {
    // Simulasi pelacakan
    alert(`Melacak pesanan dengan nomor resi: ${trackingNumber}...\nStatus: Sedang dalam perjalanan menuju alamat Anda.`);
}


// Panggil initializeAuth saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            // Demo: username = admin, password = 123456
            if (username === 'admin' && password === '123456') {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
            } else {
                document.getElementById('login-error').classList.remove('hidden');
            }
        });
    }

    // Update navbar login/account link
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userLink = document.getElementById('user-link');
    const mobileUserLink = document.getElementById('mobile-user-link');
    if (userLink) {
        userLink.textContent = isLoggedIn ? 'Logout' : 'Login';
        userLink.href = isLoggedIn ? '#' : 'login.html';
        userLink.onclick = isLoggedIn ? function(e){e.preventDefault();localStorage.removeItem('isLoggedIn');location.reload();} : null;
    }
    if (mobileUserLink) {
        mobileUserLink.textContent = isLoggedIn ? 'Logout' : 'Login';
        mobileUserLink.href = isLoggedIn ? '#' : 'login.html';
        mobileUserLink.onclick = isLoggedIn ? function(e){e.preventDefault();localStorage.removeItem('isLoggedIn');location.reload();} : null;
    }
});