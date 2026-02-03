// ========================================
// REAL-TIME SEARCH SYSTEM
// ========================================

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
const MAX_SEARCH_HISTORY = 10;

// Initialize Search
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Real-time search with debounce
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length > 0) {
            searchResults.classList.remove('hidden');
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300); // Debounce 300ms
        } else {
            searchResults.classList.add('hidden');
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
    
    // Show search history when focused
    searchInput.addEventListener('focus', function() {
        if (this.value.trim() === '' && searchHistory.length > 0) {
            showSearchHistory();
        }
    });
}

// Perform Search
function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    
    // Get all products
    const allProducts = [
        ...products.beverages.map(p => ({...p, category: 'เครื่องดื่ม'})),
        ...products.smoothies.map(p => ({...p, category: 'น้ำปั่น'})),
        ...products.snacks.map(p => ({...p, category: 'ของกินรองท้อง'})),
        ...(products.meals || []).map(p => ({...p, category: 'อาหาร'})),
        ...(products.desserts || []).map(p => ({...p, category: 'ของหวาน'}))
    ];
    
    // Search
    const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8); // Limit to 8 results
    
    // Display results
    if (results.length > 0) {
        searchResults.innerHTML = `
            <div class="search-results-header">
                <span>🔍 ผลการค้นหา "${query}"</span>
                <span class="search-count">${results.length} รายการ</span>
            </div>
            <div class="search-results-list">
                ${results.map(product => `
                    <div class="search-result-item" onclick="selectSearchResult(${product.id}, '${product.category}', '${product.name}')">
                        <div class="result-emoji">${product.emoji}</div>
                        <div class="result-info">
                            <div class="result-name">${highlightQuery(product.name, query)}</div>
                            <div class="result-category">${product.category}</div>
                        </div>
                        <div class="result-price">${product.price} ฿</div>
                    </div>
                `).join('')}
            </div>
            <div class="search-results-footer">
                <button class="btn-view-all" onclick="viewAllSearchResults('${query}')">
                    ดูทั้งหมด →
                </button>
            </div>
        `;
    } else {
        searchResults.innerHTML = `
            <div class="search-no-results">
                <div class="no-results-icon">😔</div>
                <div class="no-results-text">ไม่พบสินค้า "${query}"</div>
                <div class="no-results-hint">ลองค้นหาด้วยคำอื่นดูนะ</div>
            </div>
        `;
    }
}

// Highlight query in text
function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Select Search Result
function selectSearchResult(productId, category, productName) {
    // Save to search history
    if (userSettings.searchHistory) {
        saveSearchHistory(productName);
    }
    
    // Close search results
    document.getElementById('searchResults').classList.add('hidden');
    document.getElementById('searchInput').value = '';
    
    // Scroll to product category
    const categoryMap = {
        'เครื่องดื่ม': 'beveragesGrid',
        'น้ำปั่น': 'smoothiesGrid',
        'ของกินรองท้อง': 'snacksGrid',
        'อาหาร': 'mealsGrid',
        'ของหวาน': 'dessertsGrid'
    };
    
    const gridId = categoryMap[category];
    const grid = document.getElementById(gridId);
    
    if (grid) {
        // Scroll to category
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Highlight product card briefly
        setTimeout(() => {
            const cards = grid.querySelectorAll('.product-card');
            cards.forEach(card => {
                if (card.textContent.includes(productName)) {
                    card.classList.add('highlight-product');
                    setTimeout(() => {
                        card.classList.remove('highlight-product');
                    }, 2000);
                }
            });
        }, 500);
    }
}

// Save Search History
function saveSearchHistory(query) {
    // Remove if already exists
    searchHistory = searchHistory.filter(item => item !== query);
    
    // Add to beginning
    searchHistory.unshift(query);
    
    // Limit history
    if (searchHistory.length > MAX_SEARCH_HISTORY) {
        searchHistory = searchHistory.slice(0, MAX_SEARCH_HISTORY);
    }
    
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Show Search History
function showSearchHistory() {
    const searchResults = document.getElementById('searchResults');
    
    if (searchHistory.length === 0) return;
    
    searchResults.innerHTML = `
        <div class="search-results-header">
            <span>🕒 ประวัติการค้นหา</span>
            <button class="btn-clear-history" onclick="clearSearchHistory()">ล้างประวัติ</button>
        </div>
        <div class="search-history-list">
            ${searchHistory.map(query => `
                <div class="search-history-item" onclick="searchFromHistory('${query}')">
                    <span class="history-icon">🔍</span>
                    <span class="history-query">${query}</span>
                    <button class="btn-remove-history" onclick="event.stopPropagation(); removeFromHistory('${query}')">
                        ✕
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    searchResults.classList.remove('hidden');
}

// Clear Search History
function clearSearchHistory() {
    searchHistory = [];
    localStorage.removeItem('searchHistory');
    document.getElementById('searchResults').classList.add('hidden');
    showNotification('ล้างประวัติการค้นหาแล้ว', 'success', 'สำเร็จ');
}

// Remove from History
function removeFromHistory(query) {
    searchHistory = searchHistory.filter(item => item !== query);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    showSearchHistory();
}

// Search from History
function searchFromHistory(query) {
    document.getElementById('searchInput').value = query;
    performSearch(query);
    saveSearchHistory(query);
}

// View All Search Results
function viewAllSearchResults(query) {
    saveSearchHistory(query);
    document.getElementById('searchResults').classList.add('hidden');
    document.getElementById('searchInput').value = '';
    
    // Scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    
    showNotification(`กำลังแสดงผลการค้นหา "${query}"`, 'info', 'ค้นหา');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeSearch);