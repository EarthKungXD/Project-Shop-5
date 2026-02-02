// ========================================
// FLASH SALE SYSTEM WITH COUNTDOWN
// ========================================

let flashSales = JSON.parse(localStorage.getItem('flashSales')) || [];
let flashSaleTimers = {};

// Initialize Flash Sales (Admin would set these)
function initializeFlashSales() {
    // Example flash sales - in real app, these would come from backend
    const now = new Date();
    
    // If no flash sales, create some examples
    if (flashSales.length === 0) {
        flashSales = [
            {
                id: 1,
                productId: 1,
                category: 'smoothies',
                discountPercent: 30,
                originalPrice: 45,
                salePrice: 32,
                startTime: now.toISOString(),
                endTime: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
                stock: 50,
                sold: 0
            },
            {
                id: 2,
                productId: 3,
                category: 'snacks',
                discountPercent: 40,
                originalPrice: 40,
                salePrice: 24,
                startTime: now.toISOString(),
                endTime: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours
                stock: 30,
                sold: 0
            }
        ];
        
        localStorage.setItem('flashSales', JSON.stringify(flashSales));
    }
    
    displayFlashSales();
    startAllTimers();
}

// Display Flash Sales Section
function displayFlashSales() {
    const container = document.getElementById('flashSalesContainer');
    if (!container) return;
    
    const activeFlashSales = flashSales.filter(sale => {
        const now = new Date();
        const endTime = new Date(sale.endTime);
        return now < endTime && sale.sold < sale.stock;
    });
    
    if (activeFlashSales.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const allProducts = [
        ...products.beverages.map(p => ({...p, category: 'beverages'})),
        ...products.smoothies.map(p => ({...p, category: 'smoothies'})),
        ...products.snacks.map(p => ({...p, category: 'snacks'})),
        ...(products.meals || []).map(p => ({...p, category: 'meals'})),
        ...(products.desserts || []).map(p => ({...p, category: 'desserts'}))
    ];
    
    container.innerHTML = `
        <div class="flash-sale-header">
            <div class="flash-sale-title">
                <span class="flash-icon">⚡</span>
                <h2>Flash Sale!</h2>
                <span class="flash-subtitle">ลดแรง! จำนวนจำกัด</span>
            </div>
        </div>
        
        <div class="flash-sales-grid">
            ${activeFlashSales.map(sale => {
                const product = allProducts.find(p => p.id === sale.productId && p.category === sale.category);
                if (!product) return '';
                
                const stockPercent = ((sale.stock - sale.sold) / sale.stock) * 100;
                
                return `
                    <div class="flash-sale-card">
                        <div class="flash-sale-badge">-${sale.discountPercent}%</div>
                        <div class="flash-sale-timer" id="timer-${sale.id}">
                            <span class="timer-icon">⏰</span>
                            <span class="timer-text">กำลังโหลด...</span>
                        </div>
                        
                        <div class="flash-sale-product">
                            <div class="flash-sale-emoji">${product.emoji}</div>
                            <div class="flash-sale-name">${product.name}</div>
                            
                            <div class="flash-sale-prices">
                                <span class="original-price">${sale.originalPrice} ฿</span>
                                <span class="sale-price">${sale.salePrice} ฿</span>
                            </div>
                            
                            <div class="flash-sale-stock">
                                <div class="stock-bar">
                                    <div class="stock-bar-fill" style="width: ${stockPercent}%"></div>
                                </div>
                                <div class="stock-text">
                                    <span>เหลืออีก ${sale.stock - sale.sold} ชิ้น</span>
                                    <span>ขายแล้ว ${sale.sold}</span>
                                </div>
                            </div>
                            
                            <button class="btn-flash-sale" onclick="buyFlashSale(${sale.id})" ${stockPercent === 0 ? 'disabled' : ''}>
                                ${stockPercent === 0 ? '🚫 ขายหมดแล้ว' : '🛒 ซื้อเลย!'}
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Start All Timers
function startAllTimers() {
    const activeFlashSales = flashSales.filter(sale => {
        const now = new Date();
        const endTime = new Date(sale.endTime);
        return now < endTime;
    });
    
    activeFlashSales.forEach(sale => {
        startTimer(sale.id, sale.endTime);
    });
}

// Start Individual Timer
function startTimer(saleId, endTime) {
    // Clear existing timer if any
    if (flashSaleTimers[saleId]) {
        clearInterval(flashSaleTimers[saleId]);
    }
    
    flashSaleTimers[saleId] = setInterval(() => {
        const now = new Date();
        const end = new Date(endTime);
        const timeLeft = end - now;
        
        if (timeLeft <= 0) {
            clearInterval(flashSaleTimers[saleId]);
            displayFlashSales(); // Refresh display
            return;
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        const timerElement = document.getElementById(`timer-${saleId}`);
        if (timerElement) {
            timerElement.innerHTML = `
                <span class="timer-icon">⏰</span>
                <span class="timer-text">
                    <span class="timer-number">${hours.toString().padStart(2, '0')}</span>:
                    <span class="timer-number">${minutes.toString().padStart(2, '0')}</span>:
                    <span class="timer-number">${seconds.toString().padStart(2, '0')}</span>
                </span>
            `;
            
            // Warning color when less than 1 hour
            if (timeLeft < 60 * 60 * 1000) {
                timerElement.classList.add('timer-warning');
            }
            
            // Critical color when less than 5 minutes
            if (timeLeft < 5 * 60 * 1000) {
                timerElement.classList.add('timer-critical');
            }
        }
    }, 1000);
}

// Buy Flash Sale Item
function buyFlashSale(saleId) {
    if (!currentUser) {
        showNotification('กรุณาเข้าสู่ระบบก่อนซื้อสินค้า', 'error', 'ต้องเข้าสู่ระบบ');
        setTimeout(() => showLogin(), 1500);
        return;
    }
    
    const sale = flashSales.find(s => s.id === saleId);
    if (!sale) return;
    
    // Check if still available
    if (sale.sold >= sale.stock) {
        showNotification('ขายหมดแล้ว!', 'error', 'เสียใจด้วย');
        displayFlashSales();
        return;
    }
    
    // Check if time expired
    const now = new Date();
    const endTime = new Date(sale.endTime);
    if (now >= endTime) {
        showNotification('Flash Sale หมดเวลาแล้ว!', 'error', 'เสียใจด้วย');
        displayFlashSales();
        return;
    }
    
    // Update sold count
    sale.sold += 1;
    localStorage.setItem('flashSales', JSON.stringify(flashSales));
    
    // Add to cart with flash sale price
    const allProducts = [
        ...products.beverages.map(p => ({...p, category: 'beverages'})),
        ...products.smoothies.map(p => ({...p, category: 'smoothies'})),
        ...products.snacks.map(p => ({...p, category: 'snacks'})),
        ...(products.meals || []).map(p => ({...p, category: 'meals'})),
        ...(products.desserts || []).map(p => ({...p, category: 'desserts'}))
    ];
    
    const product = allProducts.find(p => p.id === sale.productId && p.category === sale.category);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === sale.productId && item.category === sale.category);
    if (existingItem) {
        existingItem.quantity++;
        existingItem.flashSale = true;
        existingItem.price = sale.salePrice;
    } else {
        cart.push({ 
            ...product, 
            quantity: 1, 
            category: sale.category,
            flashSale: true,
            price: sale.salePrice,
            originalPrice: sale.originalPrice,
            discountPercent: sale.discountPercent
        });
    }
    
    updateCartBadge();
    displayFlashSales();
    
    showNotification(`เพิ่ม ${product.name} ลงตะกร้าในราคา ${sale.salePrice} ฿ (ลด ${sale.discountPercent}%)`, 'success', '🎉 Flash Sale!');
    
    // Celebration effect
    if (userSettings.soundEffects) {
        playSound('success');
    }
}

// Add Flash Sale Notification Banner
function showFlashSaleNotification() {
    const banner = document.createElement('div');
    banner.className = 'flash-sale-notification';
    banner.innerHTML = `
        <div class="flash-notification-content">
            <span class="flash-notification-icon">⚡</span>
            <span class="flash-notification-text">Flash Sale กำลังจัดโปรโมชั่น! คลิกเพื่อดู</span>
            <button class="flash-notification-btn" onclick="scrollToFlashSale()">ดูเลย →</button>
            <button class="flash-notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    setTimeout(() => {
        banner.classList.add('show');
    }, 100);
}

// Scroll to Flash Sale Section
function scrollToFlashSale() {
    const container = document.getElementById('flashSalesContainer');
    if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove notification
        document.querySelector('.flash-sale-notification')?.remove();
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initializeFlashSales();
    
    // Show notification if there are active flash sales
    const activeFlashSales = flashSales.filter(sale => {
        const now = new Date();
        const endTime = new Date(sale.endTime);
        return now < endTime && sale.sold < sale.stock;
    });
    
    if (activeFlashSales.length > 0) {
        setTimeout(() => {
            showFlashSaleNotification();
        }, 2000); // Show after 2 seconds
    }
});