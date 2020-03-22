/////////////////// CALCULATES ///////////////////
function distanceBetween(x_Position1 = 0, x_Position2 = 0, y_Position1 = 0, y_Position2 = 0) {
    let distance;
    distance = Math.sqrt(
        ((x_Position1 - x_Position2) * (x_Position1 - x_Position2)) +
        ((y_Position1 - y_Position2) * (y_Position1 - y_Position2))
    );
    return distance;
}

function randomNumber(min = 0, max = 0, round = false, never_zero = false) {
    var rndNumb;

    if (round) {
        rndNumb = Math.round(Math.random() * (max - min) + min);
    } else {
        rndNumb = Math.random() * (max - min) + min;
    }

    if (rndNumb == 0 && never_zero) {
        return randomNumber(min, max, round, never_zero);
    } else {
        return rndNumb;
    }
}

function closestNumber(array = [], target_number) {
    return array.reduce(function (prev, curr) {
        return (Math.abs(curr - target_number) < Math.abs(prev - target_number) ? curr : prev);
    });
}

/////////////////// FANCY STUFF ///////////////////
function countUp(from = 0, to = 0, element = "body", return_type = "", timing_function) {
    var elm = document.querySelector(element);
    var delay = 1;

    switch (timing_function) {
        case "ease-out":
            var easeOut = setInterval(myFunction, delay);

            function myFunction() {
                from++;

                if (from >= to) {
                    clearInterval(easeOut);
                } else {
                    delay = (from * 100) / to;
                    clearInterval(easeOut);
                    easeOut = setInterval(myFunction, delay);
                }

                switch (return_type) {
                    case "data-countUp":
                        elm.dataset.countUp = from;
                        break;
                    default:
                        elm.innerHTML = from;
                }
            }
            break;
        default:
            var linear = setInterval(() => {
                from++;

                if (from >= to) {
                    clearInterval(linear);
                }

                switch (return_type) {
                    case "data-countUp":
                        elm.dataset.countUp = from;
                        break;
                    default:
                        elm.innerHTML = from;
                }
            }, delay);
    }
}

function shake(elementID = "#", magnitude = 15) {
    var elm = document.querySelector(elementID);
    var saveXPos = elm.getBoundingClientRect().left;
    var saveYPos = elm.getBoundingClientRect().top;

    var interval = setInterval(() => {
        var x = saveXPos + (Math.random() * (magnitude - (-magnitude * 2)) + (-magnitude * 2));
        var y = saveYPos + (Math.random() * (magnitude - (-magnitude * 2)) + (-magnitude * 2));
        elm.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        magnitude -= .1;

        if (magnitude < 0) {
            elm.style.transform = 'translate(' + saveXPos + 'px, ' + saveYPos + 'px)';
            clearInterval(interval);
        }
    });
}

function linearGradientText(elementID, text, font_style = "normal 300 30px Arial") {
    var elm = document.querySelector(elementID),
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        textGradient;

    elm.appendChild(canvas);
    ctx.canvas.width = elm.clientWidth;
    ctx.canvas.height = elm.clientHeight;

    textGradient = ctx.createLinearGradient(
        (canvas.width / 2) + (ctx.measureText(text).width),
        (canvas.width / 2) + (ctx.measureText(text).width),
        (canvas.height / 2) - (ctx.measureText(text).width),
        (canvas.height / 2) - (ctx.measureText(text).width)
    );

    textGradient.addColorStop("0", "magenta");
    textGradient.addColorStop("0.5", "blue");
    textGradient.addColorStop("1.0", "red");

    ctx.beginPath();
    ctx.fillStyle = textGradient;
    ctx.font = font_style;
    ctx.fillText(text, (canvas.width / 2) - (ctx.measureText(text).width / 2), canvas.height / 2);
    ctx.closePath();
}

