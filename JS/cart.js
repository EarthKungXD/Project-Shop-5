// ========================================
// SHOPPING CART SYSTEM - FIXED VERSION
// ========================================

let cart = [];

// Load cart from localStorage on init
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add Item to Cart
function addToCart(productId, category = null) {
    if (!currentUser) {
        showNotification('กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ', 'error', 'ต้องเข้าสู่ระบบ');
        setTimeout(() => showLogin(), 1500);
        return;
    }

    // Get all products from all categories
    const allProducts = [
        ...products.beverages,
        ...products.smoothies,
        ...products.snacks,
        ...(products.meals || []),
        ...(products.desserts || [])
    ];
    
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
        showNotification('ไม่พบสินค้า', 'error', 'ข้อผิดพลาด');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId && item.category === category);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1, category: category });
    }
    
    saveCart(); // FIXED: บันทึกลง localStorage
    updateCartBadge();
    showNotification(`เพิ่ม ${product.name} ลงตระกร้าแล้ว`, 'success', 'เรียบร้อย');
}

// Update Cart Badge - FIXED VERSION
function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = totalItems;
    }
}

// Show Cart Page
function showCart() {
    document.getElementById('products').style.display = 'none';
    document.getElementById('cartSection').classList.remove('hidden');
    document.getElementById('successMessage').classList.add('hidden');
    
    // Scroll to cart section smoothly
    setTimeout(() => {
        const cartSection = document.getElementById('cartSection');
        if (cartSection) {
            cartSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 100);
    
    renderCart();
}

// Back to Shop
function backToShop() {
    document.getElementById('products').style.display = 'block';
    document.getElementById('cartSection').classList.add('hidden');
    
    // Scroll to products section
    setTimeout(() => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 100);
}

// Go to Checkout Page
function goToOrderSummary() {
    // Check login
    if (!currentUser) {
        showNotification('กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ', 'error', 'ต้องเข้าสู่ระบบ');
        setTimeout(() => showLogin(), 1500);
        return;
    }

    // Check cart
    if (!cart || cart.length === 0) {
        showNotification('ตระกร้าสินค้าว่างเปล่า', 'error', 'ไม่มีสินค้า');
        return;
    }
    
    // Save cart to localStorage
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Render Cart Items
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><h3>🛒 ตระกร้าว่างเปล่า</h3><p>เพิ่มสินค้าลงตระกร้าเพื่อเริ่มสั่งซื้อ</p></div>';
        document.getElementById('cartTotal').classList.add('hidden');
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h3>${item.emoji} ${item.name}</h3>
                <div class="product-price">${item.price.toLocaleString()} บาท</div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span style="margin: 0 15px; font-weight: bold; font-size: 20px;">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️ ลบ</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalAmount').textContent = total.toLocaleString() + ' บาท';
    document.getElementById('cartTotal').classList.remove('hidden');
}

// Update Item Quantity
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(); // FIXED: บันทึกลง localStorage
            updateCartBadge();
            renderCart();
        }
    }
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart(); // FIXED: บันทึกลง localStorage
    updateCartBadge();
    renderCart();
}

// FIXED: เพิ่มฟังก์ชัน init ตะกร้า
function initCart() {
    loadCart();
    updateCartBadge();
}

// Auto-initialize cart when DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
} else {
    initCart();
}