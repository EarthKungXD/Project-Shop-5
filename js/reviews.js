// ========================================
// PRODUCT REVIEW & RATING SYSTEM
// ========================================

let productReviews = JSON.parse(localStorage.getItem('productReviews')) || {};

// Show Product Detail Modal with Reviews
function showProductDetail(productId, category) {
    const allProducts = [
        ...products.beverages.map(p => ({...p, category: 'beverages', categoryName: 'เครื่องดื่ม'})),
        ...products.smoothies.map(p => ({...p, category: 'smoothies', categoryName: 'น้ำปั่น'})),
        ...products.snacks.map(p => ({...p, category: 'snacks', categoryName: 'ของกินรองท้อง'})),
        ...(products.meals || []).map(p => ({...p, category: 'meals', categoryName: 'อาหาร'})),
        ...(products.desserts || []).map(p => ({...p, category: 'desserts', categoryName: 'ของหวาน'}))
    ];
    
    const product = allProducts.find(p => p.id == productId && p.category === category);
    if (!product) return;
    
    const productKey = `${productId}-${category}`;
    const reviews = productReviews[productKey] || [];
    const avgRating = calculateAverageRating(reviews);
    const ratingStats = calculateRatingStats(reviews);
    
    const modal = document.getElementById('productDetailModal');
    const content = document.getElementById('productDetailContent');
    
    content.innerHTML = `
        <div class="product-detail-header">
            <div class="product-detail-image">${product.emoji}</div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="product-category-badge">${product.categoryName}</div>
                <div class="product-rating-summary">
                    <div class="rating-stars-large">
                        ${generateStars(avgRating, 'large')}
                    </div>
                    <div class="rating-text">
                        <strong>${avgRating.toFixed(1)}</strong>
                        <span>(${reviews.length} รีวิว)</span>
                    </div>
                </div>
                <div class="product-price-large">${product.price.toLocaleString()} ฿</div>
                <div class="product-actions">
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id}, '${category}'); showNotification('เพิ่มลงตะกร้าแล้ว', 'success')">
                        🛒 เพิ่มลงตะกร้า
                    </button>
                    <button class="btn-favorite" onclick="toggleFavorite(${product.id}, '${category}')">
                        ${isFavorite(productId, category) ? '❤️' : '🤍'} ${isFavorite(productId, category) ? 'ลบออกจากโปรด' : 'เพิ่มลงโปรด'}
                    </button>
                </div>
            </div>
        </div>
        
        <div class="product-detail-tabs">
            <button class="detail-tab active" onclick="switchDetailTab('reviews')">
                📝 รีวิว (${reviews.length})
            </button>
            <button class="detail-tab" onclick="switchDetailTab('write-review')">
                ✍️ เขียนรีวิว
            </button>
        </div>
        
        <div id="reviewsTab" class="detail-tab-content active">
            ${reviews.length > 0 ? `
                <div class="rating-stats">
                    <div class="rating-bars">
                        ${[5,4,3,2,1].map(star => `
                            <div class="rating-bar-row">
                                <span class="star-label">${star} ⭐</span>
                                <div class="rating-bar">
                                    <div class="rating-bar-fill" style="width: ${ratingStats[star] || 0}%"></div>
                                </div>
                                <span class="rating-count">${reviews.filter(r => r.rating === star).length}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="reviews-list">
                    ${reviews.sort((a, b) => new Date(b.date) - new Date(a.date)).map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <div class="review-author">
                                    <img src="${review.avatar}" class="review-avatar" alt="Avatar">
                                    <div class="review-author-info">
                                        <div class="review-author-name">${review.userName}</div>
                                        <div class="review-date">${formatDate(review.date)}</div>
                                    </div>
                                </div>
                                <div class="review-rating">
                                    ${generateStars(review.rating, 'small')}
                                </div>
                            </div>
                            <div class="review-content">
                                <p>${review.comment}</p>
                            </div>
                            ${currentUser && currentUser.email === review.userEmail ? `
                                <button class="btn-delete-review" onclick="deleteReview('${productKey}', '${review.id}')">
                                    🗑️ ลบรีวิว
                                </button>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : `
                <div class="no-reviews">
                    <div class="no-reviews-icon">📝</div>
                    <h3>ยังไม่มีรีวิว</h3>
                    <p>เป็นคนแรกที่รีวิวสินค้านี้!</p>
                </div>
            `}
        </div>
        
        <div id="writeReviewTab" class="detail-tab-content">
            ${currentUser ? `
                <div class="write-review-form">
                    <h3>เขียนรีวิวของคุณ</h3>
                    <div class="form-group">
                        <label>ให้คะแนน</label>
                        <div class="rating-input">
                            ${[1,2,3,4,5].map(star => `
                                <button class="star-btn" data-rating="${star}" onclick="selectRating(${star})">
                                    ⭐
                                </button>
                            `).join('')}
                        </div>
                        <input type="hidden" id="reviewRating" value="5">
                    </div>
                    <div class="form-group">
                        <label>ความคิดเห็น</label>
                        <textarea id="reviewComment" rows="5" placeholder="เขียนรีวิวของคุณ..." required></textarea>
                    </div>
                    <button class="btn-submit-review" onclick="submitReview(${productId}, '${category}')">
                        ส่งรีวิว
                    </button>
                </div>
            ` : `
                <div class="login-required">
                    <div class="login-required-icon">🔒</div>
                    <h3>กรุณาเข้าสู่ระบบ</h3>
                    <p>คุณต้องเข้าสู่ระบบก่อนเขียนรีวิว</p>
                    <button class="btn-modal-primary" onclick="closeModal(); showLogin()">
                        เข้าสู่ระบบ
                    </button>
                </div>
            `}
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

// Switch Detail Tab
function switchDetailTab(tabName) {
    document.querySelectorAll('.detail-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.detail-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// Select Rating
function selectRating(rating) {
    document.getElementById('reviewRating').value = rating;
    
    document.querySelectorAll('.star-btn').forEach((btn, index) => {
        if (index < rating) {
            btn.classList.add('active');
            btn.textContent = '⭐';
        } else {
            btn.classList.remove('active');
            btn.textContent = '☆';
        }
    });
}

// Submit Review
function submitReview(productId, category) {
    if (!currentUser) {
        showNotification('กรุณาเข้าสู่ระบบ', 'error');
        return;
    }
    
    const rating = parseInt(document.getElementById('reviewRating').value);
    const comment = document.getElementById('reviewComment').value.trim();
    
    if (!comment) {
        showNotification('กรุณาเขียนความคิดเห็น', 'error');
        return;
    }
    
    const productKey = `${productId}-${category}`;
    
    if (!productReviews[productKey]) {
        productReviews[productKey] = [];
    }
    
    const review = {
        id: Date.now().toString(),
        rating: rating,
        comment: comment,
        userName: currentUser.name,
        userEmail: currentUser.email,
        avatar: currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`,
        date: new Date().toISOString()
    };
    
    productReviews[productKey].push(review);
    localStorage.setItem('productReviews', JSON.stringify(productReviews));
    
    showNotification('ส่งรีวิวสำเร็จ!', 'success', 'ขอบคุณ');
    
    // Refresh modal
    setTimeout(() => {
        showProductDetail(productId, category);
    }, 1000);
}

// Delete Review
function deleteReview(productKey, reviewId) {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบรีวิวนี้?')) return;
    
    if (productReviews[productKey]) {
        productReviews[productKey] = productReviews[productKey].filter(r => r.id !== reviewId);
        localStorage.setItem('productReviews', JSON.stringify(productReviews));
        
        showNotification('ลบรีวิวแล้ว', 'success');
        
        const [productId, category] = productKey.split('-');
        setTimeout(() => {
            showProductDetail(parseInt(productId), category);
        }, 500);
    }
}

// Calculate Average Rating
function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
}

// Calculate Rating Stats
function calculateRatingStats(reviews) {
    const stats = {};
    const total = reviews.length || 1;
    
    [5,4,3,2,1].forEach(star => {
        const count = reviews.filter(r => r.rating === star).length;
        stats[star] = (count / total) * 100;
    });
    
    return stats;
}

// Generate Stars HTML
function generateStars(rating, size = 'medium') {
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

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'วันนี้';
    if (diffDays === 1) return 'เมื่อวาน';
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`;
    
    return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Add rating display to product cards
function addRatingToProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.querySelector('h3').textContent;
        // This would need product ID to work properly
        // Implementation depends on how product cards are structured
    });
}