function glitchText(elementID, text, duration_in_seconds = 1, repeat_interval_in_seconds = 5, color = "white", font_style = "normal 300 30px Arial") {
    var elm = document.querySelector(elementID),
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        splitAt = [],
        colors = ["magenta", "blue", "#02feff"],
        // Weis, Gelb, Türkis, Grün, Ping, Rot, Blau, Schwarz
        // colors = ["#ffffff", "#f9fb00", "#02feff", "#01ff00", "#fd00fb", "#fb0102", "#0301fc", "#000000"],
        defaultText = {
            draw: function (rectX, rectY, rectWidth, rectHeight, textColor, rndTextX, rndTextY) {
                ctx.save();
                ctx.beginPath();
                ctx.rect(
                    rectX,
                    rectY,
                    rectWidth,
                    rectHeight
                );
                ctx.strokeStyle = "transparent";
                ctx.stroke();

                ctx.clip();

                ctx.font = font_style;
                ctx.fillStyle = textColor;
                ctx.fillText(
                    text,
                    (canvas.width / 2) - (ctx.measureText(text).width / 2) + rndTextX,
                    canvas.height / 2 + rndTextY
                );
                ctx.restore();
                ctx.closePath();
            }
        };

    elm.appendChild(canvas);
    ctx.canvas.width = elm.clientWidth;
    ctx.canvas.height = elm.clientHeight;

    defaultText.draw(0, 0, canvas.width, canvas.height, color, 0, 0);

    setInterval(() => {
        splitAt = [];

        for (i = 0; i < randomNumber(3, 6, true); i++) {
            var splitAtProcentage = canvas.height * randomNumber(i, i + 1) / 10;
            splitAt.push(splitAtProcentage);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var interval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (i = 0; i < 100; i++) {
                defaultText.draw(
                    randomNumber(0, canvas.width),
                    randomNumber(0, canvas.height),
                    randomNumber(0, 50),
                    randomNumber(0, 10),
                    colors[randomNumber(0, colors.length - 1, true)],
                    randomNumber(-10, 10, true, true),
                    randomNumber(-10, 10, true, true)
                );
            }

            for (i = 0; i < 2; i++) {
                defaultText.draw(
                    randomNumber(0, canvas.width),
                    randomNumber(0, canvas.height),
                    randomNumber(0, canvas.width),
                    randomNumber(0, canvas.height),
                    colors[randomNumber(0, colors.length - 1, true)],
                    randomNumber(-10, 10, true, true),
                    randomNumber(-10, 10, true, true)
                );
            }

            for (i = 0; i < splitAt.length - 1; i++) {
                defaultText.draw(
                    0,
                    splitAt[i],
                    canvas.width,
                    splitAt[i + 1],
                    color,
                    randomNumber(-10, 10),
                    0
                );
            }

            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                clearInterval(interval);

                defaultText.draw(0, 0, canvas.width, canvas.height, color, 0, 0);
            }, duration_in_seconds * 1000);
        }, 50);
    }, (repeat_interval_in_seconds * 1000) + (duration_in_seconds * 1000));
}

function slider(sliderContainer, autoplay = false, speed_in_seconds = 5) {
    var container = document.querySelector(sliderContainer),
        slider = container.querySelector(".le-slider"),
        slides = slider.querySelectorAll(".le-slide"),
        width = container.getBoundingClientRect().width,
        current = 0;

    var dragging = false,
        pos,
        mouseX,
        separator = [];

    var scrolls = [],
        loader = {
            bar: [],
            progress: []
        },
        state = [];

    //////////////// Init ////////////////////
    slider.classList.add("le-slider-translate");
    slider.style.left = 0;
    slider.style.width = width * slides.length + "px";

    createElement(scrolls, "button", "class", "le-slide-prev", "〈");
    createElement(scrolls, "button", "class", "le-slide-next", "〉");

    scrolls.forEach(element => {
        container.appendChild(element);
    });

    for (i = 0; i < slides.length; i++) {
        separator.push(width * i + width / 2);
    }

    if (autoplay) {
        createElement(loader.bar, "div", "class", "le-slider-bar");
        container.appendChild(loader.bar[0]);

        createElement(loader.progress, "div", "class", "le-slider-progress");
        loader.bar[0].appendChild(loader.progress[0]);

        loader.progress[0].style.animationDuration = speed_in_seconds + "s";
        loader.progress[0].classList.add("animation-name");
    }

    //////////////////////////////////////////

    if (autoplay) {
        createElement(state, "div", "class", "le-slider-state");
        container.appendChild(state[0]);
        state[0].classList.add("le-slider-play");
        var autoplayInterval = setInterval(autoplayer, speed_in_seconds * 1000);

        state[0].addEventListener("click", () => {
            if (autoplay) {
                clearInterval(autoplayInterval);
                state[0].classList.remove("le-slider-play");
                state[0].classList.add("le-slider-paused");
                loader.progress[0].classList.remove("animation-name");
                autoplay = false;
            } else {
                autoplayInterval = setInterval(autoplayer, speed_in_seconds * 1000);
                state[0].classList.add("le-slider-play");
                state[0].classList.remove("le-slider-paused");
                loader.progress[0].classList.add("animation-name");
                autoplay = true;
            }
        });
    }

    scrolls[1].addEventListener("click", () => {
        if (current <= 0 && current > width * (slides.length - 1) * (-1)) {
            current -= width;
            slider.style.left = current + "px";
        } else {
            current = 0;
            slider.style.left = current + "px";
        }
    });

    scrolls[0].addEventListener("click", () => {
        if (current >= width * slides.length * (-1) && current < 0) {
            current += width;
            slider.style.left = current + "px";
        } else {
            current = width * (slides.length - 1) * (-1);
            slider.style.left = current + "px";
        }
    });

    slider.addEventListener("mousemove", (e) => {
        if (dragging) {
            e.preventDefault();
            pos = mouseX - e.pageX;
            mouseX = e.pageX;
            slider.style.left = (slider.getBoundingClientRect().left - pos) + "px";
        }
    });

    slider.addEventListener("mousedown", (e) => {
        slider.classList.remove("le-slider-translate");
        dragging = true;
        mouseX = e.pageX;
    });

    slider.addEventListener("mouseup", () => {
        slider.classList.add("le-slider-translate");
        dragging = false;
        var newPosX = closestNumber(separator, (slider.getBoundingClientRect().left - pos) * (-1) + width / 2) - width / 2;
        current = newPosX * (-1);
        slider.style.left = current + "px";
    });

    window.addEventListener('resize', () => {
        width = container.getBoundingClientRect().width;
        slider.style.width = width * slides.length + "px";
        separator = [];

        for (i = 0; i < slides.length; i++) {
            separator.push(width * i + width / 2);
        }
    });

    function autoplayer() {
        if (current <= 0 && current > width * (slides.length - 1) * (-1)) {
            current -= width;
            slider.style.left = current + "px";
        } else {
            current = 0;
            slider.style.left = current + "px";
        }
    }
}

