document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    let playerSearchTimeout = null;

    searchResults.style.display = "none";

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim();

        // If input is empty, hide results and return
        if (!searchText) {
            searchResults.style.display = "none";
            if (playerSearchTimeout) clearTimeout(playerSearchTimeout);
            return;
        }

        // Clear previous timeout if it exists
        if (playerSearchTimeout) {
            clearTimeout(playerSearchTimeout);
        }

        playerSearchTimeout = setTimeout(async () => {
            console.log("Searching for: ", searchText);

            try {
                const response = await fetch(`/search?query=${searchText}`);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonResponse = await response.json();
                const { users = [] } = jsonResponse;


                // Clear previous search results
                searchResults.innerHTML = '';

                users.forEach(result => {
                    const listItem = document.createElement("li");

                    const userMetaDiv = document.createElement("div");
                    userMetaDiv.classList.add("user-meta");

                    const avatarDiv = document.createElement("div");
                    avatarDiv.classList.add("avatar");

                    const img = document.createElement("img");
                    img.src = result.avatar;
                    avatarDiv.appendChild(img);

                    const userLink = document.createElement("a");
                    userLink.href = `/u/${result.name}`;
                    userLink.textContent = result.name;

                    userMetaDiv.appendChild(avatarDiv);
                    userMetaDiv.appendChild(userLink);

                    listItem.appendChild(userMetaDiv);

                    // Add click event to hide the search results
                    listItem.addEventListener('click', () => {
                        searchResults.style.display = "none";
                    });

                    searchResults.appendChild(listItem);
                });

                searchResults.style.display = users.length > 0 ? "block" : "none";

            } catch (error) {
                console.error("Fetch error: ", error);
            }

        }, 300); // Debounce time of 300ms
    });
});

document.addEventListener("click", function (event) {
    let searchInput = document.getElementById("searchInput");
    let searchResults = document.getElementById("searchResults");

    if (event.target !== searchInput && event.target !== searchResults) {
        searchResults.style.display = "none";
    }
});
