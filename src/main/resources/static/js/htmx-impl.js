document.addEventListener("htmx:beforeOnLoad", function (event) {
    const xhr = event.detail.xhr;

    if (xhr.status == 500 || xhr.status == 403 || xhr.status == 404) {
        event.stopPropagation();
        document.children[0].innerHTML = xhr.response;
    }
});

document.addEventListener('htmx:afterSwap', function (event) {
    const newScripts = event.target.querySelectorAll('script');
    newScripts.forEach(script => {
        if (script.src) {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.onload = () => console.log(`Script loaded: ${script.src}`);
            document.body.appendChild(newScript);
        } else {
            const newScript = document.createElement('script');
            newScript.text = script.textContent;
            document.body.appendChild(newScript);
        }
    });
});
