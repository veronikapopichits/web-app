/* js/product.js */

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ product.js загружен!");

    // --- 0. При загрузке проверяем, какие товары уже в избранном, и красим их ---
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Красим сердечки в каталоге (ищем по .btn-heart)
    document.querySelectorAll('.btn-heart').forEach(btn => {
        const card = btn.closest('.catalog-card');
        const title = card?.querySelector('.card-title')?.innerText || '';
        const id = title.toLowerCase().replace(/\s+/g, '-');
        
        if (favorites.includes(id)) {
            btn.innerText = '♥';
            btn.style.color = '#e74c3c';
        }
    });

    // Красим сердечки на страницах продуктов (ищем по .btn-fav)
    document.querySelectorAll('.btn-fav').forEach(btn => {
        const productPage = btn.closest('.right-col');
        const title = productPage?.querySelector('h1')?.innerText || '';
        const id = title.toLowerCase().replace(/\s+/g, '-');
        
        if (favorites.includes(id)) {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#e74c3c';
            }
        }
    });

    // --- 2. Кнопки "Сердечко" (Избранное) ---
    document.querySelectorAll('.btn-heart, .btn-fav').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            let title = 'Товар';
            const card = this.closest('.catalog-card');
            const productPage = this.closest('.right-col');

            if (productPage) {
                title = productPage.querySelector('h1')?.innerText || 'Товар';
            } else if (card) {
                title = card.querySelector('.card-title')?.innerText || 'Товар';
            }

            const id = title.toLowerCase().replace(/\s+/g, '-');
            
            let favs = JSON.parse(localStorage.getItem('favorites')) || [];
            
            if (favs.includes(id)) {
                // Удаляем
                favs = favs.filter(item => item !== id);
                
                // Для каталога
                if (this.classList.contains('btn-heart')) {
                    this.innerText = '♡';
                    this.style.color = '#555';
                }
                // Для продукта
                if (this.classList.contains('btn-fav')) {
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-solid');
                        icon.classList.add('fa-regular');
                        icon.style.color = '#333';
                    }
                }
                alert('Товар удалён из избранного');
            } else {
                // Добавляем
                favs.push(id);
                
                // Для каталога
                if (this.classList.contains('btn-heart')) {
                    this.innerText = '♥';
                    this.style.color = '#e74c3c';
                }
                // Для продукта
                if (this.classList.contains('btn-fav')) {
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-regular');
                        icon.classList.add('fa-solid');
                        icon.style.color = '#e74c3c';
                    }
                }
                alert('Товар добавлен в избранное!');
            }
            
            localStorage.setItem('favorites', JSON.stringify(favs));
        });
    });
});