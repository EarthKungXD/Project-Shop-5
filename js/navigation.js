// ========================================
// PAGE NAVIGATION SYSTEM
// ========================================

// Navigate to Order Summary
function goToOrderSummary() {
    if (!currentUser) {
        showNotification('กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ', 'error', 'ต้องเข้าสู่ระบบ');
        return;
    }

    if (cart.length === 0) {
        showNotification('ตระกร้าสินค้าว่างเปล่า', 'error', 'ไม่มีสินค้า');
        return;
    }

    // Hide cart, show order summary
    document.getElementById('cartSection').classList.add('hidden');
    document.getElementById('orderSummarySection').classList.remove('hidden');
    
    // Render order summary
    renderOrderSummary();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to Payment Page
function goToPayment() {
    // Hide order summary, show payment
    document.getElementById('orderSummarySection').classList.add('hidden');
    document.getElementById('paymentSection').classList.remove('hidden');
    
    // Render payment info
    renderPaymentInfo();
    
    // Reset to card payment method
    switchPaymentMethod('card');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to Cart from Order Summary
function backToCart() {
    document.getElementById('orderSummarySection').classList.add('hidden');
    document.getElementById('cartSection').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to Order Summary from Payment
function backToOrderSummary() {
    document.getElementById('paymentSection').classList.add('hidden');
    document.getElementById('orderSummarySection').classList.remove('hidden');
    stopQRTimer(); // Stop timer if QR was active
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Order Summary
function renderOrderSummary() {
    // Customer Info
    document.getElementById('summaryCustomerName').textContent = currentUser.name;
    document.getElementById('summaryCustomerEmail').textContent = currentUser.email;
    
    // Order Items
    const summaryItems = document.getElementById('summaryItems');
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="summary-item-info">
                <span class="summary-item-emoji">${item.emoji}</span>
                <div class="summary-item-details">
                    <div class="summary-item-name">${item.name}</div>
                    <div class="summary-item-quantity">จำนวน: ${item.quantity}</div>
                </div>
            </div>
            <div class="summary-item-price">${(item.price * item.quantity).toLocaleString()} บาท</div>
        </div>
    `).join('');
    
    // Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('summarySubtotal').textContent = total.toLocaleString() + ' บาท';
    document.getElementById('summaryGrandTotal').textContent = total.toLocaleString() + ' บาท';
}

// Render Payment Info
function renderPaymentInfo() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    document.getElementById('sidebarAmount').textContent = total.toLocaleString() + ' บาท';
    document.getElementById('sidebarItemCount').textContent = itemCount + ' รายการ';
}
// ========================================
// PAGE NAVIGATION SYSTEM
// ========================================

// This file is kept for compatibility but main navigation
// is now handled in cart.js

// Back to Cart from Order Summary (if needed in future)
function backToCart() {
    backToShop();
}
