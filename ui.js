// ========================================
// UI RENDERING FUNCTIONS - FIXED VERSION
// ========================================

function renderProducts() {
    renderCategory('beverages', 'beveragesGrid');
    renderCategory('smoothies', 'smoothiesGrid');
    renderCategory('snacks', 'snacksGrid');
    
    const mealsGrid = document.getElementById('mealsGrid');
    const dessertsGrid = document.getElementById('dessertsGrid');
    
    if (mealsGrid && products.meals) {
        renderCategory('meals', 'mealsGrid');
    }
    
    if (dessertsGrid && products.desserts) {
        renderCategory('desserts', 'dessertsGrid');
    }
}

function renderCategory(category, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid || !products[category]) return;
    
    let html = '';
    
    products[category].forEach(product => {
        const productKey = product.id + '-' + category;
        const reviews = (typeof productReviews !== 'undefined' && productReviews[productKey]) || [];
        const avgRating = reviews.length > 0 
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) 
            : 0;
        const isFav = typeof isFavorite === 'function' ? isFavorite(product.id, category) : false;
        
        html += '<div class="product-card" style="position: relative;">';
        
        // FIXED: เพิ่ม event parameter และใช้ onclick แทน data attribute
        html += '<button class="favorite-btn ' + (isFav ? 'active' : '') + '" ';
        html += 'onclick="event.stopPropagation(); toggleFavorite(' + product.id + ', \'' + category + '\', event)" ';
        html += 'data-product-id="' + product.id + '" ';
        html += 'data-category="' + category + '">';
        html += isFav ? '❤️' : '🤍';
        html += '</button>';
        
        html += '<div class="product-image" onclick="showProductDetail(' + product.id + ', \'' + category + '\')" style="cursor: pointer;">';
        html += product.emoji;
        html += '</div>';
        
        html += '<div class="product-info">';
        html += '<h3 onclick="showProductDetail(' + product.id + ', \'' + category + '\')" style="cursor: pointer;">';
        html += product.name;
        html += '</h3>';
        
        if (reviews.length > 0) {
            html += '<div class="product-rating-display">';
            html += '<div class="rating-stars rating-stars-small">';
            html += generateStars(avgRating, 'small');
            html += '</div>';
            html += '<span class="rating-score">' + avgRating.toFixed(1) + '</span>';
            html += '<span class="rating-count">(' + reviews.length + ')</span>';
            html += '</div>';
        } else {
            html += '<div class="product-rating-display">';
            html += '<span class="rating-count" style="color: #999;">ยังไม่มีรีวิว</span>';
            html += '</div>';
        }
        
        html += '<div class="product-price">' + product.price.toLocaleString() + ' บาท</div>';
        html += '<button class="add-to-cart" onclick="addToCart(' + product.id + ', \'' + category + '\')">เพิ่มลงตะกร้า</button>';
        html += '</div>';
        html += '</div>';
    });
    
    grid.innerHTML = html;
    
    if (typeof updateFavoriteIcons === 'function') {
        updateFavoriteIcons();
    }
}

// Helper function for generating stars (if not already defined)
if (typeof generateStars !== 'function') {
    function generateStars(rating, size) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let html = '';
        
        for (let i = 0; i < fullStars; i++) {
            html += '<span class="star full">⭐</span>';
        }
        
        if (hasHalfStar) {
            html += '<span class="star half">⭐</span>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            html += '<span class="star empty">☆</span>';
        }
        
        return html;
    }
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();
});