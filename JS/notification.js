// ========================================
// CUSTOM NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info', title = '') {
    const notification = document.getElementById('customNotification');
    const overlay = document.getElementById('notificationOverlay');
    const icon = document.getElementById('notificationIcon');
    const titleEl = document.getElementById('notificationTitle');
    const messageEl = document.getElementById('notificationMessage');

    // Set icon based on type
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    // Set title based on type if not provided
    const titles = {
        success: title || 'สำเร็จ!',
        error: title || 'เกิดข้อผิดพลาด',
        info: title || 'แจ้งเตือน'
    };

    icon.textContent = icons[type] || icons.info;
    titleEl.textContent = titles[type];
    messageEl.textContent = message;

    // Remove previous type classes
    notification.classList.remove('success', 'error', 'info');
    notification.classList.add(type);

    // Show notification
    overlay.classList.add('show');
    notification.classList.add('show');

    // Auto hide after 3 seconds for success and info messages
    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            closeNotification();
        }, 3000);
    }
}

function closeNotification() {
    const notification = document.getElementById('customNotification');
    const overlay = document.getElementById('notificationOverlay');
    
    notification.classList.remove('show');
    overlay.classList.remove('show');
}

// Close notification when clicking overlay
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('notificationOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeNotification);
    }
});