// ========================================
// MULTI-LANGUAGE TRANSLATION SYSTEM
// ========================================

const translations = {
    th: {
        // Navigation
        nav_home: 'หน้าแรก',
        nav_products: 'สินค้า',
        nav_promotions: 'โปรโมชั่น',
        nav_about: 'เกี่ยวกับเรา',
        nav_contact: 'ติดต่อ',
        nav_cart: 'ตระกร้า',
        nav_login: 'เข้าสู่ระบบ',
        nav_logout: 'ออกจากระบบ',
        
        // Hero Section
        hero_badge: 'ส่งฟรี! สำหรับออเดอร์แรก',
        hero_title: 'ยินดีต้อนรับสู่',
        hero_subtitle: 'ร้านน้ำและของว่างออนไลน์ที่ดีที่สุด<br>พร้อมส่งความสดชื่นถึงมือคุณ ภายใน 30 นาที',
        hero_feature_1: 'วัตถุดิบคุณภาพพรีเมียม',
        hero_feature_2: 'ส่งไว ภายใน 30 นาที',
        hero_feature_3: 'ราคาดี มีโปรโมชั่นทุกวัน',
        hero_btn_shop: 'เริ่มสั่งซื้อเลย',
        hero_btn_promo: 'ดูโปรโมชั่น',
        hero_stat_1: 'ลูกค้าพึงพอใจ',
        hero_stat_2: 'คะแนนรีวิว',
        hero_stat_3: 'เวลาจัดส่ง',
        
        // Popular Items
        popular_title: 'สินค้ายอดนิยม',
        popular_view_all: 'ดูทั้งหมด',
        
        // Promotions
        promo_title: 'โปรโมชั่นพิเศษ',
        promo_subtitle: 'ข้อเสนอสุดพิเศษสำหรับคุณ',
        promo_buy2get1: 'ซื้อ 2 แถม 1',
        promo_buy2get1_desc: 'ซื้อน้ำปั่น 2 แก้ว แถมฟรี 1 แก้ว',
        promo_discount: 'ลด 20%',
        promo_discount_desc: 'สมาชิกใหม่ลดทันที 20%',
        promo_free_gift: 'ของแถมฟรี',
        promo_free_gift_desc: 'ซื้อครบ 200 บาท รับของแถม',
        promo_flash: 'Flash Sale',
        promo_flash_desc: 'ลดสูงสุด 50% ทุกวันศุกร์',
        promo_valid_until: 'ถึง',
        promo_new_member: 'สมาชิกใหม่',
        promo_everyday: 'ทุกวัน',
        promo_friday: 'ทุกศุกร์ 12:00-14:00',
        
        // About Section
        about_title: 'เกี่ยวกับเรา',
        about_subtitle: 'ทำไมต้องเลือก FreshSip',
        about_quality: 'คุณภาพเยี่ยม',
        about_quality_desc: 'คัดสรรวัตถุดิบคุณภาพดีที่สุด สดใหม่ทุกวัน',
        about_fast: 'จัดส่งรวดเร็ว',
        about_fast_desc: 'ส่งถึงมือคุณภายใน 30 นาที รับประกันความสด',
        about_price: 'ราคาเป็นธรรม',
        about_price_desc: 'ราคาดี คุ้มค่า มีโปรโมชั่นพิเศษตลอด',
        about_service: 'บริการดีเยี่ยม',
        about_service_desc: 'ทีมงานพร้อมให้บริการ 24/7 ดูแลทุกความต้องการ',
        about_stat_customers: 'ลูกค้าพึงพอใจ',
        about_stat_menu: 'เมนูให้เลือก',
        about_stat_rating: 'รีวิวเฉลี่ย',
        about_stat_delivery: 'เวลาจัดส่ง',
        
        // Contact Section
        contact_title: 'ติดต่อเรา',
        contact_subtitle: 'พร้อมให้บริการตลอด 24 ชั่วโมง',
        contact_phone: 'โทรศัพท์',
        contact_email: 'อีเมล',
        contact_address: 'ที่อยู่',
        contact_address_text: '123 ถนนสุขุมวิท<br>กรุงเทพมหานคร 10110',
        contact_social: 'Social Media',
        
        // Products
        products_title: 'สินค้าแนะนำ',
        products_subtitle: 'เลือกซื้อสินค้าคุณภาพจากเรา',
        products_beverages: 'น้ำทั่วไป',
        products_smoothies: 'น้ำปั่น',
        products_snacks: 'ของกินรองท้อง',
        products_add_cart: 'เพิ่มลงตระกร้า',
        products_baht: 'บาท',
        
        // Cart
        cart_title: 'ตระกร้าสินค้า',
        cart_back: 'กลับไปเลือกซื้อ',
        cart_empty: 'ตระกร้าว่างเปล่า',
        cart_empty_msg: 'เพิ่มสินค้าลงตระกร้าเพื่อเริ่มสั่งซื้อ',
        cart_quantity: 'จำนวน',
        cart_remove: 'ลบ',
        cart_subtotal: 'ยอดรวม',
        cart_delivery: 'ค่าจัดส่ง',
        cart_delivery_free: 'ฟรี',
        cart_discount: 'ส่วนลด',
        cart_total: 'ยอดรวมทั้งหมด',
        cart_checkout: 'ไปหน้าชำระเงิน',
        
        // Checkout
        checkout_title: 'ชำระเงิน',
        checkout_step_review: 'ตรวจสอบ',
        checkout_step_payment: 'ชำระเงิน',
        checkout_step_complete: 'เสร็จสิ้น',
        checkout_order_summary: 'สรุปรายการสั่งซื้อ',
        checkout_free_delivery: 'ส่งฟรี!',
        checkout_item_count: 'รายการ',
        checkout_payment_method: 'เลือกวิธีชำระเงิน',
        checkout_payment_subtitle: 'เลือกช่องทางที่สะดวกสำหรับคุณ',
        checkout_card: 'บัตรเครดิต/เดบิต',
        checkout_qr: 'QR Code',
        checkout_bank: 'โอนผ่านธนาคาร',
        checkout_cod: 'เก็บเงินปลายทาง',
        checkout_fast: 'รวดเร็ว',
        checkout_popular: 'นิยมสูงสุด',
        
        // Payment Forms
        payment_card_name: 'ชื่อบนบัตร',
        payment_card_number: 'หมายเลขบัตร',
        payment_card_expiry: 'วันหมดอายุ',
        payment_card_cvv: 'CVV',
        payment_secure: 'การชำระเงินของคุณปลอดภัยด้วยการเข้ารหัส SSL 256-bit',
        payment_confirm: 'ยืนยันการชำระเงิน',
        payment_qr_title: 'สแกน QR Code',
        payment_qr_subtitle: 'ใช้แอปธนาคารของคุณสแกน QR Code',
        payment_qr_amount: 'ยอดที่ต้องชำระ',
        payment_qr_expires: 'หมดอายุใน',
        payment_qr_step1: 'เปิดแอปธนาคาร',
        payment_qr_step2: 'สแกน QR Code',
        payment_qr_step3: 'ยืนยันชำระเงิน',
        payment_qr_paid: 'ฉันชำระเงินแล้ว',
        payment_bank_title: 'โอนเงินผ่านธนาคาร',
        payment_bank_account: 'เลขที่บัญชี',
        payment_bank_name: 'ชื่อบัญชี',
        payment_bank_amount: 'ยอดที่ต้องโอน',
        payment_bank_upload: 'อัพโหลดหลักฐานการโอนเงิน',
        payment_bank_upload_msg: 'กรุณาอัพโหลด ภาพหน้าจอ slip การโอนเงิน',
        payment_bank_submit: 'ส่งหลักฐานการโอนเงิน',
        payment_cod_title: 'เก็บเงินปลายทาง (COD)',
        payment_cod_subtitle: 'ชำระเงินเมื่อได้รับสินค้า',
        payment_cod_how: 'วิธีชำระเงิน',
        payment_cod_prepare: 'เตรียมเงินสดจำนวนที่ถูกต้อง',
        payment_cod_pay_delivery: 'ชำระให้กับพนักงานส่งสินค้า',
        payment_cod_check: 'ตรวจสอบสินค้าก่อนชำระเงิน',
        payment_cod_note: 'ข้อควรทราบ',
        payment_cod_check_product: 'ตรวจสอบสภาพสินค้าก่อนรับ',
        payment_cod_keep_receipt: 'เก็บใบเสร็จไว้เป็นหลักฐาน',
        payment_cod_contact: 'ติดต่อเราหากมีปัญหา',
        payment_cod_confirm: 'ยืนยันคำสั่งซื้อ',
        
        // Success
        success_title: 'ชำระเงินสำเร็จ!',
        success_message: 'ขอบคุณที่ใช้บริการ FreshSip',
        success_order_number: 'หมายเลขคำสั่งซื้อ',
        success_email_sent: 'ส่งข้อมูลไปที่อีเมลแล้ว',
        success_delivery: 'จัดส่งภายใน 30 นาที',
        success_back_home: 'กลับหน้าหลัก',
        
        // Notifications
        notif_login_required: 'กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ',
        notif_cart_empty: 'ตระกร้าสินค้าว่างเปล่า',
        notif_added_to_cart: 'เพิ่มลงตระกร้าแล้ว',
        notif_login_success: 'เข้าสู่ระบบสำเร็จ!',
        notif_login_failed: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        notif_register_success: 'สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ',
        notif_logout_success: 'ออกจากระบบสำเร็จ',
        
        // Profile & Settings
        profile_orders: 'ประวัติการสั่งซื้อ',
        profile_info: 'โปรไฟล์',
        profile_settings: 'การตั้งค่า',
        profile_title: 'โปรไฟล์ของฉัน',
        profile_change_avatar: 'เปลี่ยนรูปโปรไฟล์',
        profile_orders_count: 'คำสั่งซื้อ',
        profile_total_spent: 'ยอดรวม',
        profile_member_days: 'วัน',
        profile_name: 'ชื่อ-นามสกุล',
        profile_email: 'อีเมล',
        profile_joined: 'สมาชิกเมื่อ',
        profile_status: 'สถานะ',
        profile_verified: 'ยืนยันแล้ว',
        profile_export: 'ส่งออกข้อมูล',
        
        // Settings
        settings_appearance: 'รูปแบบการแสดงผล',
        settings_theme: 'ธีมสี',
        settings_theme_light: 'กลางวัน',
        settings_theme_dark: 'กลางคืน',
        settings_theme_auto: 'อัตโนมัติ',
        settings_theme_desc_light: 'สว่าง สดใส',
        settings_theme_desc_dark: 'มืด สบายตา',
        settings_theme_desc_auto: 'ตามระบบ',
        settings_font_size: 'ขนาดตัวอักษร',
        settings_font_small: 'เล็ก',
        settings_font_medium: 'กลาง',
        settings_font_large: 'ใหญ่',
        settings_language: 'ภาษา',
        settings_language_th: 'ภาษาไทย',
        settings_language_en: 'English',
        settings_preferences: 'ความชอบ',
        settings_notifications: 'การแจ้งเตือน',
        settings_notifications_desc: 'รับการแจ้งเตือนคำสั่งซื้อและโปรโมชั่น',
        settings_sound: 'เสียงเอฟเฟกต์',
        settings_sound_desc: 'เล่นเสียงเมื่อมีการกระทำ',
        settings_search_history: 'ประวัติการค้นหา',
        settings_search_history_desc: 'บันทึกคำค้นหาล่าสุด',
        settings_system: 'ระบบ',
        settings_reset: 'รีเซ็ตการตั้งค่า',
        settings_clear_cache: 'ล้างแคช',
        settings_danger_zone: 'โซนอันตราย',
        settings_danger_desc: 'การลบบัญชีจะลบข้อมูลทั้งหมดและไม่สามารถกู้คืนได้',
        settings_delete_account: 'ลบบัญชีถาวร',
        
        // Auth
        auth_login_title: 'เข้าสู่ระบบ',
        auth_login_subtitle: 'ยินดีต้อนรับกลับมา',
        auth_register_title: 'สมัครสมาชิก',
        auth_register_subtitle: 'สร้างบัญชีใหม่',
        auth_email: 'อีเมล',
        auth_password: 'รหัสผ่าน',
        auth_password_confirm: 'ยืนยันรหัสผ่าน',
        auth_name: 'ชื่อ-นามสกุล',
        auth_login_btn: 'เข้าสู่ระบบ',
        auth_register_btn: 'สมัครสมาชิก',
        auth_no_account: 'ยังไม่มีบัญชี?',
        auth_have_account: 'มีบัญชีอยู่แล้ว?',
        auth_register_link: 'สมัครสมาชิก',
        auth_login_link: 'เข้าสู่ระบบ',
        
        // Footer
        footer_links: 'ลิงก์ด่วน',
        footer_contact: 'ติดต่อเรา',
        footer_desc: 'ร้านน้ำและของว่างออนไลน์ที่ดีที่สุด',
        footer_rights: 'สงวนลิขสิทธิ์',
        
        // Order History
        orders_title: 'ประวัติการสั่งซื้อ',
        orders_subtitle: 'รายการคำสั่งซื้อทั้งหมดของคุณ',
        orders_empty: 'ยังไม่มีประวัติการสั่งซื้อ',
        orders_empty_msg: 'เริ่มสั่งซื้อสินค้าเพื่อดูประวัติที่นี่',
        orders_number: 'คำสั่งซื้อ',
        orders_date: 'วันที่',
        orders_total: 'ยอดรวม',
        orders_status: 'สถานะ',
        orders_completed: 'สำเร็จ',
        
        // Common
        close: 'ปิด',
        ok: 'ตกลง',
        cancel: 'ยกเลิก',
        confirm: 'ยืนยัน',
        save: 'บันทึก',
        edit: 'แก้ไข',
        delete: 'ลบ',
        search: 'ค้นหา',
        loading: 'กำลังโหลด...',
        error: 'เกิดข้อผิดพลาด',
        success: 'สำเร็จ',
        warning: 'คำเตือน',
        info: 'แจ้งเตือน',
    },
    
    en: {
        // Navigation
        nav_home: 'Home',
        nav_products: 'Products',
        nav_promotions: 'Promotions',
        nav_about: 'About',
        nav_contact: 'Contact',
        nav_cart: 'Cart',
        nav_login: 'Login',
        nav_logout: 'Logout',
        
        // Hero Section
        hero_badge: 'Free Delivery! For first order',
        hero_title: 'Welcome to',
        hero_subtitle: 'The best online beverage and snack shop<br>Fresh delivery to your door in 30 minutes',
        hero_feature_1: 'Premium quality ingredients',
        hero_feature_2: 'Fast delivery in 30 minutes',
        hero_feature_3: 'Great prices with daily promotions',
        hero_btn_shop: 'Start Shopping',
        hero_btn_promo: 'View Promotions',
        hero_stat_1: 'Happy Customers',
        hero_stat_2: 'Review Rating',
        hero_stat_3: 'Delivery Time',
        
        // Popular Items
        popular_title: 'Popular Items',
        popular_view_all: 'View All',
        
        // Promotions
        promo_title: 'Special Promotions',
        promo_subtitle: 'Special offers just for you',
        promo_buy2get1: 'Buy 2 Get 1',
        promo_buy2get1_desc: 'Buy 2 smoothies, get 1 free',
        promo_discount: '20% Off',
        promo_discount_desc: 'New members get 20% off',
        promo_free_gift: 'Free Gift',
        promo_free_gift_desc: 'Free gift with purchase over 200฿',
        promo_flash: 'Flash Sale',
        promo_flash_desc: 'Up to 50% off every Friday',
        promo_valid_until: 'Until',
        promo_new_member: 'New Members',
        promo_everyday: 'Everyday',
        promo_friday: 'Every Friday 12:00-14:00',
        
        // About Section
        about_title: 'About Us',
        about_subtitle: 'Why Choose FreshSip',
        about_quality: 'Excellent Quality',
        about_quality_desc: 'Premium quality ingredients, fresh every day',
        about_fast: 'Fast Delivery',
        about_fast_desc: 'Delivered in 30 minutes, guaranteed fresh',
        about_price: 'Fair Pricing',
        about_price_desc: 'Great value with special promotions',
        about_service: 'Excellent Service',
        about_service_desc: '24/7 customer support for all your needs',
        about_stat_customers: 'Happy Customers',
        about_stat_menu: 'Menu Items',
        about_stat_rating: 'Average Rating',
        about_stat_delivery: 'Delivery Time',
        
        // Contact Section
        contact_title: 'Contact Us',
        contact_subtitle: 'Available 24/7',
        contact_phone: 'Phone',
        contact_email: 'Email',
        contact_address: 'Address',
        contact_address_text: '123 Sukhumvit Road<br>Bangkok 10110',
        contact_social: 'Social Media',
        
        // Products
        products_title: 'Our Products',
        products_subtitle: 'Shop quality products from us',
        products_beverages: 'Beverages',
        products_smoothies: 'Smoothies',
        products_snacks: 'Snacks',
        products_add_cart: 'Add to Cart',
        products_baht: 'Baht',
        
        // Cart
        cart_title: 'Shopping Cart',
        cart_back: 'Back to Shop',
        cart_empty: 'Cart is Empty',
        cart_empty_msg: 'Add items to cart to start shopping',
        cart_quantity: 'Quantity',
        cart_remove: 'Remove',
        cart_subtotal: 'Subtotal',
        cart_delivery: 'Delivery',
        cart_delivery_free: 'Free',
        cart_discount: 'Discount',
        cart_total: 'Total',
        cart_checkout: 'Proceed to Checkout',
        
        // Checkout
        checkout_title: 'Checkout',
        checkout_step_review: 'Review',
        checkout_step_payment: 'Payment',
        checkout_step_complete: 'Complete',
        checkout_order_summary: 'Order Summary',
        checkout_free_delivery: 'Free Delivery!',
        checkout_item_count: 'items',
        checkout_payment_method: 'Select Payment Method',
        checkout_payment_subtitle: 'Choose your preferred payment method',
        checkout_card: 'Credit/Debit Card',
        checkout_qr: 'QR Code',
        checkout_bank: 'Bank Transfer',
        checkout_cod: 'Cash on Delivery',
        checkout_fast: 'Fast',
        checkout_popular: 'Most Popular',
        
        // Payment Forms
        payment_card_name: 'Cardholder Name',
        payment_card_number: 'Card Number',
        payment_card_expiry: 'Expiry Date',
        payment_card_cvv: 'CVV',
        payment_secure: 'Your payment is secured with 256-bit SSL encryption',
        payment_confirm: 'Confirm Payment',
        payment_qr_title: 'Scan QR Code',
        payment_qr_subtitle: 'Use your banking app to scan QR Code',
        payment_qr_amount: 'Amount to Pay',
        payment_qr_expires: 'Expires in',
        payment_qr_step1: 'Open Banking App',
        payment_qr_step2: 'Scan QR Code',
        payment_qr_step3: 'Confirm Payment',
        payment_qr_paid: 'I have paid',
        payment_bank_title: 'Bank Transfer',
        payment_bank_account: 'Account Number',
        payment_bank_name: 'Account Name',
        payment_bank_amount: 'Amount to Transfer',
        payment_bank_upload: 'Upload Transfer Proof',
        payment_bank_upload_msg: 'Please upload screenshot of transfer slip',
        payment_bank_submit: 'Submit Transfer Proof',
        payment_cod_title: 'Cash on Delivery (COD)',
        payment_cod_subtitle: 'Pay when you receive',
        payment_cod_how: 'How to Pay',
        payment_cod_prepare: 'Prepare exact cash amount',
        payment_cod_pay_delivery: 'Pay to delivery person',
        payment_cod_check: 'Check product before payment',
        payment_cod_note: 'Please Note',
        payment_cod_check_product: 'Check product condition before accepting',
        payment_cod_keep_receipt: 'Keep receipt as proof',
        payment_cod_contact: 'Contact us if any issues',
        payment_cod_confirm: 'Confirm Order',
        
        // Success
        success_title: 'Payment Successful!',
        success_message: 'Thank you for using FreshSip',
        success_order_number: 'Order Number',
        success_email_sent: 'Confirmation sent to email',
        success_delivery: 'Delivery in 30 minutes',
        success_back_home: 'Back to Home',
        
        // Notifications
        notif_login_required: 'Please login before ordering',
        notif_cart_empty: 'Cart is empty',
        notif_added_to_cart: 'Added to cart',
        notif_login_success: 'Login successful!',
        notif_login_failed: 'Invalid email or password',
        notif_register_success: 'Registration successful! Please login',
        notif_logout_success: 'Logout successful',
        
        // Profile & Settings
        profile_orders: 'Order History',
        profile_info: 'Profile',
        profile_settings: 'Settings',
        profile_title: 'My Profile',
        profile_change_avatar: 'Change Avatar',
        profile_orders_count: 'Orders',
        profile_total_spent: 'Total Spent',
        profile_member_days: 'Days',
        profile_name: 'Full Name',
        profile_email: 'Email',
        profile_joined: 'Member Since',
        profile_status: 'Status',
        profile_verified: 'Verified',
        profile_export: 'Export Data',
        
        // Settings
        settings_appearance: 'Appearance',
        settings_theme: 'Theme',
        settings_theme_light: 'Light',
        settings_theme_dark: 'Dark',
        settings_theme_auto: 'Auto',
        settings_theme_desc_light: 'Bright, Fresh',
        settings_theme_desc_dark: 'Dark, Eye-friendly',
        settings_theme_desc_auto: 'System Default',
        settings_font_size: 'Font Size',
        settings_font_small: 'Small',
        settings_font_medium: 'Medium',
        settings_font_large: 'Large',
        settings_language: 'Language',
        settings_language_th: 'ภาษาไทย',
        settings_language_en: 'English',
        settings_preferences: 'Preferences',
        settings_notifications: 'Notifications',
        settings_notifications_desc: 'Receive order and promotion notifications',
        settings_sound: 'Sound Effects',
        settings_sound_desc: 'Play sound on actions',
        settings_search_history: 'Search History',
        settings_search_history_desc: 'Save recent searches',
        settings_system: 'System',
        settings_reset: 'Reset Settings',
        settings_clear_cache: 'Clear Cache',
        settings_danger_zone: 'Danger Zone',
        settings_danger_desc: 'Deleting account will remove all data permanently',
        settings_delete_account: 'Delete Account',
        
        // Auth
        auth_login_title: 'Login',
        auth_login_subtitle: 'Welcome Back',
        auth_register_title: 'Register',
        auth_register_subtitle: 'Create New Account',
        auth_email: 'Email',
        auth_password: 'Password',
        auth_password_confirm: 'Confirm Password',
        auth_name: 'Full Name',
        auth_login_btn: 'Login',
        auth_register_btn: 'Register',
        auth_no_account: "Don't have an account?",
        auth_have_account: 'Already have an account?',
        auth_register_link: 'Register',
        auth_login_link: 'Login',
        
        // Footer
        footer_links: 'Quick Links',
        footer_contact: 'Contact Us',
        footer_desc: 'The best online beverage and snack shop',
        footer_rights: 'All rights reserved',
        
        // Order History
        orders_title: 'Order History',
        orders_subtitle: 'All your orders',
        orders_empty: 'No Order History',
        orders_empty_msg: 'Start shopping to see your orders here',
        orders_number: 'Order',
        orders_date: 'Date',
        orders_total: 'Total',
        orders_status: 'Status',
        orders_completed: 'Completed',
        
        // Common
        close: 'Close',
        ok: 'OK',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        search: 'Search',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Info',
    }
};

