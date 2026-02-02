// ========================================
// AUTO TRANSLATION SYSTEM (ไม่ต้องใช้ data-i18n)
// ========================================

// Current language
let currentLanguage = localStorage.getItem('language') || 'th';

// Translation mappings (Thai to English)
const autoTranslations = {
    // Navigation
    'หน้าแรก': 'Home',
    'สินค้า': 'Products',
    'โปรโมชั่น': 'Promotions',
    'เกี่ยวกับเรา': 'About',
    'ติดต่อ': 'Contact',
    'เข้าสู่ระบบ': 'Login',
    'ออกจากระบบ': 'Logout',
    
    // Hero
    'ส่งฟรี! สำหรับออเดอร์แรก': 'Free Delivery! For first order',
    'ยินดีต้อนรับสู่': 'Welcome to',
    'ร้านน้ำและของว่างออนไลน์ที่ดีที่สุด': 'The best online beverage and snack shop',
    'พร้อมส่งความสดชื่นถึงมือคุณ ภายใน 30 นาที': 'Fresh delivery to your door in 30 minutes',
    'วัตถุดิบคุณภาพพรีเมียม': 'Premium quality ingredients',
    'ส่งไว ภายใน 30 นาที': 'Fast delivery in 30 minutes',
    'ราคาดี มีโปรโมชั่นทุกวัน': 'Great prices with daily promotions',
    'เริ่มสั่งซื้อเลย': 'Start Shopping',
    'ดูโปรโมชั่น': 'View Promotions',
    
    // Stats
    'ลูกค้าพึงพอใจ': 'Happy Customers',
    'คะแนนรีวิว': 'Review Rating',
    'เวลาจัดส่ง': 'Delivery Time',
    'นาที': 'min',
    
    // Popular
    'สินค้ายอดนิยม': 'Popular Items',
    'ดูทั้งหมด': 'View All',
    
    // Promotions
    'โปรโมชั่นพิเศษ': 'Special Promotions',
    'ข้อเสนอสุดพิเศษสำหรับคุณ': 'Special offers just for you',
    'ซื้อ 2 แถม 1': 'Buy 2 Get 1',
    'ซื้อน้ำปั่น 2 แก้ว แถมฟรี 1 แก้ว': 'Buy 2 smoothies, get 1 free',
    'ลด 20%': '20% Off',
    'สมาชิกใหม่ลดทันที 20%': 'New members get 20% off',
    'ของแถมฟรี': 'Free Gift',
    'ซื้อครบ 200 บาท รับของแถม': 'Free gift with purchase over 200฿',
    'Flash Sale': 'Flash Sale',
    'ลดสูงสุด 50% ทุกวันศุกร์': 'Up to 50% off every Friday',
    'ถึง': 'Until',
    'สมาชิกใหม่': 'New Members',
    'ทุกวัน': 'Everyday',
    'ทุกศุกร์ 12:00-14:00': 'Every Friday 12:00-14:00',
    
    // About
    'ทำไมต้องเลือก FreshSip': 'Why Choose FreshSip',
    'คุณภาพเยี่ยม': 'Excellent Quality',
    'คัดสรรวัตถุดิบคุณภาพดีที่สุด สดใหม่ทุกวัน': 'Premium quality ingredients, fresh every day',
    'จัดส่งรวดเร็ว': 'Fast Delivery',
    'ส่งถึงมือคุณภายใน 30 นาที รับประกันความสด': 'Delivered in 30 minutes, guaranteed fresh',
    'ราคาเป็นธรรม': 'Fair Pricing',
    'ราคาดี คุ้มค่า มีโปรโมชั่นพิเศษตลอด': 'Great value with special promotions',
    'บริการดีเยี่ยม': 'Excellent Service',
    'ทีมงานพร้อมให้บริการ 24/7 ดูแลทุกความต้องการ': '24/7 customer support for all your needs',
    'เมนูให้เลือก': 'Menu Items',
    'รีวิวเฉลี่ย': 'Average Rating',
    
    // Contact
    'ติดต่อเรา': 'Contact Us',
    'พร้อมให้บริการตลอด 24 ชั่วโมง': 'Available 24/7',
    'โทรศัพท์': 'Phone',
    'อีเมล': 'Email',
    'ที่อยู่': 'Address',
    'Social Media': 'Social Media',
    
    // Products
    'สินค้าแนะนำ': 'Our Products',
    'เลือกซื้อสินค้าคุณภาพจากเรา': 'Shop quality products from us',
    'น้ำทั่วไป': 'Beverages',
    'น้ำปั่น': 'Smoothies',
    'ของกินรองท้อง': 'Snacks',
    'เพิ่มลงตระกร้า': 'Add to Cart',
    'บาท': 'Baht',
    
    // Cart
    'ตระกร้าสินค้า': 'Shopping Cart',
    'กลับไปเลือกซื้อ': 'Back to Shop',
    'ตระกร้าว่างเปล่า': 'Cart is Empty',
    'เพิ่มสินค้าลงตระกร้าเพื่อเริ่มสั่งซื้อ': 'Add items to cart to start shopping',
    'จำนวน': 'Quantity',
    'ลบ': 'Remove',
    'ยอดรวมสินค้า': 'Subtotal',
    'ค่าจัดส่ง': 'Delivery',
    'ฟรี': 'Free',
    'ส่วนลด': 'Discount',
    'ยอดรวมทั้งหมด': 'Total',
    'ไปหน้าชำระเงิน': 'Proceed to Checkout',
    
    // Profile
    'ประวัติการสั่งซื้อ': 'Order History',
    'โปรไฟล์': 'Profile',
    'การตั้งค่า': 'Settings',
    'โปรไฟล์ของฉัน': 'My Profile',
    'เปลี่ยนรูปโปรไฟล์': 'Change Avatar',
    'คำสั่งซื้อ': 'Orders',
    'ยอดรวม': 'Total Spent',
    'วัน': 'Days',
    'ชื่อ-นามสกุล': 'Full Name',
    'สมาชิกเมื่อ': 'Member Since',
    'สถานะ': 'Status',
    'ยืนยันแล้ว': 'Verified',
    'ส่งออกข้อมูล': 'Export Data',
    
    // Settings
    'รูปแบบการแสดงผล': 'Appearance',
    'ธีมสี': 'Theme',
    'กลางวัน': 'Light',
    'กลางคืน': 'Dark',
    'อัตโนมัติ': 'Auto',
    'สว่าง สดใส': 'Bright, Fresh',
    'มืด สบายตา': 'Dark, Eye-friendly',
    'ตามระบบ': 'System Default',
    'ขนาดตัวอักษร': 'Font Size',
    'เล็ก': 'Small',
    'กลาง': 'Medium',
    'ใหญ่': 'Large',
    'ภาษา': 'Language',
    'ภาษาไทย': 'ภาษาไทย',
    'English': 'English',
    'ความชอบ': 'Preferences',
    'การแจ้งเตือน': 'Notifications',
    'รับการแจ้งเตือนคำสั่งซื้อและโปรโมชั่น': 'Receive order and promotion notifications',
    'เสียงเอฟเฟกต์': 'Sound Effects',
    'เล่นเสียงเมื่อมีการกระทำ': 'Play sound on actions',
    'ประวัติการค้นหา': 'Search History',
    'บันทึกคำค้นหาล่าสุด': 'Save recent searches',
    'ระบบ': 'System',
    'รีเซ็ตการตั้งค่า': 'Reset Settings',
    'ล้างแคช': 'Clear Cache',
    'โซนอันตราย': 'Danger Zone',
    'การลบบัญชีจะลบข้อมูลทั้งหมดและไม่สามารถกู้คืนได้': 'Deleting account will remove all data permanently',
    'ลบบัญชีถาวร': 'Delete Account',
    
    // Auth
    'ยินดีต้อนรับกลับมา': 'Welcome Back',
    'สร้างบัญชีใหม่': 'Create New Account',
    'รหัสผ่าน': 'Password',
    'ยืนยันรหัสผ่าน': 'Confirm Password',
    'สมัครสมาชิก': 'Register',
    'ยังไม่มีบัญชี?': "Don't have an account?",
    'มีบัญชีอยู่แล้ว?': 'Already have an account?',
    
    // Footer
    'ลิงก์ด่วน': 'Quick Links',
    'ร้านน้ำและของว่างออนไลน์ที่ดีที่สุด': 'The best online beverage and snack shop',
    'สงวนลิขสิทธิ์': 'All rights reserved',
    
    // Common
    'ปิด': 'Close',
    'ตกลง': 'OK',
    'ยกเลิก': 'Cancel',
    'ยืนยัน': 'Confirm',
    'บันทึก': 'Save',
    'แก้ไข': 'Edit',
    'ค้นหา': 'Search',
    'กำลังโหลด...': 'Loading...',
    'เกิดข้อผิดพลาด': 'Error',
    'สำเร็จ': 'Success',
    'คำเตือน': 'Warning',
    'แจ้งเตือน': 'Info',
    
    // Order History
    'ยังไม่มีประวัติการสั่งซื้อ': 'No Order History',
    'เริ่มสั่งซื้อสินค้าเพื่อดูประวัติที่นี่': 'Start shopping to see your orders here',
    'รายการคำสั่งซื้อทั้งหมดของคุณ': 'All your orders',
    
    // Checkout
    'ชำระเงิน': 'Checkout',
    'ตรวจสอบ': 'Review',
    'เสร็จสิ้น': 'Complete',
    'สรุปรายการสั่งซื้อ': 'Order Summary',
    'ส่งฟรี!': 'Free Delivery!',
    'เลือกวิธีชำระเงิน': 'Select Payment Method',
    'เลือกช่องทางที่สะดวกสำหรับคุณ': 'Choose your preferred payment method',
    'บัตรเครดิต/เดบิต': 'Credit/Debit Card',
    'QR Code': 'QR Code',
    'โอนผ่านธนาคาร': 'Bank Transfer',
    'เก็บเงินปลายทาง': 'Cash on Delivery',
    'รวดเร็ว': 'Fast',
    'นิยมสูงสุด': 'Most Popular',
    
    // Payment
    'ชื่อบนบัตร': 'Cardholder Name',
    'หมายเลขบัตร': 'Card Number',
    'วันหมดอายุ': 'Expiry Date',
    'การชำระเงินของคุณปลอดภัยด้วยการเข้ารหัส SSL 256-bit': 'Your payment is secured with 256-bit SSL encryption',
    'ยืนยันการชำระเงิน': 'Confirm Payment',
    'สแกน QR Code': 'Scan QR Code',
    'ใช้แอปธนาคารของคุณสแกน QR Code': 'Use your banking app to scan QR Code',
    'ยอดที่ต้องชำระ': 'Amount to Pay',
    'หมดอายุใน': 'Expires in',
    'ชำระเงินเมื่อได้รับสินค้า': 'Pay when you receive',
    
    // Success
    'ชำระเงินสำเร็จ!': 'Payment Successful!',
    'ขอบคุณที่ใช้บริการ FreshSip': 'Thank you for using FreshSip',
    'หมายเลขคำสั่งซื้อ': 'Order Number',
    'ส่งข้อมูลไปที่อีเมลแล้ว': 'Confirmation sent to email',
    'จัดส่งภายใน 30 นาที': 'Delivery in 30 minutes',
    'กลับหน้าหลัก': 'Back to Home',
    
    // Notifications
    'กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ': 'Please login before ordering',
    'เพิ่มลงตระกร้าแล้ว': 'Added to cart',
    'เข้าสู่ระบบสำเร็จ!': 'Login successful!',
    'อีเมลหรือรหัสผ่านไม่ถูกต้อง': 'Invalid email or password',
    'สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ': 'Registration successful! Please login',
    'ออกจากระบบสำเร็จ': 'Logout successful',
    'กลับ': 'Back',
};

