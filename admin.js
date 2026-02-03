// ========================================
// ADMIN PANEL SYSTEM - FULLY FIXED & IMPROVED
// ========================================

// Admin authentication
let adminUser = JSON.parse(localStorage.getItem('adminUser')) || null;
let adminProducts = [];
let adminOrders = [];
let adminUsers = [];
let adminFlashSales = [];
let adminReviews = {};
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
    const adminNameEl = document.querySelector('.admin-name');
    if (adminNameEl) {
        adminNameEl.textContent = adminUser.name;
    }
    
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
                        <input type="text" id="adminUsername" placeholder="admin" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 30px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Password</label>
                        <input type="password" id="adminPassword" placeholder="••••••••" required style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px; box-sizing: border-box;">
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

// Load admin data - FIXED
function loadAdminData() {
    // Load users
    adminUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Load order history
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};
    
    // Convert order history to flat array
    adminOrders = [];
    let orderId = 1;
    Object.keys(orderHistory).forEach(email => {
        const user = adminUsers.find(u => u.email === email);
        orderHistory[email].forEach(order => {
            adminOrders.push({
                id: orderId++,
                orderNumber: order.id,
                customerEmail: email,
                customerName: user?.name || 'Unknown',
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
    
    // Load flash sales
    adminFlashSales = JSON.parse(localStorage.getItem('flashSales')) || [];
    
    // Load reviews
    adminReviews = JSON.parse(localStorage.getItem('productReviews')) || {};
    
    console.log('📊 Admin Data Loaded:', {
        products: adminProducts.length,
        orders: adminOrders.length,
        users: adminUsers.length,
        flashSales: adminFlashSales.length
    });
}

// Switch admin tab - FIXED
function switchAdminTab(tabName) {
    // Update sidebar navigation
    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[onclick*="switchAdminTab('${tabName}')"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'products': 'จัดการสินค้า',
        'orders': 'คำสั่งซื้อ',
        'users': 'ลูกค้า',
        'flashsales': 'Flash Sale',
        'reviews': 'รีวิว',
        'settings': 'ตั้งค่า'
    };
    
    const titleEl = document.getElementById('adminPageTitle');
    if (titleEl) {
        titleEl.textContent = titles[tabName] || tabName;
    }
    
    // Hide all tabs
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
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
            renderProductsTable();
            break;
        case 'orders':
            renderOrdersTable();
            break;
        case 'users':
            renderUsersTable();
            break;
        case 'flashsales':
            renderFlashSalesGrid();
            break;
        case 'reviews':
            renderReviewsList();
            break;
        case 'settings':
            renderSettingsForm();
            break;
    }
}

// Render Dashboard - FIXED
function renderDashboard() {
    // Calculate today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrders = adminOrders.filter(order => {
        const orderDate = new Date(order.date);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
    });
    
    const todaySales = todayOrders.reduce((sum, order) => sum + order.total, 0);
    const totalRevenue = adminOrders.reduce((sum, order) => sum + order.total, 0);
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
    
    // Update stat cards
    const updates = {
        'todaySales': '฿' + todaySales.toLocaleString(),
        'todayOrders': todayOrders.length,
        'totalCustomers': totalCustomers,
        'avgRating': avgRating + ' ⭐'
    };
    
    Object.keys(updates).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = updates[id];
    });
    
    // Render top products
    renderTopProducts();
    
    // Render recent orders
    renderRecentOrders();
}

