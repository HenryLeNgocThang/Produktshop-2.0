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

    slider("#offers .le-slider-container", false);

    var themeToggle = document.querySelector("#hero .label");

    themeToggle.addEventListener("onclick", () => {
        var modes = ["dark", "light"];
        var state = modes[1];

        if (state == modes[1]) {
            state == modes[0];
        } else {
            state == modes[0];
        }

        console.log(state);
    });
});