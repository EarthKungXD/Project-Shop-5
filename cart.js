// ========================================
// SHOPPING CART SYSTEM - FULLY FIXED VERSION
// ========================================

let cart = [];

// Load cart from localStorage on init
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log('🛒 Cart loaded from localStorage:', cart.length, 'items');
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
}

// Save cart to localStorage - FIXED: Always save after any cart change
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('💾 Cart saved to localStorage:', cart.length, 'items');
    } catch (e) {
        console.error('Error saving cart:', e);
    }
}

// Add Item to Cart - FIXED: Save to localStorage
function addToCart(productId, category = null) {
    if (!currentUser) {
        showNotification('กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ', 'error', 'ต้องเข้าสู่ระบบ');
        setTimeout(() => showLogin(), 1500);
        return;
    }

    // Get all products from all categories
    const allProducts = [
        ...products.beverages.map(p => ({...p, originalCategory: 'beverages'})),
        ...products.smoothies.map(p => ({...p, originalCategory: 'smoothies'})),
        ...products.snacks.map(p => ({...p, originalCategory: 'snacks'})),
        ...(products.meals || []).map(p => ({...p, originalCategory: 'meals'})),
        ...(products.desserts || []).map(p => ({...p, originalCategory: 'desserts'}))
    ];
    
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
        showNotification('ไม่พบสินค้า', 'error', 'ข้อผิดพลาด');
        return;
    }
    
    // Use provided category or product's original category
    const itemCategory = category || product.originalCategory;
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId && item.category === itemCategory);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ 
            ...product, 
            quantity: 1, 
            category: itemCategory 
        });
    }
    
    saveCart(); // FIXED: Save to localStorage
    updateCartBadge();
    
    if (typeof showNotification === 'function') {
        showNotification(`เพิ่ม ${product.name} ลงตะกร้าแล้ว`, 'success', 'เรียบร้อย');
    }
    
    // Play sound if enabled
    if (typeof userSettings !== 'undefined' && userSettings.soundEffects && typeof playSound === 'function') {
        playSound('success');
    }
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
    // Hide products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.style.display = 'none';
    }
    
    // Show cart section
    const cartSection = document.getElementById('cartSection');
    if (cartSection) {
        cartSection.classList.remove('hidden');
    }
    
    // Hide success message
    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        successMsg.classList.add('hidden');
    }
    
    // Render cart
    renderCart();
    
    // Scroll to cart section smoothly
    setTimeout(() => {
        if (cartSection) {
            cartSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 100);
}

// Back to Shop
function backToShop() {
    const productsSection = document.getElementById('products');
    const cartSection = document.getElementById('cartSection');
    
    if (productsSection) {
        productsSection.style.display = 'block';
    }
    
    if (cartSection) {
        cartSection.classList.add('hidden');
    }
    
    // Scroll to products section
    setTimeout(() => {
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
    
    // Save cart to localStorage for checkout page
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Render Cart Items
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>🛒 ตระกร้าว่างเปล่า</h3>
                <p>เพิ่มสินค้าลงตะกร้าเพื่อเริ่มสั่งซื้อ</p>
            </div>`;
        
        if (cartTotal) {
            cartTotal.classList.add('hidden');
        }
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
    const totalAmountEl = document.getElementById('totalAmount');
    if (totalAmountEl) {
        totalAmountEl.textContent = total.toLocaleString() + ' บาท';
    }
    
    if (cartTotal) {
        cartTotal.classList.remove('hidden');
    }
}

// Update Item Quantity - FIXED: Save to localStorage
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(); // FIXED: Save to localStorage
            updateCartBadge();
            renderCart();
        }
    }
}

// Remove Item from Cart - FIXED: Save to localStorage
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart(); // FIXED: Save to localStorage
    updateCartBadge();
    renderCart();
    
    if (typeof showNotification === 'function') {
        showNotification('ลบสินค้าออกจากตะกร้าแล้ว', 'success', 'สำเร็จ');
    }
}

// Clear entire cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartBadge();
    renderCart();
}

// Initialize cart
function initCart() {
    loadCart();
    updateCartBadge();
    console.log('🛒 Cart system initialized');
}

// Auto-initialize cart when DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
} else {
    initCart();
}