// Get translated text
function translate(text) {
    if (!text || typeof text !== 'string') return text;
    
    const trimmedText = text.trim();
    
    if (currentLanguage === 'en') {
        return autoTranslations[trimmedText] || text;
    }
    
    return text; // Return original if Thai or not found
}

// Translate all text nodes in an element
function translateElement(element) {
    // Skip script and style tags
    if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') {
        return;
    }
    
    // Get all child nodes
    const nodes = element.childNodes;
    
    for (let node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Text node - translate it
            const originalText = node.textContent;
            const translatedText = translate(originalText);
            
            if (translatedText !== originalText) {
                node.textContent = translatedText;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Element node - recurse
            translateElement(node);
        }
    }
    
    // Translate placeholder
    if (element.placeholder) {
        element.placeholder = translate(element.placeholder);
    }
    
    // Translate title
    if (element.title) {
        element.title = translate(element.title);
    }
}

// Change language
function changeLanguage(lang) {
    if (lang !== 'th' && lang !== 'en') return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Reload page to apply translations
    location.reload();
}

// Update language toggle button
function updateLanguageButton() {
    const langBtn = document.getElementById('languageToggle');
    if (langBtn) {
        langBtn.textContent = currentLanguage === 'th' ? '🇹🇭 TH' : '🇺🇸 EN';
        langBtn.title = currentLanguage === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย';
    }
}

// Initialize translation
function initializeTranslation() {
    console.log('🌍 Initializing Auto-Translation:', currentLanguage);
    
    if (currentLanguage === 'en') {
        // Translate the entire page
        translateElement(document.body);
    }
    
    // Update language button
    updateLanguageButton();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTranslation);
} else {
    initializeTranslation();
}