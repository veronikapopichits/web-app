document.addEventListener('DOMContentLoaded', function() {
    console.log("Скрипт теста с аналитикой загружен!");

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const steps = document.querySelectorAll('.quiz-step');
    const stepperSteps = document.querySelectorAll('.step');
    
    let currentStep = 1;
    let userAnswers = {};

    function updateUI() {
        steps.forEach((step, index) => {
            step.classList.toggle('active-step', (index + 1) === currentStep);
        });
        stepperSteps.forEach((s, index) => {
            s.classList.toggle('active', (index + 1) === currentStep);
        });

        prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
        
        if(currentStep === 4) {
            nextBtn.style.display = 'none';
            generateResult();
        } else {
            nextBtn.style.display = 'inline-block';
            nextBtn.innerText = 'Далее >';
        }
    }

    const cards = document.querySelectorAll('.option-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const parentStep = this.closest('.quiz-step');
            const stepNum = parentStep.getAttribute('data-step');

            parentStep.querySelectorAll('.option-card').forEach(el => el.classList.remove('selected'));
            this.classList.add('selected');
            userAnswers[stepNum] = this.getAttribute('data-value');
        });
    });

    nextBtn.addEventListener('click', function() {
        if (!userAnswers[currentStep]) {
            alert('Пожалуйста, выберите один из вариантов!');
            return;
        }
        if(currentStep < 4) {
            currentStep++;
            updateUI();
        }
    });

    prevBtn.addEventListener('click', function() {
        if(currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    // ==========================================
    // БАЗА ЧАЕВ (БОЛЕЕ 40 ВАРИАНТОВ)
    // ==========================================
    const teaDatabase = [
        // УТРО (morning)
        { name: "Зелёный чай с жасмином", desc: "Нежный цветочный аромат бодрит с утра.", icon: "🍵", time: "morning", effect: "energy", taste: "floral" },
        { name: "Чёрный чай с бергамотом", desc: "Классический Earl Grey для бодрого старта.", icon: "☕", time: "morning", effect: "energy", taste: "classic" },
        { name: "Пуэр Шен", desc: "Мягкий, чуть сладковатый. Дарит ясность ума.", icon: "🫖", time: "morning", effect: "calm", taste: "herbal" },
        { name: "Имбирный чай", desc: "Согревает и тонизирует холодным утром.", icon: "🫚", time: "morning", effect: "energy", taste: "herbal" },
        { name: "Улун с женьшенем", desc: "Терпкий, с лёгкой горчинкой. Идеален для подзарядки.", icon: "🧘", time: "morning", effect: "energy", taste: "herbal" },
        { name: "Мятный чай", desc: "Освежает и проясняет мысли после пробуждения.", icon: "🌿", time: "morning", effect: "calm", taste: "herbal" },
        { name: "Чай с лимонником", desc: "Кисло-сладкий, повышает тонус организма.", icon: "🍋", time: "morning", effect: "energy", taste: "floral" },
        { name: "Белый чай с персиком", desc: "Очень лёгкий, фруктовый для плавного пробуждения.", icon: "🍑", time: "morning", effect: "calm", taste: "floral" },

        // ПОЛДЕНЬ (afternoon)
        { name: "Молочный улун", desc: "Нежный, сливочный, обволакивающий вкус.", icon: "🥛", time: "afternoon", effect: "relax", taste: "floral" },
        { name: "Травяной сбор с ромашкой", desc: "Успокаивает и дарит чувство защищённости.", icon: "🌼", time: "afternoon", effect: "relax", taste: "herbal" },
        { name: "Ассам", desc: "Насыщенный, терпкий индийский чай для перерыва.", icon: "💪", time: "afternoon", effect: "energy", taste: "classic" },
        { name: "Зелёный чай с мятой и лаймом", desc: "Свежий, цитрусовый коктейль.", icon: "🍹", time: "afternoon", effect: "energy", taste: "floral" },
        { name: "Каркаде (Гибискус)", desc: "Кисло-сладкий, бодрящий красный чай.", icon: "🫐", time: "afternoon", effect: "energy", taste: "floral" },
        { name: "Кенийский чёрный чай", desc: "Крепкий, с нотками какао для снятия усталости.", icon: "🍫", time: "afternoon", effect: "calm", taste: "classic" },
        { name: "Лавандовый чай", desc: "Ароматный и успокаивающий для дневного релакса.", icon: "💜", time: "afternoon", effect: "relax", taste: "herbal" },
        { name: "Сенча", desc: "Японский зелёный чай с деликатным вкусом.", icon: "🇯🇵", time: "afternoon", effect: "calm", taste: "herbal" },

        // ВЕЧЕР (evening)
        { name: "Ромашковый чай", desc: "Золотой напиток для глубокого расслабления.", icon: "🌙", time: "evening", effect: "relax", taste: "herbal" },
        { name: "Мятный с мелиссой", desc: "Лёгкий, успокаивающий, полезен перед сном.", icon: "🪴", time: "evening", effect: "relax", taste: "herbal" },
        { name: "Имбирно-лимонный с мёдом", desc: "Горячий, лечебный, согревающий.", icon: "🍯", time: "evening", effect: "relax", taste: "herbal" },
        { name: "Чай с чабрецом", desc: "Пряный, с нотками тимьяна. Снимает усталость.", icon: "✨", time: "evening", effect: "relax", taste: "herbal" },
        { name: "Тёмный Улун (Да Хун Пао)", desc: "Глубокий, бархатистый вечерний ритуал.", icon: "🧧", time: "evening", effect: "calm", taste: "classic" },
        { name: "Черный чай с ягодами", desc: "Сладкий, ягодный, дарит ощущение уюта.", icon: "🍓", time: "evening", effect: "calm", taste: "floral" },
        { name: "Чай с шиповником", desc: "Витаминный, кисло-сладкий для иммунитета.", icon: "🍊", time: "evening", effect: "calm", taste: "floral" },
        { name: "Пуэр Шу", desc: "Землистый, насыщенный, согревает изнутри.", icon: "🪨", time: "evening", effect: "relax", taste: "classic" },

        // ЦВЕТОЧНЫЕ (floral) - доп. коктейли
        { name: "Чай с бутонами розы", desc: "Романтичный и нежный, поднимает настроение.", icon: "🌹", time: "afternoon", effect: "relax", taste: "floral" },
        { name: "Зелёный жасмин с сахаром", desc: "Классический азиатский вариант.", icon: "🏵️", time: "morning", effect: "calm", taste: "floral" },

        // ПРЯНЫЕ (herbal) - доп.
        { name: "Чай с корицей и апельсином", desc: "Согревающий, пряный и сладкий.", icon: "🍊", time: "evening", effect: "relax", taste: "herbal" },
        { name: "Французский травяной сбор", desc: "Смесь лаванды, ромашки и мяты.", icon: "🇫🇷", time: "evening", effect: "relax", taste: "herbal" },
        { name: "Мате", desc: "Бодрящий южноамериканский напиток.", icon: "🧉", time: "morning", effect: "energy", taste: "herbal" },

        // КЛАССИЧЕСКИЕ (classic) - доп.
        { name: "Цейлонский чай", desc: "Классический, сочный, яркий вкус.", icon: "☕", time: "morning", effect: "energy", taste: "classic" },
        { name: "Дарджилинг", desc: "Король чаёв, мускатный оттенок.", icon: "👑", time: "afternoon", effect: "calm", taste: "classic" },
        { name: "Кенийский чай с молоком", desc: "Бодрый, сливочный масала-чай.", icon: "🥛", time: "morning", effect: "energy", taste: "classic" },

        // ВАРИАНТЫ ДЛЯ ДРУГИХ КОМБО
        { name: "Травяной успокаивающий", desc: "С мятой и мелиссой для гармонии.", icon: "🌱", time: "afternoon", effect: "relax", taste: "herbal" },
        { name: "Чай с морозником", desc: "Зимний пряный напиток.", icon: "❄️", time: "evening", effect: "calm", taste: "herbal" },
        { name: "Красный чай с яблоком", desc: "Мягкий, слегка сладкий, уютный.", icon: "🍎", time: "afternoon", effect: "calm", taste: "floral" },
        { name: "Гречишный чай", desc: "Ореховый, полезный, без кофеина.", icon: "🌾", time: "afternoon", effect: "calm", taste: "herbal" },
        { name: "Белый чай с пионом", desc: "Дорогой, изысканный, эстетичный.", icon: "🌸", time: "morning", effect: "calm", taste: "floral" },
        { name: "Английский завтрак", desc: "Самая классическая терпкая смесь.", icon: "🇬🇧", time: "morning", effect: "energy", taste: "classic" },
        { name: "Тайский чай", desc: "Оранжевый, сладкий, сливочный.", icon: "🟠", time: "afternoon", effect: "energy", taste: "floral" }
    ];

    // ==========================================
    // ФУНКЦИЯ АНАЛИЗА И РЕКОМЕНДАЦИЙ
    // ==========================================
    function generateResult() {
        const userTime = userAnswers['1'];
        const userEffect = userAnswers['2'];
        const userTaste = userAnswers['3'];

        // Если по какой-то причине нет ответов, показываем дефолт
        if (!userTime || !userEffect || !userTaste) {
            document.getElementById('resultContainer').innerHTML = `
                <div class="result-item"><div class="r-icon">🍵</div><div class="r-title">Молочный улун</div><div class="r-desc">Классический выбор на любой случай.</div></div>
            `;
            return;
        }

        // 1. Считаем очки совпадений для каждого чая
        const scoredTeas = teaDatabase.map(tea => {
            let score = 0;
            if (tea.time === userTime) score += 2;      // Совпадение времени дает +2 очка
            if (tea.effect === userEffect) score += 2;  // Совпадение эффекта дает +2 очка
            if (tea.taste === userTaste) score += 1;    // Совпадение вкуса дает +1 очко
            return { ...tea, score };
        });

        // 2. Сортируем по убыванию очков (самые подходящие вверху)
        scoredTeas.sort((a, b) => b.score - a.score);

        // 3. Отбираем лучшие варианты (у которых score >= 3), но не больше 5 штук, 
        //    и если нет совпадений на 3+, берем топ-3 любых.
        let bestMatches = scoredTeas.filter(t => t.score >= 3);
        
        if (bestMatches.length === 0) {
            bestMatches = scoredTeas.slice(0, 3);
        } else if (bestMatches.length > 3) {
            bestMatches = bestMatches.slice(0, 3); // Оставляем только 3 лучших
        }

        // 4. Генерируем HTML для вывода карточек
        let cardsHtml = bestMatches.map(tea => `
            <div class="result-item">
                <div class="r-icon">${tea.icon}</div>
                <div class="r-title">${tea.name}</div>
                <div class="r-desc">${tea.desc}</div>
                <div class="r-match">Совпадение: ${tea.score} из 5</div>
            </div>
        `).join('');

        // Выводим в специальный контейнер
        document.getElementById('resultContainer').innerHTML = cardsHtml;
    }
    
    // ПЕРВОНАЧАЛЬНЫЙ ЗАПУСК
    updateUI();
});