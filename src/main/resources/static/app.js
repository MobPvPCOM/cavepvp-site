function initializeTheme() {
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
        setDark();
    } else {
        setLight();
    }

    $("#styleToggle").off('click').on('click', function () {
        let current_theme = $('body').attr('class');
        if (current_theme === 'light') {
            setDark();
        } else {
            setLight();
        }
        console.log(current_theme);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initializeTheme();

    let errorMessage = document.querySelector(
        "#view > div.main--wrapper > div.error-container"
    );

    setTimeout(function () {
        fadeOut(errorMessage);
    }, 3000);
});

function fadeOut(element) {
    let opacity = 1;
    let interval = 50;
    let duration = 1000;

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
