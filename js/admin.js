// ========================================
// ADMIN PANEL SYSTEM
// ========================================

// Admin authentication
let adminUser = JSON.parse(localStorage.getItem('adminUser')) || null;
let adminProducts = JSON.parse(localStorage.getItem('adminProducts')) || [];
let adminOrders = JSON.parse(localStorage.getItem('adminOrders')) || [];
let adminUsers = JSON.parse(localStorage.getItem('users')) || [];
let adminFlashSales = JSON.parse(localStorage.getItem('flashSales')) || [];
let adminReviews = JSON.parse(localStorage.getItem('productReviews')) || {};
let adminSettings = JSON.parse(localStorage.getItem('adminSettings')) || {
    shopName: 'FreshSip',
    shopPhone: '02-123-4567',
    shopEmail: 'info@freshsip.com',
    autoAcceptOrders: true,
    enableNotifications: true
};

// Initialize admin panel
function initAdmin() {
    // Check admin authentication
    if (!adminUser) {
        showAdminLogin();
        return;
    }
    
    // Load data from localStorage
    loadAdminData();
    
    // Render dashboard by default
    switchAdminTab('dashboard');
    
    // Update admin info display
    document.getElementById('adminName').textContent = adminUser.name;
    
    console.log('🔧 Admin Panel Initialized');
}

