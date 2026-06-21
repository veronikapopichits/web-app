console.log("Сайт Время Чая загружен");

const buttons = document.querySelectorAll(".small-btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        alert("Товар добавлен в корзину");

    });

});