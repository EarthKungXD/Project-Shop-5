// ========================================
// APPLICATION INITIALIZATION
// ========================================

function init() {
    // Render all products
    renderProducts();
    
    // Check login status
    checkLogin();
    
    // Update cart badge
    updateCartBadge();
    
    console.log('🎉 FreshSip Application Initialized!');
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Prevent form submission default behavior
document.addEventListener('submit', function(e) {
    if (e.target.id === 'loginForm' || 
        e.target.id === 'registerForm' || 
        e.target.id === 'paymentForm') {
        // These are handled by their respective functions
    }
});

