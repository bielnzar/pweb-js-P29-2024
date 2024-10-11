document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
});

// Backgorund Hero
document.addEventListener("DOMContentLoaded", function() {
    const heroBackground = document.getElementById('hero-background');
    const backgrounds = [
        "/pweb-js-P29-2024/public/images/back-1.jpg",
        "/pweb-js-P29-2024/public/images/back-2.jpg",
        "/pweb-js-P29-2024/public/images/back-3.jpg"
    ];
    let currentIndex = 0;

    function changeBackground(index) {
        currentIndex = (index + backgrounds.length) % backgrounds.length;
        heroBackground.src = backgrounds[currentIndex];
    }

    function nextBackground() {
        changeBackground(currentIndex + 1);
    }

    function prevBackground() {
        changeBackground(currentIndex - 1);
    }

    setInterval(nextBackground, 5000);

    window.nextBackground = nextBackground;
    window.prevBackground = prevBackground;
});