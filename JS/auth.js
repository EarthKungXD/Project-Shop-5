// ========================================
// AUTHENTICATION SYSTEM - FIXED VERSION
// ========================================

let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};

// Show Login Modal
function showLogin() {
    closeModal();
    setTimeout(() => {
        const modal = document.getElementById('loginModal');
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }, 100);
}

// Show Register Modal
function showRegister() {
    closeModal();
    setTimeout(() => {
        const modal = document.getElementById('registerModal');
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }, 100);
}

// Close All Modals - FIX: ลบ backdrop overlay ที่ค้างด้วย
function closeModal() {
    const modals = [
        'loginModal',
        'registerModal',
        'paymentModal',
        'orderHistoryModal',
        'profileModal'
    ];
    
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    });
    
    // ลบ overlay elements ที่อาจค้างอยู่
    document.querySelectorAll('.modal-overlay, .custom-modal-overlay').forEach(overlay => {
        overlay.remove();
    });
    
    // หยุด QR timer ถ้า modal ที่ปิดเป็น payment modal
    if (typeof stopQRTimer === 'function') {
        stopQRTimer();
    }
}

// Login Function
function login(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateUIAfterLogin();
        closeModal();
        showNotification('เข้าสู่ระบบสำเร็จ!', 'success', 'ยินดีต้อนรับ');
    } else {
        showNotification('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'error', 'ข้อผิดพลาด');
    }
}

// Register Function
function register(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerPasswordConfirm').value;

    if (password !== confirmPassword) {
        showNotification('รหัสผ่านไม่ตรงกัน', 'error', 'ข้อผิดพลาด');
        return;
    }

    if (users.find(u => u.email === email)) {
        showNotification('อีเมลนี้ถูกใช้งานแล้ว', 'error', 'ข้อผิดพลาด');
        return;
    }

    const newUser = { 
        name, 
        email, 
        password,
        joinDate: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    orderHistory[email] = [];
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    showNotification('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ', 'success', 'สำเร็จ');
    closeModal();
    setTimeout(() => showLogin(), 1500);
}

// Logout Function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    if (typeof cart !== 'undefined') {
        cart = [];
        updateCartBadge();
    }
    updateUIAfterLogin();
    closeProfileMenu();
    showNotification('ออกจากระบบสำเร็จ', 'success', 'ลาก่อน');
}

// Check Login Status
function checkLogin() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        if (!currentUser.avatar) {
            currentUser.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        updateUIAfterLogin();
    }
}

// Update UI After Login/Logout
function updateUIAfterLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const profileDropdown = document.getElementById('userProfileDropdown');
    
    if (currentUser) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (profileDropdown) profileDropdown.classList.remove('hidden');
        
        const avatar = currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`;
        const userAvatar = document.getElementById('userAvatar');
        const menuAvatar = document.getElementById('menuAvatar');
        const userDisplayName = document.getElementById('userDisplayName');
        const menuUserName = document.getElementById('menuUserName');
        const menuUserEmail = document.getElementById('menuUserEmail');
        
        if (userAvatar) userAvatar.src = avatar;
        if (menuAvatar) menuAvatar.src = avatar;
        if (userDisplayName) userDisplayName.textContent = currentUser.name;
        if (menuUserName) menuUserName.textContent = currentUser.name;
        if (menuUserEmail) menuUserEmail.textContent = currentUser.email;
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (profileDropdown) profileDropdown.classList.add('hidden');
    }
}

// Toggle Profile Menu
function toggleProfileMenu() {
    const dropdown = document.getElementById('userProfileDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close Profile Menu
function closeProfileMenu() {
    const dropdown = document.getElementById('userProfileDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// Show Order History
function showOrderHistory() {
    closeProfileMenu();
    
    if (!currentUser) return;
    
    const modal = document.getElementById('orderHistoryModal');
    const content = document.getElementById('orderHistoryContent');
    
    if (!modal || !content) return;
    
    const orders = orderHistory[currentUser.email] || [];
    
    if (orders.length === 0) {
        content.innerHTML = `
            <div class="empty-orders">
                <div class="empty-orders-icon">📋</div>
                <h3>ยังไม่มีประวัติการสั่งซื้อ</h3>
                <p>เริ่มสั่งซื้อสินค้าเพื่อดูประวัติที่นี่</p>
            </div>
        `;
    } else {
        content.innerHTML = orders.map((order, index) => `
            <div class="order-item">
                <div class="order-header">
                    <div>
                        <div class="order-number">คำสั่งซื้อ #${order.id}</div>
                        <div class="order-date">${new Date(order.date).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</div>
                    </div>
                    <div class="order-status completed">✓ สำเร็จ</div>
                </div>
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <span class="order-item-name">${item.emoji} ${item.name} x${item.quantity}</span>
                            <span class="order-item-price">${(item.price * item.quantity).toLocaleString()} บาท</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <span class="order-total-label">ยอดรวม</span>
                    <span class="order-total-amount">${order.total.toLocaleString()} บาท</span>
                </div>
            </div>
        `).reverse().join('');
    }
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

// Show Profile
function showProfile() {
    closeProfileMenu();
    
    if (!currentUser) return;
    
    const modal = document.getElementById('profileModal');
    if (!modal) return;
    
    const avatar = currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`;
    const orders = orderHistory[currentUser.email] || [];
    const joinDate = currentUser.joinDate ? new Date(currentUser.joinDate).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'ไม่ระบุ';
    
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const memberDays = currentUser.joinDate 
        ? Math.floor((Date.now() - new Date(currentUser.joinDate).getTime()) / (1000 * 60 * 60 * 24))
        : 0;
    
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileJoinDate = document.getElementById('profileJoinDate');
    
    if (profileAvatar) profileAvatar.src = avatar;
    if (profileName) profileName.textContent = currentUser.name;
    if (profileEmail) profileEmail.textContent = currentUser.email;
    if (profileJoinDate) profileJoinDate.textContent = joinDate;
    
    const orderCountStat = document.getElementById('profileOrderCountStat');
    const totalSpentStat = document.getElementById('profileTotalSpentStat');
    const memberDaysStat = document.getElementById('profileMemberDaysStat');
    
    if (orderCountStat) orderCountStat.textContent = orders.length;
    if (totalSpentStat) totalSpentStat.textContent = '฿' + totalSpent.toLocaleString();
    if (memberDaysStat) memberDaysStat.textContent = memberDays;
    
    switchProfileTab('profile');
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

// Show Settings
function showSettings() {
    closeProfileMenu();
    showProfile();
    setTimeout(() => {
        switchProfileTab('settings');
    }, 100);
}

// Change Avatar - FIX: บันทึกลง users array ด้วย
function changeAvatar() {
    if (!currentUser) return;
    
    const seeds = ['Felix', 'Aneka', 'Bailey', 'Charlie', 'Luna', 'Max', 'Milo', 'Oliver', 'Simba', 'Smokey'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}${Date.now()}`;
    
    currentUser.avatar = newAvatar;
    
    // FIX: อัพเดทใน users array ด้วย
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex].avatar = newAvatar;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update UI
    const profileAvatar = document.getElementById('profileAvatar');
    const userAvatar = document.getElementById('userAvatar');
    const menuAvatar = document.getElementById('menuAvatar');
    
    if (profileAvatar) profileAvatar.src = newAvatar;
    if (userAvatar) userAvatar.src = newAvatar;
    if (menuAvatar) menuAvatar.src = newAvatar;
    
    showNotification('เปลี่ยนรูปโปรไฟล์สำเร็จ!', 'success', 'สำเร็จ');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('userProfileDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        closeProfileMenu();
    }
});