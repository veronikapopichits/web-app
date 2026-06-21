document.addEventListener('DOMContentLoaded', function() {
    console.log("Скрипт вопросов загружен!");

    const form = document.getElementById('questionForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Отменяем перезагрузку страницы

            // Собираем данные
            const name = document.getElementById('qName').value.trim();
            const email = document.getElementById('qEmail').value.trim();
            const topic = document.getElementById('qTopic').value;
            const message = document.getElementById('qMessage').value.trim();
            const consent = document.getElementById('qConsent').checked;

            // Простая валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните имя, email и текст вопроса!');
                return;
            }
            if (!email.includes('@')) {
                alert('Пожалуйста, введите корректный email!');
                return;
            }
            if (!consent) {
                alert('Необходимо дать согласие на обработку персональных данных.');
                return;
            }

            // Имитация отправки на сервер
            console.log("Отправка данных:", { name, email, topic, message });

            // Визуальный фидбек
            const btn = form.querySelector('.btn-submit');
            btn.textContent = 'Отправка...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Симуляция задержки сети (1.5 секунды)
            setTimeout(() => {
                alert('Спасибо! Ваш вопрос отправлен чайному мастеру. Мы ответим в ближайшее время.');
                
                // Очистка формы
                form.reset();
                btn.textContent = 'Отправить вопрос';
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 1500);
        });
    }
});