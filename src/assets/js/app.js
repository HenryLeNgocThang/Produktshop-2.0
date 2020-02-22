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

    (function() {
        var themeToggle = document.querySelector("#hero .label input");
        var themeContainer = document.querySelector("#theme-mode");

        themeToggle.addEventListener("click", () => {
            if (themeToggle.checked == true) {
                themeContainer.classList.remove("light-mode");
                themeContainer.classList.add("dark-mode");
            } else {
                themeContainer.classList.remove("dark-mode");
                themeContainer.classList.add("light-mode");
            }
        });
    })();
});