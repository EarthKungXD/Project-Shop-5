// ========================================
// CHECKOUT PAGE FUNCTIONALITY
// ========================================

let cart = [];
let currentUser = null;
let currentPaymentMethod = 'card';
let qrTimer = null;
let qrTimeRemaining = 600;

// Custom Modal Functions
function showCustomAlert(title, message, type = 'info') {
    const modal = document.createElement('div');
    modal.className = 'custom-modal-overlay';
    modal.innerHTML = `
        <div class="custom-modal ${type}">
            <div class="custom-modal-icon">
                ${type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}
            </div>
            <h3 class="custom-modal-title">${title}</h3>
            <p class="custom-modal-message">${message}</p>
            <button class="custom-modal-btn" onclick="this.closest('.custom-modal-overlay').remove()">
                ตกลง
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Auto focus button
    setTimeout(() => {
        modal.querySelector('.custom-modal-btn').focus();
    }, 100);
}

function showCustomConfirm(title, message, onConfirm, onCancel) {
    const modal = document.createElement('div');
    modal.className = 'custom-modal-overlay';
    modal.innerHTML = `
        <div class="custom-modal confirm">
            <div class="custom-modal-icon">❓</div>
            <h3 class="custom-modal-title">${title}</h3>
            <p class="custom-modal-message">${message}</p>
            <div class="custom-modal-buttons">
                <button class="custom-modal-btn cancel" onclick="
                    this.closest('.custom-modal-overlay').remove();
                ">
                    ยกเลิก
                </button>
                <button class="custom-modal-btn confirm" id="confirmBtn">
                    ยืนยัน
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add event listener to confirm button
    const confirmBtn = modal.querySelector('#confirmBtn');
    confirmBtn.addEventListener('click', () => {
        modal.remove();
        if (onConfirm) onConfirm();
    });
    
    // Auto focus confirm button
    setTimeout(() => {
        confirmBtn.focus();
    }, 100);
}

// Load data from localStorage
function loadCheckoutData() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('checkoutCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    // Load user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    // If no cart or user, redirect back
    if (!cart || cart.length === 0 || !currentUser) {
        showCustomAlert(
            'ไม่พบข้อมูล',
            'ไม่พบข้อมูลการสั่งซื้อ กรุณาเลือกสินค้าก่อน',
            'error'
        );
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }
    
    renderOrderSummary();
}

// Render Order Summary
function renderOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const subtotal = document.getElementById('subtotal');
    const totalAmount = document.getElementById('totalAmount');
    
    // Render items
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <div class="item-emoji">${item.emoji}</div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">จำนวน: ${item.quantity}</div>
            </div>
            <div class="item-price">${(item.price * item.quantity).toLocaleString()} ฿</div>
        </div>
    `).join('');
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    subtotal.textContent = total.toLocaleString() + ' บาท';
    totalAmount.textContent = total.toLocaleString() + ' บาท';
    
    // Update COD amount
    const codAmount = document.getElementById('codAmount');
    if (codAmount) {
        codAmount.textContent = total.toLocaleString() + ' บาท';
    }
}

// Select Payment Method
function selectPaymentMethod(method) {
    currentPaymentMethod = method;
    
    // Update active state
    document.querySelectorAll('.payment-method').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-method="${method}"]`).classList.add('active');
    
    // Hide all forms
    document.querySelectorAll('.payment-form').forEach(form => {
        form.classList.add('hidden');
    });
    
    // Show selected form
    const formMap = {
        'card': 'cardPaymentForm',
        'qr': 'qrPaymentForm',
        'bank': 'bankPaymentForm',
        'cod': 'codPaymentForm'
    };
    
    document.getElementById(formMap[method]).classList.remove('hidden');
    
    // Generate QR if QR method selected
    if (method === 'qr') {
        generateQRCode();
        startQRTimer();
    } else {
        stopQRTimer();
    }
}

