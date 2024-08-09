document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    let playerSearchTimeout = null;
    let lastSearchText = '';

    searchResults.style.display = "none";

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim();
        lastSearchText = searchText;

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

                const { users = [] } = await response.json();

                console.log("Search results: ", users);

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

    searchInput.addEventListener("keydown", async function (event) {
        if (event.key === "Enter" && lastSearchText.trim()) {
            event.preventDefault(); // Prevent default form submission

            console.log("Enter key pressed with search text: ", lastSearchText);

            try {
                const response = await fetch(`/search?query=${lastSearchText.trim()}`);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const { users = [] } = await response.json();

                console.log("Enter search results: ", users);

                const matchingUser = users.find(user => user.name.toLowerCase() === lastSearchText.trim().toLowerCase());

                if (matchingUser) {
                    console.log("Matching user found: ", matchingUser);
                    window.location.href = `/u/${matchingUser.name}`;
                } else {
                    console.log("No matching user found");
                }
            } catch (error) {
                console.error("Fetch error: ", error);
            }
        }
    });
});

document.addEventListener("click", function (event) {
    let searchInput = document.getElementById("searchInput");
    let searchResults = document.getElementById("searchResults");

    if (event.target !== searchInput && event.target !== searchResults) {
        searchResults.style.display = "none";
    }
});