// Current language (default: Thai)
let currentLanguage = localStorage.getItem('language') || 'th';

// Get translation
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Change language
function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update all translated elements
    updateTranslations();
    
    // Update language selector UI
    updateLanguageUI();
    
    // Show notification
    const message = lang === 'th' ? 'เปลี่ยนภาษาเป็นไทยแล้ว' : 'Changed to English';
    if (typeof showNotification === 'function') {
        showNotification(message, 'success', t('success'));
    }
    
    // Play sound if enabled
    if (typeof userSettings !== 'undefined' && userSettings.soundEffects && typeof playSound === 'function') {
        playSound('click');
    }
}

// Update all translations on page
function updateTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        // Check if translation contains HTML
        if (translation.includes('<br>')) {
            element.innerHTML = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Update title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = t(key);
    });
}

// Update language selector UI
function updateLanguageUI() {
    // Update language buttons
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === currentLanguage) {
            option.classList.add('active');
        }
    });
    
    // Update language toggle button
    const langToggle = document.getElementById('languageToggle');
    if (langToggle) {
        langToggle.textContent = currentLanguage === 'th' ? '🇹🇭 TH' : '🇺🇸 EN';
    }
}

// Initialize translations on page load
function initializeTranslations() {
    updateTranslations();
    updateLanguageUI();
    console.log('🌍 Translations initialized:', currentLanguage);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTranslations);
} else {
    initializeTranslations();
}