// Show admin login
function showAdminLogin() {
    const loginHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <div style="background: white; padding: 50px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 400px; width: 90%;">
                <h2 style="text-align: center; margin-bottom: 30px; font-size: 32px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🔐 Admin Login</h2>
                <form onsubmit="adminLogin(event)">
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Username</label>
                        <input type="text" id="adminUsername" placeholder="admin" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px;">
                    </div>
                    <div style="margin-bottom: 30px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Password</label>
                        <input type="password" id="adminPassword" placeholder="••••••••" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px;">
                    </div>
                    <button type="submit" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: 700; cursor: pointer;">เข้าสู่ระบบ</button>
                </form>
                <p style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">Demo: admin / admin123</p>
            </div>
        </div>
    `;
    
    document.body.innerHTML = loginHTML;
}

// Admin login
function adminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Demo credentials
    if (username === 'admin' && password === 'admin123') {
        adminUser = {
            username: 'admin',
            name: 'ผู้ดูแลระบบ',
            role: 'admin'
        };
        
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
        
        // Reload page to show admin panel
        window.location.reload();
    } else {
        alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
}

// Logout admin
function logoutAdmin() {
    if (confirm('ต้องการออกจากระบบหรือไม่?')) {
        localStorage.removeItem('adminUser');
        window.location.reload();
    }
}

// Load admin data
function loadAdminData() {
    // Load from main app data
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};
    
    // Convert order history to flat array
    adminOrders = [];
    let orderId = 1;
    Object.keys(orderHistory).forEach(email => {
        orderHistory[email].forEach(order => {
            adminOrders.push({
                id: orderId++,
                orderNumber: order.id,
                customerEmail: email,
                customerName: users.find(u => u.email === email)?.name || 'Unknown',
                items: order.items,
                total: order.total,
                status: order.status || 'completed',
                paymentMethod: order.paymentMethod,
                date: order.date
            });
        });
    });
    
    // Load products from data.js
    if (typeof products !== 'undefined') {
        adminProducts = [
            ...products.beverages.map(p => ({...p, category: 'beverages', categoryName: 'เครื่องดื่ม'})),
            ...products.smoothies.map(p => ({...p, category: 'smoothies', categoryName: 'น้ำปั่น'})),
            ...products.snacks.map(p => ({...p, category: 'snacks', categoryName: 'ของกินรองท้อง'})),
            ...(products.meals || []).map(p => ({...p, category: 'meals', categoryName: 'อาหาร'})),
            ...(products.desserts || []).map(p => ({...p, category: 'desserts', categoryName: 'ของหวาน'}))
        ];
    }
    
    adminUsers = users;
    adminFlashSales = JSON.parse(localStorage.getItem('flashSales')) || [];
    adminReviews = JSON.parse(localStorage.getItem('productReviews')) || {};
}

// Switch admin tab
function switchAdminTab(tabName) {
    // Update sidebar
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    event?.target?.closest('.sidebar-item')?.classList.add('active') ||
    document.querySelector(`[onclick="switchAdminTab('${tabName}')"]`)?.closest('.sidebar-item')?.classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const targetTab = document.getElementById(tabName + 'Tab');
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Render content based on tab
    switch(tabName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'products':
            renderProducts();
            break;
        case 'orders':
            renderOrders();
            break;
        case 'users':
            renderUsers();
            break;
        case 'flashsales':
            renderFlashSales();
            break;
        case 'reviews':
            renderReviews();
            break;
        case 'settings':
            renderSettings();
            break;
    }
}

// Render Dashboard
function renderDashboard() {
    // Calculate stats
    const totalRevenue = adminOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = adminOrders.length;
    const totalCustomers = adminUsers.length;
    
    // Calculate average rating
    let totalRatings = 0;
    let ratingCount = 0;
    Object.values(adminReviews).forEach(reviews => {
        reviews.forEach(review => {
            totalRatings += review.rating;
            ratingCount++;
        });
    });
    const avgRating = ratingCount > 0 ? (totalRatings / ratingCount).toFixed(1) : '0.0';
    
    // Update stats
    document.getElementById('totalRevenue').textContent = '฿' + totalRevenue.toLocaleString();
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalCustomers').textContent = totalCustomers;
    document.getElementById('avgRating').textContent = avgRating + ' ⭐';
    
    // Render top products
    const productSales = {};
    adminOrders.forEach(order => {
        order.items.forEach(item => {
            const key = item.name;
            if (!productSales[key]) {
                productSales[key] = { name: item.name, emoji: item.emoji, quantity: 0, revenue: 0 };
            }
            productSales[key].quantity += item.quantity;
            productSales[key].revenue += item.price * item.quantity;
        });
    });
    
    const topProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
    
    const topProductsList = document.getElementById('topProductsList');
    topProductsList.innerHTML = topProducts.map((product, index) => `
        <div class="top-product-item">
            <span class="product-rank">#${index + 1}</span>
            <span class="product-emoji">${product.emoji}</span>
            <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div class="product-sales">ขายได้ ${product.quantity} รายการ</div>
            </div>
            <div class="product-revenue">฿${product.revenue.toLocaleString()}</div>
        </div>
    `).join('');
    
    // Render recent orders
    const recentOrders = [...adminOrders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    const recentOrdersList = document.getElementById('recentOrdersList');
    recentOrdersList.innerHTML = recentOrders.map(order => `
        <div class="recent-order-item">
            <div class="order-info">
                <div class="order-number">#${order.orderNumber}</div>
                <div class="order-customer">${order.customerName}</div>
            </div>
            <div class="order-amount">฿${order.total.toLocaleString()}</div>
            <span class="status-badge ${order.status}">${getStatusText(order.status)}</span>
        </div>
    `).join('');
}

// Render Products
function renderProducts() {
    const tbody = document.querySelector('#productsTab table tbody');
    
    tbody.innerHTML = adminProducts.map(product => `
        <tr>
            <td>#${product.id}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 32px;">${product.emoji}</span>
                    <span>${product.name}</span>
                </div>
            </td>
            <td>${product.categoryName}</td>
            <td>฿${product.price.toLocaleString()}</td>
            <td><span class="status-badge active">Active</span></td>
            <td>
                <button class="btn-action btn-edit" onclick="editProduct(${product.id}, '${product.category}')">แก้ไข</button>
                <button class="btn-action btn-delete" onclick="deleteProduct(${product.id}, '${product.category}')">ลบ</button>
            </td>
        </tr>
    `).join('');
}

// Render Orders
function renderOrders(filterStatus = 'all') {
    const tbody = document.querySelector('#ordersTab table tbody');
    
    let filteredOrders = adminOrders;
    if (filterStatus !== 'all') {
        filteredOrders = adminOrders.filter(order => order.status === filterStatus);
    }
    
    tbody.innerHTML = filteredOrders.map(order => `
        <tr>
            <td>#${order.orderNumber}</td>
            <td>${order.customerName}</td>
            <td>${order.items.length} รายการ</td>
            <td>฿${order.total.toLocaleString()}</td>
            <td><span class="status-badge ${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatDate(order.date)}</td>
            <td>
                <button class="btn-action btn-view" onclick="viewOrder(${order.id})">ดู</button>
                <button class="btn-action btn-edit" onclick="updateOrderStatus(${order.id})">อัพเดท</button>
            </td>
        </tr>
    `).join('');
}

// Render Users
function renderUsers() {
    const tbody = document.querySelector('#usersTab table tbody');
    
    tbody.innerHTML = adminUsers.map(user => {
        const userOrders = adminOrders.filter(order => order.customerEmail === user.email);
        const userTotal = userOrders.reduce((sum, order) => sum + order.total, 0);
        
        return `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.email}" style="width: 40px; height: 40px; border-radius: 50%;" alt="Avatar">
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${formatDate(user.joinDate || new Date().toISOString())}</td>
                <td>${userOrders.length}</td>
                <td>฿${userTotal.toLocaleString()}</td>
                <td>
                    <button class="btn-action btn-view" onclick="viewUser('${user.email}')">ดู</button>
                    <button class="btn-action btn-delete" onclick="deleteUser('${user.email}')">ลบ</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Render Flash Sales