// Card Payment
function processCardPayment(event) {
    event.preventDefault();
    
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    if (cardNumber.length !== 16) {
        showCustomAlert(
            'ข้อมูลไม่ถูกต้อง',
            'กรุณากรอกหมายเลขบัตรให้ถูกต้อง (16 หลัก)',
            'error'
        );
        return;
    }
    
    processPayment();
}

// Generate QR Code
function generateQRCode() {
    const canvas = document.getElementById('qrCodeCanvas');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    canvas.innerHTML = '';
    
    const promptpayId = '0123456789012';
    const amount = total.toFixed(2);
    const qrData = `00020101021230820016A000000677010112${promptpayId}5303764540${amount.length}${amount}5802TH5909FreshSip6304`;
    
    if (typeof QRious !== 'undefined') {
        new QRious({
            element: canvas,
            value: qrData,
            size: 250,
            level: 'M'
        });
    }
    
    document.getElementById('qrAmount').textContent = `฿${total.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
}

// QR Timer
function startQRTimer() {
    qrTimeRemaining = 600;
    updateTimerDisplay();
    
    qrTimer = setInterval(() => {
        qrTimeRemaining--;
        updateTimerDisplay();
        
        if (qrTimeRemaining <= 0) {
            stopQRTimer();
            showCustomAlert(
                'QR Code หมดอายุ',
                'QR Code หมดอายุแล้ว กรุณาสร้างใหม่',
                'error'
            );
        }
    }, 1000);
}

function stopQRTimer() {
    if (qrTimer) {
        clearInterval(qrTimer);
        qrTimer = null;
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(qrTimeRemaining / 60);
    const seconds = qrTimeRemaining % 60;
    const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const timerEl = document.getElementById('qrTimer');
    if (timerEl) {
        timerEl.textContent = display;
    }
}

function verifyQRPayment() {
    showCustomConfirm(
        'ยืนยันการชำระเงิน',
        'คุณได้ชำระเงินผ่าน QR Code แล้วใช่หรือไม่?',
        processPayment
    );
}

// Handle Slip Upload
function handleSlipUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('slipPreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Slip">`;
            preview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function submitBankTransfer() {
    const slipPreview = document.getElementById('slipPreview');
    if (slipPreview.classList.contains('hidden')) {
        showCustomAlert(
            'ข้อมูลไม่ครบ',
            'กรุณาอัพโหลดหลักฐานการโอนเงิน',
            'error'
        );
        return;
    }
    processPayment();
}

function confirmCOD() {
    showCustomConfirm(
        'ยืนยันคำสั่งซื้อ',
        'ยืนยันคำสั่งซื้อแบบเก็บเงินปลายทาง?',
        processPayment
    );
}

// Process Payment
function processPayment() {
    // Save order to history
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || {};
    if (!orderHistory[currentUser.email]) {
        orderHistory[currentUser.email] = [];
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderNumber = 'FS' + Date.now().toString().slice(-8);
    
    const order = {
        id: orderNumber,
        date: new Date().toISOString(),
        items: [...cart],
        total: total,
        paymentMethod: getPaymentMethodName()
    };
    
    orderHistory[currentUser.email].push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    // Clear checkout cart
    localStorage.removeItem('checkoutCart');
    
    // Show success modal
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('successModal').classList.remove('hidden');
}

function getPaymentMethodName() {
    const methodNames = {
        'card': 'บัตรเครดิต/เดบิต',
        'qr': 'QR Code',
        'bank': 'โอนผ่านธนาคาร',
        'cod': 'เก็บเงินปลายทาง'
    };
    return methodNames[currentPaymentMethod];
}

// Navigation
function goBack() {
    window.location.href = 'index.html';
}

function returnToHome() {
    window.location.href = 'index.html';
}

// Format card number input
document.addEventListener('DOMContentLoaded', function() {
    loadCheckoutData();
    
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            value = value.replace(/\D/g, '');
            value = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }
    
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
    
    const cvvInput = document.getElementById('cardCVV');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        });
    }
});