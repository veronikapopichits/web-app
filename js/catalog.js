const sortSelect = document.getElementById("sortSelect");
const catalogGrid = document.getElementById("catalogGrid");

sortSelect.addEventListener("change", () => {

    const cards = Array.from(
        catalogGrid.querySelectorAll(".catalog-card")
    );

    if(sortSelect.value === "cheap"){

        cards.sort((a,b) =>
            a.dataset.price - b.dataset.price
        );

    }

    if(sortSelect.value === "expensive"){

        cards.sort((a,b) =>
            b.dataset.price - a.dataset.price
        );

    }

    catalogGrid.innerHTML = "";

    cards.forEach(card => {
        catalogGrid.appendChild(card);
    });

});