// Render Top Products
function renderTopProducts() {
    const productSales = {};
    
    adminOrders.forEach(order => {
        order.items.forEach(item => {
            const key = item.name;
            if (!productSales[key]) {
                productSales[key] = { 
                    name: item.name, 
                    emoji: item.emoji, 
                    quantity: 0, 
                    revenue: 0 
                };
            }
            productSales[key].quantity += item.quantity;
            productSales[key].revenue += item.price * item.quantity;
        });
    });
    
    const topProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);
    
    const container = document.getElementById('topProducts');
    if (!container) return;
    
    if (topProducts.length === 0) {
        container.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">ยังไม่มีข้อมูลการขาย</div>';
        return;
    }
    
    container.innerHTML = topProducts.map((product, index) => `
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
}

// Render Recent Orders
function renderRecentOrders() {
    const recentOrders = [...adminOrders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    
    const container = document.getElementById('recentOrders');
    if (!container) return;
    
    if (recentOrders.length === 0) {
        container.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">ยังไม่มีคำสั่งซื้อ</div>';
        return;
    }
    
    container.innerHTML = recentOrders.map(order => `
        <div class="recent-order-item">
            <div class="order-info">
                <div class="order-number">#${order.orderNumber}</div>
                <div class="order-customer">${order.customerName}</div>
                <div class="order-date">${formatDate(order.date)}</div>
            </div>
            <div class="order-amount">฿${order.total.toLocaleString()}</div>
            <span class="status-badge ${order.status}">${getStatusText(order.status)}</span>
        </div>
    `).join('');
}

// Render Products Table - FIXED
function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    
    if (adminProducts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #999;">ไม่มีสินค้า</td></tr>';
        return;
    }
    
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

// Render Orders Table - FIXED
function renderOrdersTable(filterStatus = 'all') {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;
    
    let filteredOrders = adminOrders;
    if (filterStatus !== 'all') {
        filteredOrders = adminOrders.filter(order => order.status === filterStatus);
    }
    
    if (filteredOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #999;">ไม่มีคำสั่งซื้อ</td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredOrders
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(order => `
        <tr>
            <td>#${order.orderNumber}</td>
            <td>${order.customerName}</td>
            <td>${formatDate(order.date)}</td>
            <td>฿${order.total.toLocaleString()}</td>
            <td><span class="status-badge ${order.status}">${getStatusText(order.status)}</span></td>
            <td>
                <button class="btn-action btn-view" onclick="viewOrder(${order.id})">ดู</button>
                <button class="btn-action btn-edit" onclick="updateOrderStatus(${order.id})">อัพเดท</button>
            </td>
        </tr>
    `).join('');
}

// Render Users Table - FIXED
function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    if (adminUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #999;">ไม่มีลูกค้า</td></tr>';
        return;
    }
    
    tbody.innerHTML = adminUsers.map(user => {
        const userOrders = adminOrders.filter(order => order.customerEmail === user.email);
        const userTotal = userOrders.reduce((sum, order) => sum + order.total, 0);
        
        return `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user.email}" 
                             style="width: 40px; height: 40px; border-radius: 50%;" alt="Avatar">
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

