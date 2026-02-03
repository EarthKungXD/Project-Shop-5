// ========================================
// SETTINGS SYSTEM
// ========================================

// Default Settings
const defaultSettings = {
    theme: 'dark', // light, dark, auto
    fontSize: 'medium', // small, medium, large
    language: 'th', // th, en
    notifications: true,
    soundEffects: true,
    searchHistory: true
};

// Load Settings
let userSettings = JSON.parse(localStorage.getItem('userSettings')) || { ...defaultSettings };

// Initialize Settings on Page Load
function initializeSettings() {
    applyTheme(userSettings.theme);
    applyFontSize(userSettings.fontSize);
    console.log('⚙️ Settings initialized:', userSettings);
}

// Show Settings Modal
function showSettings() {
    closeProfileMenu();
    
    if (!currentUser) return;
    
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    
    // Update settings UI
    updateSettingsUI();
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

// Update Settings UI
function updateSettingsUI() {
    // Theme
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === userSettings.theme) {
            option.classList.add('active');
        }
    });
    
    // Font Size
    document.querySelectorAll('.font-size-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.size === userSettings.fontSize) {
            option.classList.add('active');
        }
    });
    
    // Language
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === userSettings.language) {
            option.classList.add('active');
        }
    });
    
    // Toggles
    document.getElementById('notificationsToggle')?.classList.toggle('active', userSettings.notifications);
    document.getElementById('soundEffectsToggle')?.classList.toggle('active', userSettings.soundEffects);
    document.getElementById('searchHistoryToggle')?.classList.toggle('active', userSettings.searchHistory);
}

// Change Theme - แก้ไขให้เปลี่ยนทันที
function changeTheme(theme) {
    userSettings.theme = theme;
    saveSettings();
    applyTheme(theme);
    updateSettingsUI();
    
    // แสดง notification
    const themeNames = {
        light: 'กลางวัน',
        dark: 'กลางคืน',
        auto: 'อัตโนมัติ'
    };
    showNotification(`เปลี่ยนเป็นธีม${themeNames[theme]}แล้ว`, 'success', 'สำเร็จ');
    
    // Play sound if enabled
    if (userSettings.soundEffects) {
        playSound('click');
    }
}

// Apply Theme - ใช้งานได้ทันทีทั้งเว็บ
function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'auto') {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        html.setAttribute('data-theme', theme);
    }
    
    // Update meta theme color for mobile browsers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        metaTheme.setAttribute('content', theme === 'light' ? '#F7F7F7' : '#1A1A2E');
    }
}

// Change Font Size
function changeFontSize(size) {
    userSettings.fontSize = size;
    saveSettings();
    applyFontSize(size);
    updateSettingsUI();
    
    const sizeNames = {
        small: 'เล็ก',
        medium: 'กลาง',
        large: 'ใหญ่'
    };
    showNotification(`เปลี่ยนขนาดตัวอักษรเป็น${sizeNames[size]}แล้ว`, 'success', 'สำเร็จ');
    
    if (userSettings.soundEffects) {
        playSound('click');
    }
}

// Apply Font Size
function applyFontSize(size) {
    const html = document.documentElement;
    
    const sizes = {
        small: '14px',
        medium: '16px',
        large: '18px'
    };
    
    html.style.fontSize = sizes[size] || sizes.medium;
}

// Change Language - แก้ไขให้ทำงานทันที
function changeLanguage(lang) {
    userSettings.language = lang;
    saveSettings();
    updateSettingsUI();
    
    if (userSettings.soundEffects) {
        playSound('click');
    }
    
    // Show notification
    const messages = {
        th: 'เปลี่ยนภาษาเป็นไทยแล้ว',
        en: 'Changed to English'
    };
    
    showNotification(messages[lang], 'success', 'สำเร็จ');
}

// Toggle Setting
function toggleSetting(setting) {
    userSettings[setting] = !userSettings[setting];
    saveSettings();
    updateSettingsUI();
    
    if (userSettings.soundEffects && setting !== 'soundEffects') {
        playSound('toggle');
    }
    
    // Show notification
    const messages = {
        notifications: userSettings.notifications ? 'เปิดการแจ้งเตือน' : 'ปิดการแจ้งเตือน',
        soundEffects: userSettings.soundEffects ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียงเอฟเฟกต์',
        searchHistory: userSettings.searchHistory ? 'เปิดประวัติการค้นหา' : 'ปิดประวัติการค้นหา'
    };
    
    showNotification(messages[setting], 'success', 'สำเร็จ');
}

// Save Settings
function saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

// Reset Settings - รีเซ็ทเลย ไม่ต้องถาม
function resetSettings() {
    userSettings = { ...defaultSettings };
    saveSettings();
    initializeSettings();
    updateSettingsUI();
    showNotification('รีเซ็ตการตั้งค่าสำเร็จ', 'success', 'สำเร็จ');
}

// Clear Cache - ล้างเลย ไม่ต้องถาม
function clearCache() {
    // Clear everything except user data
    const userDataKeys = ['currentUser', 'users', 'orderHistory', 'userSettings'];
    const keysToRemove = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!userDataKeys.includes(key)) {
            keysToRemove.push(key);
        }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    showNotification('ล้างแคชสำเร็จ', 'success', 'สำเร็จ');
}

// Delete Account - เก็บ modal ไว้เพราะเป็นการลบบัญชีที่อันตราย
function deleteAccount() {
    if (!currentUser) return;
    
    // ใช้ showNotification แบบพิเศษ
    if (!confirm(`⚠️ คุณแน่ใจหรือไม่ที่จะลบบัญชี ${currentUser.email}\n\nการกระทำนี้ไม่สามารถย้อนกลับได้!`)) {
        return;
    }
    
    // Remove user from users array
    users = users.filter(u => u.email !== currentUser.email);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Remove order history
    delete orderHistory[currentUser.email];
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    // Logout
    logout();
    closeModal();
    
    showNotification('ลบบัญชีสำเร็จ', 'success', 'ลาก่อน');
}

// Play Sound Effect
function playSound(type) {
    if (!userSettings.soundEffects) return;
    
    // Create audio context for sound effects
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        // Different sounds for different actions
        const sounds = {
            click: { frequency: 800, duration: 0.05 },
            toggle: { frequency: 600, duration: 0.08 },
            success: { frequency: 1000, duration: 0.1 }
        };
        
        const sound = sounds[type] || sounds.click;
        
        oscillator.frequency.value = sound.frequency;
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + sound.duration);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + sound.duration);
    } catch (e) {
        console.log('Sound not supported');
    }
}

// Switch Profile Tab
function switchProfileTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab
    document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    document.getElementById(`${tabName}Tab`)?.classList.add('active');
    
    if (userSettings.soundEffects) {
        playSound('click');
    }
}

// Export Data
function exportUserData() {
    if (!currentUser) return;
    
    const userData = {
        profile: currentUser,
        orders: orderHistory[currentUser.email] || [],
        settings: userSettings,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `FreshSip_${currentUser.email}_${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    showNotification('ส่งออกข้อมูลสำเร็จ', 'success', 'สำเร็จ');
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (userSettings.theme === 'auto') {
        applyTheme('auto');
    }
});

// Initialize settings when DOM loads
document.addEventListener('DOMContentLoaded', initializeSettings);
