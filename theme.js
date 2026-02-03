// ========================================
// THEME SYSTEM (DARK/LIGHT MODE)
// ========================================

// Get current theme from settings or default to dark
let currentTheme = (typeof userSettings !== 'undefined' && userSettings.theme) || 
                   localStorage.getItem('theme') || 'dark';

// Apply theme
function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'auto') {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        
        // Update current theme for UI
        currentTheme = 'auto';
    } else {
        html.setAttribute('data-theme', theme);
        currentTheme = theme;
    }
    
    // Update meta theme color for mobile browsers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
        const actualTheme = html.getAttribute('data-theme');
        metaTheme.setAttribute('content', actualTheme === 'light' ? '#F7F7F7' : '#1A1A2E');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update theme toggle button
    updateThemeToggleButton();
}

// Toggle between light and dark (for quick toggle button)
function toggleTheme() {
    const html = document.documentElement;
    const currentActualTheme = html.getAttribute('data-theme');
    const newTheme = currentActualTheme === 'light' ? 'dark' : 'light';
    
    applyTheme(newTheme);
    
    // Update settings if available
    if (typeof userSettings !== 'undefined') {
        userSettings.theme = newTheme;
        if (typeof saveSettings === 'function') {
            saveSettings();
        }
    }
    
    // Show notification
    const message = currentLanguage === 'th' 
        ? `เปลี่ยนเป็นธีม${newTheme === 'light' ? 'กลางวัน' : 'กลางคืน'}แล้ว`
        : `Changed to ${newTheme} theme`;
    
    if (typeof showNotification === 'function') {
        showNotification(message, 'success', t('success'));
    }
    
    // Play sound if enabled
    if (typeof userSettings !== 'undefined' && userSettings.soundEffects && typeof playSound === 'function') {
        playSound('toggle');
    }
}

// Update theme toggle button UI
function updateThemeToggleButton() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const html = document.documentElement;
    const actualTheme = html.getAttribute('data-theme');
    
    if (actualTheme === 'light') {
        themeToggle.innerHTML = '☀️';
        themeToggle.title = currentLanguage === 'th' ? 'เปลี่ยนเป็นโหมดกลางคืน' : 'Switch to Dark Mode';
    } else {
        themeToggle.innerHTML = '🌙';
        themeToggle.title = currentLanguage === 'th' ? 'เปลี่ยนเป็นโหมดกลางวัน' : 'Switch to Light Mode';
    }
}

// Listen for system theme changes (for auto mode)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (currentTheme === 'auto') {
        applyTheme('auto');
    }
});

// Initialize theme on page load
function initializeTheme() {
    applyTheme(currentTheme);
    console.log('🎨 Theme initialized:', currentTheme);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}