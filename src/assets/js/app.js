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
        let themeToggle = document.querySelector("#hero .label input");
        let body = document.querySelector("body");

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

    // NAVBAR SEARCH INPUT
    (function() {
        let searchInput = document.querySelector("#navbar-search-input");
        let datalist = document.querySelector("#navbar-search-datalist");
        let gameJSON;
        let gameArray;
        let options = [];
        let gameTitle = [];

        loadJSON(function (response) {
            gameJSON = JSON.parse(response);
            gameArray = Object.values(gameJSON.games);

            for (let i = 0; i < gameArray.length; i++) {
                gameTitle.push(gameArray[i].title);
            }

            gameTitle.sort();

            for (let i = 0; i < gameTitle.length; i++) {
                createElement(options, "option", "value", gameTitle[i], gameTitle[i]);
                datalist.appendChild(options[i]);
            }
        });

        searchInput.addEventListener("keypress", (e) => {
            if (e.key == "Enter") {
                console.log(searchInput.value);
            }
        });
    })();

    // NAVBAR FORM
    (function() {
        let forms = document.querySelectorAll(".navbar .navbar-dropdown-item form");
        let btnLogin = document.querySelectorAll(".switch-to-login");
        let btnRecover = document.querySelectorAll(".switch-to-recover");
        let btnRegister = document.querySelectorAll(".switch-to-register");

        for (let i = 1; i < forms.length; i++) {
            forms[i].classList.add("hide");
        }

        btnLogin.forEach((btn) => {
            btn.addEventListener("click", () => {
                forms[0].classList.remove("hide");
                forms[1].classList.add("hide");
                forms[2].classList.add("hide");
            });
        });
        
        btnRecover.forEach((btn) => {
            btn.addEventListener("click", () => {
                forms[1].classList.remove("hide");
                forms[0].classList.add("hide");
                forms[2].classList.add("hide");

            });
        });

        btnRegister.forEach((btn) => {
            btn.addEventListener("click", () => {
                forms[2].classList.remove("hide");
                forms[1].classList.add("hide");
                forms[0].classList.add("hide");
            });
        });
    })();

    // HERO FOLLOWING CIRCLE
    (function () {
        let hero = document.querySelector("#hero");
        let circle = hero.querySelector(".hero-circle");
        let mouseX = 0,
            mouseY = 0;
        let xp = 0,
            yp = 0;
        let lerp = 2;

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
        let cartBtns = document.querySelectorAll(".shopping-cart");
        let gameJSON;
        let favorites = [];
        let saved;
    
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