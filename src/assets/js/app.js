document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelector("#year").innerHTML = new Date().getFullYear();

    slider("#offers .le-slider-container");
    slider("#offers-2 .le-slider-container");

    (function () {
        var themeToggle = document.querySelector("#hero .label input");
        var body = document.querySelector("body");

        themeToggle.addEventListener("click", () => {
            if (themeToggle.checked == true) {
                body.classList.remove("light-mode");
                body.classList.add("dark-mode");
            } else {
                body.classList.remove("dark-mode");
                body.classList.add("light-mode");
            }
        });
    })();

    (function () {
        var hero = document.querySelector("#hero");
        var circle = hero.querySelector(".hero-circle");
        var mouseX = 0,
            mouseY = 0;
        var xp = 0,
            yp = 0;
        var lerp = 2;

        hero.addEventListener("mousemove", (e) => {
            mouseX = e.pageX - circle.getBoundingClientRect().width / 2;
            mouseY = e.pageY - circle.getBoundingClientRect().height / 2;
        });

        setInterval(function () {
            xp += ((mouseX - xp) / lerp);
            yp += ((mouseY - yp) / lerp);

            circle.style.left = xp + "px";
            circle.style.top = yp + "px";
        }, 1000 / 60);
    })();

    (function() {

    })();
});