function simpleLazyLoader() {
    var objects = document.images;
    var images = [];
    var downloadImage = new Image();
    var observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type == "attributes") {
                for (let i = 0; i < images.length; i++) {
                    downloadImage.src = images[i].dataset.src;
                }
            }
        });
    });

    // Parse objects from HTMLCollection to array
    for (let i = 0; i < objects.length; i++) {
        images.push(objects[i]);

        observer.observe(images[i], {
            attributes: true
        });

        if (images[i].getBoundingClientRect().top >= 0 &&
            images[i].getBoundingClientRect().bottom <= window.innerHeight
        ) {
            images[i].dataset.load = true;
        }
    }

    document.addEventListener("scroll", () => {
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                if (images[i].dataset.load != true) {
                    if (images[i].getBoundingClientRect().top >= 0 &&
                        images[i].getBoundingClientRect().bottom <= window.innerHeight
                    ) {
                        images[i].dataset.load = true;
                    }
                }
            }
        }
    });

    downloadImage.onload = function () {
        for (let i = 0; i < images.length; i++) {
            if (images[i].dataset.load) {
                images[i].src = images[i].dataset.src;
                images.splice(i, 1);
            }
        }
    };
}

/////////////////// USEFULL FUNCTIONS ///////////////////
function containsObject(obj, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }

    return false;
}

function containsValue(value, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].article_number === value) {
            return true;
        }
    }

    return false;
}

function loadJSON(callback) {
    var object = new XMLHttpRequest();

    object.overrideMimeType("application/json");
    object.open("GET", "assets/vendor/json/games.json", true);
    object.onreadystatechange = function () {
        if (object.readyState == 4 && object.status == "200") {
            callback(object.responseText);
        }
    };

    object.send(null);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function createElement(array, tag = "div", attribute = "", value = "", text = "") {
    var element = document.createElement(tag);
    element.setAttribute(attribute, value);
    element.textContent = text;

    array.push(element);
}

function countDown(deadline = "Jan 1, 2021 00:00:00", elm = null, prefix = "", suffix = "") {
    if (elm != null) {
        var countDownDate = new Date(deadline).getTime();
        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            elm.innerText = prefix + days + "d " + hours + "h " + minutes + "m " + seconds + "s " + suffix;

            if (distance < 0) {
                clearInterval(x);
                elm.innerText = "Sales over";
            }
        }, 1000);
    }
    else {
        console.error("Paremeter is missing. Please make sure to set an element!");
    }
}