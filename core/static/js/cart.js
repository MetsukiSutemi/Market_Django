// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize cart
    initCart();
    
    // Cart functions
    function initCart() {
        updateCartTotal();
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Quantity input changes
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const itemId = this.closest('.cart-item').dataset.itemId;
                updateQuantity(itemId, this.value);
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.itemId;
                removeItem(itemId);
            });
        });
        
        // Delivery options
        document.querySelectorAll('.delivery-option').forEach(option => {
            option.addEventListener('click', function() {
                selectDeliveryOption(this);
            });
        });
    }
    
    // Update quantity
    window.updateQuantity = function(itemId, change) {
        const item = document.querySelector(`[data-item-id="${itemId}"]`);
        const input = item.querySelector('.quantity-input');
        const currentValue = parseInt(input.value);
        
        if (typeof change === 'number') {
            // Increment/decrement
            const newValue = Math.max(1, Math.min(10, currentValue + change));
            input.value = newValue;
        } else {
            // Direct value
            input.value = Math.max(1, Math.min(10, parseInt(change) || 1));
        }
        
        updateItemTotal(item);
        updateCartTotal();
        showNotification('Количество обновлено', 'success');
    }
    
    // Remove item
    window.removeItem = function(itemId) {
        const item = document.querySelector(`[data-item-id="${itemId}"]`);
        
        if (confirm('Удалить товар из корзины?')) {
            item.style.animation = 'slideOut 0.3s ease forwards';
            
            setTimeout(() => {
                item.remove();
                updateCartTotal();
                checkEmptyCart();
                showNotification('Товар удален из корзины', 'info');
            }, 300);
        }
    }
    
    // Update item total
    function updateItemTotal(item) {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        const priceElement = item.querySelector('.current-price');
        const basePrice = parseFloat(priceElement.textContent.replace(/[^\d]/g, ''));
        const total = basePrice * quantity;
        
        // You can add a total display for each item if needed
        console.log(`Item total: ${total} ₽`);
    }
    
    // Update cart total
    function updateCartTotal() {
        const items = document.querySelectorAll('.cart-item');
        let total = 0;
        let itemCount = 0;
        
        items.forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            const priceElement = item.querySelector('.current-price');
            const price = parseFloat(priceElement.textContent.replace(/[^\d]/g, ''));
            
            total += price * quantity;
            itemCount += quantity;
        });
        
        // Update summary
        const summaryItems = document.querySelector('.summary-item:first-child span:last-child');
        const summaryTotal = document.querySelector('.total-price');
        const cartCount = document.querySelector('.cart-count');
        
        if (summaryItems) summaryItems.textContent = `${total.toLocaleString()} ₽`;
        if (summaryTotal) summaryTotal.textContent = `${total.toLocaleString()} ₽`;
        if (cartCount) cartCount.textContent = itemCount;
        
        // Update cart subtitle
        const cartSubtitle = document.querySelector('.cart-subtitle');
        if (cartSubtitle) {
            cartSubtitle.textContent = `В вашей корзине ${itemCount} товар${itemCount % 10 === 1 && itemCount % 100 !== 11 ? '' : itemCount % 10 >= 2 && itemCount % 10 <= 4 && (itemCount % 100 < 10 || itemCount % 100 >= 20) ? 'а' : 'ов'}`;
        }
    }
    
    // Check if cart is empty
    function checkEmptyCart() {
        const items = document.querySelectorAll('.cart-item');
        const emptyCart = document.querySelector('.empty-cart');
        const cartItems = document.querySelector('.cart-items');
        
        if (items.length === 0) {
            cartItems.style.display = 'none';
            emptyCart.style.display = 'block';
        }
    }
    
    // Select delivery option
    function selectDeliveryOption(option) {
        document.querySelectorAll('.delivery-option').forEach(opt => {
            opt.classList.remove('active');
        });
        option.classList.add('active');
        
        const deliveryText = option.querySelector('span').textContent;
        showNotification(`Выбрана доставка: ${deliveryText}`, 'success');
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
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Checkout function
    document.querySelector('.btn-checkout')?.addEventListener('click', function() {
        showNotification('Переход к оформлению заказа...', 'info');
        // Add your checkout logic here
    });
    
    // Add slideOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-100%);
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('�� Cart functionality loaded successfully!');
});

// Export for use in other scripts
window.CartManager = {
    updateQuantity: window.updateQuantity,
    removeItem: window.removeItem
};