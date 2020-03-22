document.addEventListener("DOMContentLoaded", () => {
    slider("#offers .le-slider-container");
    slider("#quotes .le-slider-container");

    var countDownElm = document.querySelectorAll("#offers .offer-text .offer-end-date");
    countDownElm.forEach(element => {
        countDown("May 1, 2020 00:00:00", element, "Nur noch ", "!");
    });
});