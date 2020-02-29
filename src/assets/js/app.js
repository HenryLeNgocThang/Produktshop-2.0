document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    simpleLazyLoader();
    document.querySelector("#year").innerHTML = new Date().getFullYear();

    // TOGGLE BTN FOR DARKMODE
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

    // HERO FOLLOWING CIRCLE
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

    // FAVORITES
    (function () {
        var cartBtns = document.querySelectorAll(".shopping-cart");
        var gameJSON;
        var favorites = [];
        var saved;
    
        if (localStorage.getItem("favorite-games") !== null) {
            saved = JSON.parse(localStorage.getItem("favorite-games"));
        } else {
            localStorage.clear("favorite-games");
            saved = [];
        }

        loadJSON(function (response) {
            gameJSON = JSON.parse(response);

            for (let i = 0; i < cartBtns.length; i++) {
                cartBtns[i].addEventListener("click", () => {

                    if (favorites.indexOf(gameJSON.games[cartBtns[i].dataset.game]) != -1) {
                        favorites.splice(favorites.indexOf(gameJSON.games[cartBtns[i].dataset.game]), 1);
                        cartBtns[i].classList.remove("added-favorite");
                        localStorage.setItem("favorite-games", JSON.stringify(favorites));
                    } else {
                        favorites.push(gameJSON.games[cartBtns[i].dataset.game]);
                        cartBtns[i].classList.add("added-favorite");
                        localStorage.setItem("favorite-games", JSON.stringify(favorites));
                    }
                });

                for (let j = 0; j < saved.length; j++) {
                    if (gameJSON.games[cartBtns[i].dataset.game].article_number == saved[j].article_number) {
                        cartBtns[i].classList.add("added-favorite");
                        favorites.push(gameJSON.games[cartBtns[i].dataset.game]);

                        if (j == saved.length - 1) {
                            localStorage.setItem("favorite-games", JSON.stringify(favorites));
                        }
                    }
                }
            }
        });
    })();
});