function renderFlashSales() {
    const grid = document.querySelector('.flashsales-grid');
    
    if (adminFlashSales.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #999;">ยังไม่มี Flash Sale</div>';
        return;
    }
    
    grid.innerHTML = adminFlashSales.map(sale => {
        const product = adminProducts.find(p => p.id === sale.productId && p.category === sale.category);
        if (!product) return '';
        
        const stockPercent = ((sale.stock - sale.sold) / sale.stock) * 100;
        const timeLeft = new Date(sale.endTime) - new Date();
        const isExpired = timeLeft <= 0;
        
        return `
            <div class="flashsale-card ${isExpired ? 'expired' : ''}">
                <div class="flashsale-badge">-${sale.discountPercent}%</div>
                <div class="flashsale-product">
                    <div class="flashsale-emoji">${product.emoji}</div>
                    <div class="flashsale-name">${product.name}</div>
                    <div class="flashsale-prices">
                        <span class="original-price">฿${sale.originalPrice}</span>
                        <span class="sale-price">฿${sale.salePrice}</span>
                    </div>
                    <div class="flashsale-stock">
                        <div class="stock-bar">
                            <div class="stock-bar-fill" style="width: ${stockPercent}%"></div>
                        </div>
                        <div class="stock-text">
                            <span>เหลือ ${sale.stock - sale.sold}</span>
                            <span>ขายแล้ว ${sale.sold}</span>
                        </div>
                    </div>
                    <div class="flashsale-status ${isExpired ? 'expired' : 'active'}">
                        ${isExpired ? '⏰ หมดเวลา' : '✅ กำลังดำเนินการ'}
                    </div>
                </div>
                <div class="flashsale-actions">
                    <button class="btn-action btn-edit" onclick="editFlashSale(${sale.id})">แก้ไข</button>
                    <button class="btn-action btn-delete" onclick="deleteFlashSale(${sale.id})">ลบ</button>
                </div>
            </div>
        `;
    }).join('');
}

