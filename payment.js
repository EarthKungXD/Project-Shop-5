// ========================================
// PAYMENT SYSTEM
// ========================================

let currentPaymentMethod = 'card';
let qrTimer = null;
let qrTimeRemaining = 600; // 10 minutes in seconds

// Show Checkout Modal
function checkout() {
    if (!currentUser) {
        showNotification('กรุณาเข้าสู่ระบบก่อนทำการชำระเงิน', 'error', 'ต้องเข้าสู่ระบบ');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('paymentTotal').textContent = total.toLocaleString();
    document.getElementById('paymentModal').style.display = 'flex';
    
    // Reset to card payment method
    switchPaymentMethod('card');
}

// Switch Payment Method
function switchPaymentMethod(method) {
    currentPaymentMethod = method;
    
    // Update tab states
    const tabs = document.querySelectorAll('.payment-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event?.target.closest('.payment-tab')?.classList.add('active') || 
    document.querySelector(`.payment-tab:nth-child(${method === 'card' ? 1 : 2})`).classList.add('active');
    
    // Show/hide payment sections
    const cardForm = document.getElementById('cardPaymentForm');
    const qrSection = document.getElementById('qrPaymentSection');
    
    if (method === 'card') {
        cardForm.classList.remove('hidden');
        qrSection.classList.add('hidden');
        stopQRTimer();
    } else {
        cardForm.classList.add('hidden');
        qrSection.classList.remove('hidden');
        generateQRCode();
        startQRTimer();
    }
}

// Generate QR Code
function generateQRCode() {
    const canvas = document.getElementById('qrCodeCanvas');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Clear existing QR code
    canvas.innerHTML = '';
    
    // Create PromptPay QR Code data
    const promptpayId = '0123456789012';
    const amount = total.toFixed(2);
    const qrData = `00020101021230820016A000000677010112${promptpayId}5303764540${amount.length}${amount}5802TH5909FreshSip6304`;
    
    // Check if QRious is loaded
    if (typeof QRious !== 'undefined') {
        // Use QRious library
        const qr = new QRious({
            element: canvas,
            value: qrData,
            size: 200,
            level: 'M'
        });
    } else if (typeof QRCode !== 'undefined') {
        // Fallback to QRCode.js
        const qr = new QRCode(canvas, {
            text: qrData,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    } else {
        // Fallback: Show text if no library loaded
        canvas.innerHTML = '<div style="width:200px;height:200px;display:flex;align-items:center;justify-content:center;background:#f0f0f0;border-radius:12px;"><p style="text-align:center;padding:20px;">กำลังโหลด QR Code...<br>กรุณารอสักครู่</p></div>';
        
        // Retry after 1 second
        setTimeout(() => {
            if (typeof QRious !== 'undefined' || typeof QRCode !== 'undefined') {
                generateQRCode();
            }
        }, 1000);
    }
    
    // Update amount display
    document.getElementById('qrAmount').textContent = `฿${total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

// Start QR Timer
function startQRTimer() {
    qrTimeRemaining = 600; // Reset to 10 minutes
    updateTimerDisplay();
    
    qrTimer = setInterval(() => {
        qrTimeRemaining--;
        updateTimerDisplay();
        
        if (qrTimeRemaining <= 0) {
            stopQRTimer();
            showNotification('QR Code หมดอายุแล้ว กรุณาสร้างใหม่', 'error', 'หมดเวลา');
        }
    }, 1000);
}

// Stop QR Timer
function stopQRTimer() {
    if (qrTimer) {
        clearInterval(qrTimer);
        qrTimer = null;
    }
}

// Update Timer Display with Circular Progress
function updateTimerDisplay() {
    const minutes = Math.floor(qrTimeRemaining / 60);
    const seconds = qrTimeRemaining % 60;
    const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const timerEl = document.getElementById('qrTimer');
    if (timerEl) {
        timerEl.textContent = display;
    }
    
    // Update circular progress
    const circle = document.getElementById('timerCircle');
    if (circle) {
        const totalTime = 600; // 10 minutes
        const progress = qrTimeRemaining / totalTime;
        const circumference = 163.36; // 2 * PI * radius (26)
        const offset = circumference * (1 - progress);
        
        circle.style.strokeDashoffset = offset;
        
        // Change color when time is running out
        if (qrTimeRemaining <= 60) {
            circle.style.stroke = '#ff4757';
            if (timerEl) timerEl.style.color = '#ff4757';
        } else if (qrTimeRemaining <= 180) {
            circle.style.stroke = '#FFE66D';
            if (timerEl) timerEl.style.color = '#FFE66D';
        }
    }
}

// Refresh QR Code
function refreshQRCode() {
    const canvas = document.getElementById('qrCodeCanvas');
    canvas.innerHTML = '';
    generateQRCode();
    startQRTimer();
    showNotification('สร้าง QR Code ใหม่เรียบร้อย', 'success', 'สำเร็จ');
}

// Verify QR Payment
function verifyQRPayment() {
    // Simulate payment verification
    showNotification('กำลังตรวจสอบการชำระเงิน...', 'info', 'กรุณารอสักครู่');
    
    setTimeout(() => {
        // Simulate successful payment (80% success rate for demo)
        const isSuccess = Math.random() > 0.2;
        
        if (isSuccess) {
            stopQRTimer();
            closeModal();
            closeNotification();
            
            // Save order to history
            saveOrderToHistory();
            
            setTimeout(() => {
                const successMsg = document.getElementById('successMessage');
                successMsg.textContent = '✅ ชำระเงินสำเร็จ! ขอบคุณที่ใช้บริการ 🎉';
                successMsg.classList.remove('hidden');
                
                cart = [];
                updateCartBadge();
                renderCart();
                
                setTimeout(() => {
                    backToShop();
                }, 3000);
            }, 500);
        } else {
            showNotification('ยังไม่พบการชำระเงิน กรุณาลองอีกครั้ง', 'error', 'ไม่พบการชำระเงิน');
        }
    }, 2000);
}

// Process Card Payment
function processPayment(e) {
    e.preventDefault();
    
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        showNotification('กรุณากรอกหมายเลขบัตรให้ถูกต้อง (16 หลัก)', 'error', 'ข้อมูลไม่ถูกต้อง');
        return;
    }

    // Validate CVV
    const cvv = document.getElementById('cardCVV').value;
    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
        showNotification('กรุณากรอก CVV ให้ถูกต้อง (3 หลัก)', 'error', 'ข้อมูลไม่ถูกต้อง');
        return;
    }

    // Validate Expiry Date
    const expiry = document.getElementById('cardExpiry').value;
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        showNotification('กรุณากรอกวันหมดอายุให้ถูกต้อง (MM/YY)', 'error', 'ข้อมูลไม่ถูกต้อง');
        return;
    }

    showNotification('กำลังดำเนินการชำระเงิน...', 'info', 'กรุณารอสักครู่');
    
    setTimeout(() => {
        closeModal();
        closeNotification();
        
        // Save order to history
        saveOrderToHistory();
        
        setTimeout(() => {
            const successMsg = document.getElementById('successMessage');
            successMsg.textContent = '✅ ชำระเงินสำเร็จ! ขอบคุณที่ใช้บริการ 🎉';
            successMsg.classList.remove('hidden');
            
            cart = [];
            updateCartBadge();
            renderCart();
            
            setTimeout(() => {
                backToShop();
            }, 3000);
        }, 500);
    }, 2000);
}

// Save Order to History
function saveOrderToHistory() {
    if (currentUser && cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const order = {
            id: Date.now().toString().slice(-8),
            date: new Date().toISOString(),
            items: [...cart],
            total: total,
            paymentMethod: currentPaymentMethod === 'card' ? 'บัตรเครดิต/เดบิต' : 'QR Code'
        };
        
        // Get order history
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};
        if (!orderHistory[currentUser.email]) {
            orderHistory[currentUser.email] = [];
        }
        
        orderHistory[currentUser.email].push(order);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }
}

// Format Card Number Input
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            value = value.replace(/\D/g, '');
            e.target.value = value;
        });
    }

    // Format Expiry Date
    const expiryInput = document.getElementById('cardExpiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // Format CVV
    const cvvInput = document.getElementById('cardCVV');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        });
    }
});