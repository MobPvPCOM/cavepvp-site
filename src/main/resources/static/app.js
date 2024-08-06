let theme = localStorage.getItem("theme");

function setLight() {
    localStorage.setItem('theme', 'light');
    $('body').attr('class', 'light');
}

function setDark() {
    localStorage.setItem('theme', 'dark');
    $('body').attr('class', 'dark');
}

if (theme === "dark") {
    setDark(); // set state of darkMode on page load
} else {
    setLight();
}

$("#styleToggle").click(function () {
    let current_theme = $('body').attr('class');
    if (current_theme === 'light') {
        setDark();
    } else {
        setLight();
    }
    console.log(current_theme);
});

document.addEventListener("DOMContentLoaded", function () {
    let errorMessage = document.querySelector(
        "#view > div.main--wrapper > div.error-container"
    );

    setTimeout(function () {
        fadeOut(errorMessage);
    }, 3000);
});

function fadeOut(element) {
    let opacity = 1;
    let interval = 50; // Time interval for each step
    let duration = 1000; // Total duration for the fade (in milliseconds)

    let step = interval / duration;

    function updateOpacity() {
        if (opacity > 0) {
            opacity -= step;

            if (element != null)
                element.style.opacity = opacity;

            setTimeout(updateOpacity, interval);
        } else {
            if (element != null)
                element.style.display = "none";
        }
    }

    updateOpacity();
}