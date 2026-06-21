/* js/cart.js */
console.log("✅ cart.js загружен!");

// ==========================================
// 1. БАЗА ТОВАРОВ
// ==========================================
const productsDB = [
    { id: 'молочный-улун', name: 'Молочный улун', price: 7, img: 'images/tea3.png' },
    { id: 'ромашковый-чай', name: 'Ромашковый чай', price: 6, img: 'images/tea2.png' },
    { id: 'гречишный-чай', name: 'Гречишный чай', price: 9, img: 'images/tea1.png' }
];

// ==========================================
// 2. ЛОГИКА КОРЗИНЫ
// ==========================================
function getCart() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}
function updateCartCounter() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.querySelector('.cart-count');
    if (cartBadge) {
        cartBadge.innerText = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}
function addToCart(name, price) {
    let cart = getCart();
    const id = name.toLowerCase().replace(/\s+/g, '-');
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: id, name: name, price: price, quantity: 1 });
    }
    saveCart(cart);
    alert(`"${name}" добавлен в корзину!`);
}
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCart();
}

// ==========================================
// 3. ОТРИСОВКА КОРЗИНЫ
// ==========================================
function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    const totalContainer = document.getElementById('cartTotal');
    if (!cartContainer) return; 

    const cart = getCart();
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align:center; padding: 50px; color:#777;">
                <div style="font-size: 64px; margin-bottom: 20px;">🛒</div>
                <h2 style="color:#333; margin-bottom: 10px;">Ваша корзина пуста</h2>
                <p>Добавьте понравившиеся чаи из каталога.</p>
                <br>
                <a href="catalog.html" style="display:inline-block; background:#6BA048; color:white; padding: 12px 30px; border-radius:6px; text-decoration:none;">Перейти в каталог</a>
            </div>
        `;
        totalContainer.innerHTML = '';
        return;
    }
    
    let totalSum = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalSum += itemTotal;
        
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price} Руб × ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-total">${itemTotal} Руб</span>
                <button class="btn-remove" onclick="removeFromCart('${item.id}')">✕</button>
            </div>
        `;
        cartContainer.appendChild(row);
    });
    
    totalContainer.innerHTML = `
        <div class="cart-summary">
            <strong>Итого: ${totalSum} Руб</strong>
            <button class="btn-checkout" onclick="alert('Переход к оформлению заказа!')">Оформить заказ</button>
        </div>
    `;
}

// ==========================================
// 4. ОТРИСОВКА ИЗБРАННОГО
// ==========================================
function renderFavorites() {
    const container = document.getElementById('favoritesContainer');
    if (!container) return;

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="favorites-empty">
                <div style="font-size: 64px; margin-bottom: 20px;">💔</div>
                <h2>Список избранного пуст</h2>
                <p>Добавьте понравившиеся товары в избранное, нажав на сердечко.</p>
                <br>
                <a href="catalog.html" style="display:inline-block; background:#6BA048; color:white; padding: 12px 30px; border-radius:6px; text-decoration:none;">Перейти в каталог</a>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    
    // Фильтруем товары из базы, которые есть в избранном
    const favProducts = productsDB.filter(item => favorites.includes(item.id));

    favProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'catalog-card';
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${product.img}" alt="${product.name}">
            </div>
            <h3 class="card-title">${product.name}</h3>
            <div class="card-meta">
                <span class="card-price">${product.price} Руб</span>
                <span class="card-icon">❤️</span>
            </div>
            <div class="card-bottom">
                <button class="btn-cart">В корзину</button>
                <!-- Теперь сердечко маленькое и аккуратное -->
                <button class="btn-fav-small" style="background:none; border:none; font-size:18px; color:#e74c3c; cursor:pointer;" onclick="removeFavorite('${product.id}')">♥</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Функция удаления из избранного прямо со страницы
function removeFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites(); // Мгновенно перерисовываем список
}

// ==========================================
// 5. ЗАПУСК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
    
    if (document.getElementById('cartContainer')) {
        renderCart();
    }
    if (document.getElementById('favoritesContainer')) {
        renderFavorites();
    }
    
    document.querySelectorAll('.btn-cart, .btn-add-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            let name = 'Товар';
            let price = 0;
            
            const rightCol = this.closest('.right-col');
            if (rightCol) {
                name = rightCol.querySelector('h1')?.innerText || 'Товар';
                const priceText = rightCol.querySelector('.price')?.innerText || '0 Руб';
                price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
            } else {
                const card = this.closest('.catalog-card');
                if (card) {
                    name = card.querySelector('.card-title')?.innerText || 'Товар';
                    const priceText = card.querySelector('.card-price')?.innerText || '0 Руб';
                    price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
                }
            }
            addToCart(name, price);
        });
    });
});
