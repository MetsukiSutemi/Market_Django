// Main JavaScript file for ChupepShop
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize components
    initSearch();
    initCategories();
    initCart();
    initAnimations();
    
    // Search functionality
    function initSearch() {
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.search-input');
        
        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    console.log('Searching for:', query);
                    // Add your search logic here
                    showNotification(`Поиск: ${query}`, 'info');
                }
            });
        }
    }
    
    // Categories functionality
    function initCategories() {
        const categoryCards = document.querySelectorAll('.category-card');
        const categoryLinks = document.querySelectorAll('.category-link');
        
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const categoryName = this.querySelector('span').textContent;
                console.log('Category selected:', categoryName);
                showNotification(`Категория: ${categoryName}`, 'success');
            });
        });
        
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const categoryName = this.textContent.trim();
                console.log('Category link clicked:', categoryName);
                showNotification(`Переход в категорию: ${categoryName}`, 'info');
            });
        });
    }
    
    // Cart functionality
    function initCart() {
        const cartBtn = document.querySelector('.cart-btn');
        const cartCount = document.querySelector('.cart-count');
        
        if (cartBtn && cartCount) {
            cartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Cart clicked');
                showNotification('Корзина открыта', 'info');
            });
            
            // Simulate cart updates
            setInterval(() => {
                const currentCount = parseInt(cartCount.textContent);
                if (Math.random() > 0.8) {
                    cartCount.textContent = currentCount + 1;
                    cartCount.style.animation = 'pulse 0.5s ease';
                    setTimeout(() => {
                        cartCount.style.animation = '';
                    }, 500);
                }
            }, 10000);
        }
    }
    
    // Animations
    function initAnimations() {
        // Add scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.quick-action-card, .category-card, .offer-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px; 
            right: 20px; 
            z-index: 9999; 
            min-width: 300px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        `;
        
        const icon = type === 'success' ? 'check-circle' : 
                    type === 'error' ? 'exclamation-circle' : 'info-circle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.main-nav');
        
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
            nav.classList.add('nav-scrolled');
        } else {
            header.classList.remove('header-scrolled');
            nav.classList.remove('nav-scrolled');
        }
    });
    
    // Mobile menu enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Console welcome message
    console.log('🛒 ChupepShop loaded successfully!');
    console.log('🌱 Green theme activated');
    console.log('�� Support: 8 800 555-35-35');
    console.log('📧 Email: support@chupeshop.ru');
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .header-scrolled {
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .nav-scrolled {
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Export for use in other scripts
window.ChupepShop = {
    showNotification: function(message, type) {
        // Implementation will be added by the main script
    }
};