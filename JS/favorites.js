// ========================================
// FAVORITES/WISHLIST SYSTEM - FIXED VERSION
// ========================================

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Toggle Favorite - FIXED: รับ event parameter และ stopPropagation
function toggleFavorite(productId, category, event) {
    // FIXED: Stop event propagation to prevent opening product detail modal
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    if (!currentUser) {
        showNotification('กรุณาเข้าสู่ระบบก่อนเพิ่มรายการโปรด', 'error', 'ต้องเข้าสู่ระบบ');
        setTimeout(() => showLogin(), 1500);
        return;
    }
    
    const favoriteKey = String(productId) + '-' + category;
    const index = favorites.indexOf(favoriteKey);
    
    if (index > -1) {
        // Remove from favorites
        favorites.splice(index, 1);
        showNotification('ลบออกจากรายการโปรดแล้ว', 'success', 'สำเร็จ');
    } else {
        // Add to favorites
        favorites.push(favoriteKey);
        showNotification('เพิ่มลงรายการโปรดแล้ว', 'success', 'สำเร็จ');
        
        // Animation effect
        if (typeof userSettings !== 'undefined' && userSettings.soundEffects && typeof playSound === 'function') {
            playSound('success');
        }
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteBadge();
    updateFavoriteIcons();
    
    // Refresh favorites modal if it's open
    const favModal = document.getElementById('favoritesModal');
    if (favModal && !favModal.classList.contains('hidden')) {
        setTimeout(() => {
            showFavorites();
        }, 100);
    }
}

// Check if product is favorite
function isFavorite(productId, category) {
    return favorites.includes(productId + '-' + category);
}

// Update Favorite Badge
function updateFavoriteBadge() {
    const badge = document.getElementById('favoritesCount');
    if (badge) {
        badge.textContent = favorites.length;
    }
}

// Update Favorite Icons in Product Cards
function updateFavoriteIcons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const productId = btn.dataset.productId;
        const category = btn.dataset.category;
        
        if (isFavorite(productId, category)) {
            btn.classList.add('active');
            btn.innerHTML = '❤️';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '🤍';
        }
    });
}

// Show Favorites Modal
function showFavorites() {
    if (!currentUser) {
        showNotification('กรุณาเข้าสู่ระบบ', 'error', 'ต้องเข้าสู่ระบบ');
        setTimeout(() => showLogin(), 1500);
        return;
    }
    
    const modal = document.getElementById('favoritesModal');
    const content = document.getElementById('favoritesContent');
    
    if (!modal || !content) return;
    
    if (favorites.length === 0) {
        content.innerHTML = '<div class="empty-favorites"><div class="empty-favorites-icon">💔</div><h3>ยังไม่มีรายการโปรด</h3><p>เพิ่มสินค้าที่คุณชอบเข้ามาได้เลย</p><button class="btn-modal-primary" onclick="closeModal(); document.getElementById(\'products\').scrollIntoView({behavior: \'smooth\'})">🛍️ เลือกสินค้า</button></div>';
    } else {
        // Get favorite products
        const allProducts = [
            ...products.beverages.map(p => ({...p, category: 'beverages'})),
            ...products.smoothies.map(p => ({...p, category: 'smoothies'})),
            ...products.snacks.map(p => ({...p, category: 'snacks'})),
            ...(products.meals || []).map(p => ({...p, category: 'meals'})),
            ...(products.desserts || []).map(p => ({...p, category: 'desserts'}))
        ];
        
        const favoriteProducts = favorites.map(fav => {
            const parts = fav.split('-');
            const productId = parts[0];
            const category = parts[1];
            return allProducts.find(p => p.id == productId && p.category === category);
        }).filter(Boolean);
        
        let html = '<div class="favorites-grid">';
        favoriteProducts.forEach(product => {
            html += '<div class="favorite-item">';
            // FIXED: เพิ่ม event parameter ในการเรียก toggleFavorite
            html += '<button class="btn-remove-favorite" onclick="toggleFavorite(' + product.id + ', \'' + product.category + '\', event)">✕</button>';
            html += '<div class="favorite-emoji">' + product.emoji + '</div>';
            html += '<div class="favorite-name">' + product.name + '</div>';
            html += '<div class="favorite-price">' + product.price.toLocaleString() + ' ฿</div>';
            html += '<button class="btn-add-to-cart-favorite" onclick="addToCart(' + product.id + ', \'' + product.category + '\'); showNotification(\'เพิ่มลงตะกร้าแล้ว\', \'success\')">🛒 เพิ่มลงตะกร้า</button>';
            html += '</div>';
        });
        html += '</div>';
        html += '<div class="favorites-actions">';
        html += '<button class="btn-modal-primary" onclick="addAllFavoritesToCart()">🛒 เพิ่มทั้งหมดลงตะกร้า</button>';
        html += '<button class="btn-settings-secondary" onclick="clearAllFavorites()">🗑️ ล้างรายการโปรด</button>';
        html += '</div>';
        
        content.innerHTML = html;
    }
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

// Add All Favorites to Cart
function addAllFavoritesToCart() {
    if (favorites.length === 0) return;
    
    const allProducts = [
        ...products.beverages.map(p => ({...p, category: 'beverages'})),
        ...products.smoothies.map(p => ({...p, category: 'smoothies'})),
        ...products.snacks.map(p => ({...p, category: 'snacks'})),
        ...(products.meals || []).map(p => ({...p, category: 'meals'})),
        ...(products.desserts || []).map(p => ({...p, category: 'desserts'}))
    ];
    
    let addedCount = 0;
    favorites.forEach(fav => {
        const parts = fav.split('-');
        const productId = parts[0];
        const category = parts[1];
        const product = allProducts.find(p => p.id == productId && p.category === category);
        if (product) {
            addToCart(parseInt(productId), category);
            addedCount++;
        }
    });
    
    closeModal();
    showNotification('เพิ่ม ' + addedCount + ' รายการลงตะกร้าแล้ว', 'success', 'สำเร็จ');
}

// Clear All Favorites
function clearAllFavorites() {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบรายการโปรดทั้งหมด?')) return;
    
    favorites = [];
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteBadge();
    updateFavoriteIcons();
    closeModal();
    showNotification('ลบรายการโปรดทั้งหมดแล้ว', 'success', 'สำเร็จ');
}

// Initialize Favorites
function initializeFavorites() {
    updateFavoriteBadge();
    updateFavoriteIcons();
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', initializeFavorites);