// Render Reviews
function renderReviews(filterRating = 'all') {
    const list = document.querySelector('.reviews-list');
    
    // Flatten reviews
    const allReviews = [];
    Object.keys(adminReviews).forEach(productKey => {
        const [productId, category] = productKey.split('-');
        const product = adminProducts.find(p => p.id == productId && p.category === category);
        
        adminReviews[productKey].forEach(review => {
            allReviews.push({
                ...review,
                productName: product?.name || 'Unknown',
                productEmoji: product?.emoji || '❓'
            });
        });
    });
    
    // Filter by rating
    let filteredReviews = allReviews;
    if (filterRating !== 'all') {
        filteredReviews = allReviews.filter(review => review.rating === parseInt(filterRating));
    }
    
    // Sort by date
    filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (filteredReviews.length === 0) {
        list.innerHTML = '<div style="text-align: center; padding: 60px; color: #999;">ไม่พบรีวิว</div>';
        return;
    }
    
    list.innerHTML = filteredReviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="review-product">
                    <span style="font-size: 24px; margin-right: 10px;">${review.productEmoji}</span>
                    <span>${review.productName}</span>
                </div>
                <div class="review-rating">
                    ${'⭐'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </div>
            </div>
            <div class="review-author">
                <img src="${review.avatar}" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;" alt="Avatar">
                <div>
                    <div style="font-weight: 600;">${review.userName}</div>
                    <div style="font-size: 13px; color: #999;">${formatDate(review.date)}</div>
                </div>
            </div>
            <div class="review-content">
                <p>${review.comment}</p>
            </div>
            <div class="review-actions">
                <button class="btn-action btn-delete" onclick="deleteReview('${review.id}')">ลบรีวิว</button>
            </div>
        </div>
    `).join('');
}

// Render Settings
function renderSettings() {
    document.getElementById('settingShopName').value = adminSettings.shopName;
    document.getElementById('settingShopPhone').value = adminSettings.shopPhone;
    document.getElementById('settingShopEmail').value = adminSettings.shopEmail;
    document.getElementById('settingAutoAccept').checked = adminSettings.autoAcceptOrders;
    document.getElementById('settingNotifications').checked = adminSettings.enableNotifications;
}

// Save Settings
function saveSettings() {
    adminSettings = {
        shopName: document.getElementById('settingShopName').value,
        shopPhone: document.getElementById('settingShopPhone').value,
        shopEmail: document.getElementById('settingShopEmail').value,
        autoAcceptOrders: document.getElementById('settingAutoAccept').checked,
        enableNotifications: document.getElementById('settingNotifications').checked
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(adminSettings));
    alert('บันทึกการตั้งค่าสำเร็จ!');
}

// Show/Close Modals
function showAddProductModal() {
    document.getElementById('addProductModal').classList.add('show');
}

function showAddFlashSaleModal() {
    document.getElementById('addFlashSaleModal').classList.add('show');
}

function closeAdminModal() {
    document.querySelectorAll('.admin-modal').forEach(modal => {
        modal.classList.remove('show');
    });
}

// Add Product
function addProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const emoji = document.getElementById('productEmoji').value;
    
    // Get next ID for category
    const categoryProducts = adminProducts.filter(p => p.category === category);
    const nextId = categoryProducts.length > 0 
        ? Math.max(...categoryProducts.map(p => p.id)) + 1 
        : 1;
    
    const newProduct = {
        id: nextId,
        name: name,
        price: price,
        emoji: emoji,
        category: category,
        categoryName: getCategoryName(category)
    };
    
    adminProducts.push(newProduct);
    
    // Update data.js products
    if (typeof products !== 'undefined') {
        products[category].push({
            id: nextId,
            name: name,
            price: price,
            emoji: emoji
        });
    }
    
    closeAdminModal();
    renderProducts();
    alert('เพิ่มสินค้าสำเร็จ!');
}

// Add Flash Sale
function addFlashSale(e) {
    e.preventDefault();
    
    const productId = parseInt(document.getElementById('flashProductId').value);
    const category = document.getElementById('flashCategory').value;
    const discount = parseInt(document.getElementById('flashDiscount').value);
    const stock = parseInt(document.getElementById('flashStock').value);
    const hours = parseInt(document.getElementById('flashDuration').value);
    
    const product = adminProducts.find(p => p.id === productId && p.category === category);
    if (!product) {
        alert('ไม่พบสินค้า');
        return;
    }
    
    const salePrice = Math.round(product.price * (100 - discount) / 100);
    const now = new Date();
    const endTime = new Date(now.getTime() + hours * 60 * 60 * 1000);
    
    const newFlashSale = {
        id: adminFlashSales.length > 0 ? Math.max(...adminFlashSales.map(s => s.id)) + 1 : 1,
        productId: productId,
        category: category,
        discountPercent: discount,
        originalPrice: product.price,
        salePrice: salePrice,
        startTime: now.toISOString(),
        endTime: endTime.toISOString(),
        stock: stock,
        sold: 0
    };
    
    adminFlashSales.push(newFlashSale);
    localStorage.setItem('flashSales', JSON.stringify(adminFlashSales));
    
    closeAdminModal();
    switchAdminTab('flashsales');
    alert('สร้าง Flash Sale สำเร็จ!');
}

// Filter functions
function filterProducts() {
    const search = document.getElementById('productSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#productsTab table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
}

function filterOrders(status = 'all') {
    renderOrders(status);
}

function filterUsers() {
    const search = document.getElementById('userSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#usersTab table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
}

function filterReviews(rating = 'all') {
    renderReviews(rating);
}

// Helper functions
function getCategoryName(category) {
    const names = {
        'beverages': 'เครื่องดื่ม',
        'smoothies': 'น้ำปั่น',
        'snacks': 'ของกินรองท้อง',
        'meals': 'อาหาร',
        'desserts': 'ของหวาน'
    };
    return names[category] || category;
}

function getStatusText(status) {
    const texts = {
        'pending': 'รอดำเนินการ',
        'processing': 'กำลังจัดเตรียม',
        'completed': 'เสร็จสิ้น',
        'cancelled': 'ยกเลิก'
    };
    return texts[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Placeholder action functions
function editProduct(id, category) {
    alert('แก้ไขสินค้า ID: ' + id);
}

function deleteProduct(id, category) {
    if (confirm('ต้องการลบสินค้านี้?')) {
        alert('ลบสินค้า ID: ' + id);
    }
}

function viewOrder(id) {
    const order = adminOrders.find(o => o.id === id);
    if (order) {
        alert('รายการสั่งซื้อ #' + order.orderNumber + '\n\nลูกค้า: ' + order.customerName + '\nยอดรวม: ฿' + order.total.toLocaleString());
    }
}

function updateOrderStatus(id) {
    alert('อัพเดทสถานะคำสั่งซื้อ ID: ' + id);
}

function viewUser(email) {
    const user = adminUsers.find(u => u.email === email);
    if (user) {
        alert('ข้อมูลลูกค้า\n\nชื่อ: ' + user.name + '\nอีเมล: ' + user.email);
    }
}

function deleteUser(email) {
    if (confirm('ต้องการลบลูกค้านี้?')) {
        alert('ลบลูกค้า: ' + email);
    }
}

function editFlashSale(id) {
    alert('แก้ไข Flash Sale ID: ' + id);
}

function deleteFlashSale(id) {
    if (confirm('ต้องการลบ Flash Sale นี้?')) {
        adminFlashSales = adminFlashSales.filter(s => s.id !== id);
        localStorage.setItem('flashSales', JSON.stringify(adminFlashSales));
        renderFlashSales();
        alert('ลบ Flash Sale สำเร็จ!');
    }
}

function deleteReview(id) {
    if (confirm('ต้องการลบรีวิวนี้?')) {
        alert('ลบรีวิว ID: ' + id);
    }
}

function refreshData() {
    loadAdminData();
    switchAdminTab('dashboard');
    alert('รีเฟรชข้อมูลสำเร็จ!');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initAdmin);