// Render Flash Sales Grid - FIXED
function renderFlashSalesGrid() {
    const grid = document.getElementById('flashSalesGrid');
    if (!grid) return;
    
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

// Render Reviews List - FIXED
function renderReviewsList(filterRating = 'all') {
    const list = document.getElementById('reviewsList');
    if (!list) return;
    
    // Flatten reviews
    const allReviews = [];
    Object.keys(adminReviews).forEach(productKey => {
        const [productId, category] = productKey.split('-');
        const product = adminProducts.find(p => p.id == productId && p.category === category);
        
        adminReviews[productKey].forEach(review => {
            allReviews.push({
                ...review,
                productName: product?.name || 'Unknown',
                productEmoji: product?.emoji || '❓',
                productKey: productKey
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
                <button class="btn-action btn-delete" onclick="deleteReview('${review.productKey}', '${review.id}')">ลบรีวิว</button>
            </div>
        </div>
    `).join('');
}

// Render Settings Form - FIXED
function renderSettingsForm() {
    const updates = {
        'shopName': adminSettings.shopName,
        'shopPhone': adminSettings.shopPhone,
        'shopEmail': adminSettings.shopEmail,
        'enableNotifications': adminSettings.enableNotifications,
        'enableAutoAccept': adminSettings.autoAcceptOrders
    };
    
    Object.keys(updates).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (el.type === 'checkbox') {
                el.checked = updates[id];
            } else {
                el.value = updates[id];
            }
        }
    });
}

// Show/Close Modals - FIXED
function showAddProductModal() {
    const modal = document.getElementById('addProductModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
}

function showAddFlashSaleModal() {
    // Populate product dropdown
    const select = document.getElementById('flashSaleProduct');
    if (select && adminProducts.length > 0) {
        select.innerHTML = adminProducts.map(p => 
            `<option value="${p.id}-${p.category}">${p.emoji} ${p.name} (${p.categoryName})</option>`
        ).join('');
    }
    
    const modal = document.getElementById('addFlashSaleModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
}

function closeAdminModal() {
    const modals = ['addProductModal', 'addFlashSaleModal'];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    });
}

// Add Product - FIXED
function addProduct(e) {
    e.preventDefault();
    
    const name = document.getElementById('newProductName').value;
    const category = document.getElementById('newProductCategory').value;
    const price = parseFloat(document.getElementById('newProductPrice').value);
    const emoji = document.getElementById('newProductEmoji').value;
    
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
    renderProductsTable();
    alert('เพิ่มสินค้าสำเร็จ!');
    
    // Clear form
    document.getElementById('addProductForm').reset();
}

// Add Flash Sale - FIXED
function addFlashSale(e) {
    e.preventDefault();
    
    const productSelect = document.getElementById('flashSaleProduct').value;
    const [productId, category] = productSelect.split('-');
    const discount = parseInt(document.getElementById('flashSaleDiscount').value);
    const stock = parseInt(document.getElementById('flashSaleStock').value);
    const hours = parseInt(document.getElementById('flashSaleDuration').value);
    
    const product = adminProducts.find(p => p.id == productId && p.category === category);
    if (!product) {
        alert('ไม่พบสินค้า');
        return;
    }
    
    const salePrice = Math.round(product.price * (100 - discount) / 100);
    const now = new Date();
    const endTime = new Date(now.getTime() + hours * 60 * 60 * 1000);
    
    const newFlashSale = {
        id: adminFlashSales.length > 0 ? Math.max(...adminFlashSales.map(s => s.id)) + 1 : 1,
        productId: product.id,
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
    
    // Clear form
    document.getElementById('addFlashSaleForm').reset();
}

// Save Settings - FIXED
function saveSettings() {
    adminSettings = {
        shopName: document.getElementById('shopName').value,
        shopPhone: document.getElementById('shopPhone').value,
        shopEmail: document.getElementById('shopEmail').value,
        autoAcceptOrders: document.getElementById('enableAutoAccept').checked,
        enableNotifications: document.getElementById('enableNotifications').checked
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(adminSettings));
    alert('บันทึกการตั้งค่าสำเร็จ!');
}

// Filter functions
function filterProducts() {
    const search = document.getElementById('productSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#productsTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
}

function filterOrders() {
    const status = document.getElementById('orderStatusFilter').value;
    renderOrdersTable(status);
}

function filterUsers() {
    const search = document.getElementById('userSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#usersTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
}

function filterReviews() {
    const rating = document.getElementById('reviewFilter').value;
    renderReviewsList(rating);
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
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Action functions - IMPROVED
function editProduct(id, category) {
    const product = adminProducts.find(p => p.id === id && p.category === category);
    if (product) {
        const newPrice = prompt(`แก้ไขราคา ${product.name}:`, product.price);
        if (newPrice !== null && !isNaN(newPrice) && newPrice > 0) {
            product.price = parseFloat(newPrice);
            
            // Update in data.js
            if (typeof products !== 'undefined') {
                const dataProduct = products[category].find(p => p.id === id);
                if (dataProduct) {
                    dataProduct.price = parseFloat(newPrice);
                }
            }
            
            renderProductsTable();
            alert('อัพเดทราคาสำเร็จ!');
        }
    }
}

function deleteProduct(id, category) {
    if (confirm('ต้องการลบสินค้านี้?')) {
        adminProducts = adminProducts.filter(p => !(p.id === id && p.category === category));
        
        // Update in data.js
        if (typeof products !== 'undefined') {
            products[category] = products[category].filter(p => p.id !== id);
        }
        
        renderProductsTable();
        alert('ลบสินค้าสำเร็จ!');
    }
}

function viewOrder(id) {
    const order = adminOrders.find(o => o.id === id);
    if (order) {
        const items = order.items.map(item => 
            `${item.emoji} ${item.name} x${item.quantity} = ฿${(item.price * item.quantity).toLocaleString()}`
        ).join('\n');
        
        alert(
            `คำสั่งซื้อ #${order.orderNumber}\n\n` +
            `ลูกค้า: ${order.customerName}\n` +
            `วันที่: ${formatDate(order.date)}\n` +
            `สถานะ: ${getStatusText(order.status)}\n` +
            `วิธีชำระเงิน: ${order.paymentMethod}\n\n` +
            `รายการสินค้า:\n${items}\n\n` +
            `ยอดรวม: ฿${order.total.toLocaleString()}`
        );
    }
}

function updateOrderStatus(id) {
    const order = adminOrders.find(o => o.id === id);
    if (order) {
        const statuses = ['pending', 'processing', 'completed', 'cancelled'];
        const statusNames = ['รอดำเนินการ', 'กำลังจัดเตรียม', 'เสร็จสิ้น', 'ยกเลิก'];
        
        const choice = prompt(
            `เลือกสถานะใหม่สำหรับคำสั่งซื้อ #${order.orderNumber}:\n\n` +
            statuses.map((s, i) => `${i + 1}. ${statusNames[i]}`).join('\n')
        );
        
        const index = parseInt(choice) - 1;
        if (index >= 0 && index < statuses.length) {
            order.status = statuses[index];
            
            // Update in localStorage
            const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};
            if (orderHistory[order.customerEmail]) {
                const userOrder = orderHistory[order.customerEmail].find(o => o.id === order.orderNumber);
                if (userOrder) {
                    userOrder.status = statuses[index];
                    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
                }
            }
            
            renderOrdersTable();
            alert('อัพเดทสถานะสำเร็จ!');
        }
    }
}

function viewUser(email) {
    const user = adminUsers.find(u => u.email === email);
    if (user) {
        const userOrders = adminOrders.filter(o => o.customerEmail === email);
        const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
        
        alert(
            `ข้อมูลลูกค้า\n\n` +
            `ชื่อ: ${user.name}\n` +
            `อีเมล: ${user.email}\n` +
            `สมัครเมื่อ: ${formatDate(user.joinDate)}\n` +
            `จำนวนคำสั่งซื้อ: ${userOrders.length}\n` +
            `ยอดรวมทั้งหมด: ฿${totalSpent.toLocaleString()}`
        );
    }
}

function deleteUser(email) {
    if (confirm('ต้องการลบลูกค้านี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
        // Remove from users
        adminUsers = adminUsers.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(adminUsers));
        
        // Remove orders
        adminOrders = adminOrders.filter(o => o.customerEmail !== email);
        
        // Remove from order history
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};
        delete orderHistory[email];
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        
        renderUsersTable();
        alert('ลบลูกค้าสำเร็จ!');
    }
}

function editFlashSale(id) {
    const sale = adminFlashSales.find(s => s.id === id);
    if (sale) {
        const newStock = prompt(`เพิ่มสต็อก Flash Sale (ปัจจุบัน: ${sale.stock - sale.sold} ชิ้น):`, 10);
        if (newStock !== null && !isNaN(newStock) && newStock > 0) {
            sale.stock += parseInt(newStock);
            localStorage.setItem('flashSales', JSON.stringify(adminFlashSales));
            renderFlashSalesGrid();
            alert('อัพเดท Flash Sale สำเร็จ!');
        }
    }
}

function deleteFlashSale(id) {
    if (confirm('ต้องการลบ Flash Sale นี้?')) {
        adminFlashSales = adminFlashSales.filter(s => s.id !== id);
        localStorage.setItem('flashSales', JSON.stringify(adminFlashSales));
        renderFlashSalesGrid();
        alert('ลบ Flash Sale สำเร็จ!');
    }
}

function deleteReview(productKey, reviewId) {
    if (confirm('ต้องการลบรีวิวนี้?')) {
        if (adminReviews[productKey]) {
            adminReviews[productKey] = adminReviews[productKey].filter(r => r.id !== reviewId);
            
            // Remove key if no reviews left
            if (adminReviews[productKey].length === 0) {
                delete adminReviews[productKey];
            }
            
            localStorage.setItem('productReviews', JSON.stringify(adminReviews));
            renderReviewsList();
            alert('ลบรีวิวสำเร็จ!');
        }
    }
}

function refreshData() {
    loadAdminData();
    switchAdminTab('dashboard');
    alert('รีเฟรชข้อมูลสำเร็จ!');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initAdmin);