document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const recentSearchesContainer = document.getElementById("recentSearches");

  // Affiche les recherches récentes au chargement de la page
  displayRecentSearches();

  // Gestion du clic sur le lien Home
  document.getElementById("homeLink").addEventListener("click", function () {
    sessionStorage.removeItem("lastQuery");
    sessionStorage.removeItem("searchResults");
    sessionStorage.removeItem("recentSearches");
  });

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (query.length > 0) {
      performSearch(query);
    }
  });

  function performSearch(query) {
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        displayResults(data);
        sessionStorage.setItem("lastQuery", query);
        sessionStorage.setItem("searchResults", JSON.stringify(data));
        updateRecentSearches(query);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        searchResults.innerHTML =
          '<p class="text-red-500">Une erreur est survenue lors de la recherche.</p>';
      });
  }

  function displayResults(shows) {
    searchResults.innerHTML = "";

    if (shows.length === 0) {
      searchResults.innerHTML =
        '<p class="text-yellow-500">Aucune série trouvée.</p>';
      return;
    }

    shows.forEach((show) => {
      const { name, image, summary } = show.show;
      const showDiv = document.createElement("div");
      showDiv.classList.add(
        "mb-4",
        "p-4",
        "shadow-lg",
        "rounded-lg",
        "bg-white",
        "cursor-pointer"
      );
      showDiv.innerHTML = `
        <img src="${
          image ? image.medium : "https://placehold.it/210x295"
        }" alt="${name}" class="mb-2">
        <h3 class="text-xl font-bold">${name}</h3>
        <p>${
          summary
            ? summary.replace(/<[^>]+>/g, "")
            : "Pas de description disponible."
        }</p>
      `;
      showDiv.addEventListener(
        "click",
        () => (window.location.href = `details.html?id=${show.show.id}`)
      );
      searchResults.appendChild(showDiv);
    });
  }

  function updateRecentSearches(query) {
    const recentSearches =
      JSON.parse(sessionStorage.getItem("recentSearches")) || [];
    if (!recentSearches.includes(query)) {
      recentSearches.unshift(query);
      if (recentSearches.length > 5) recentSearches.splice(5);
      sessionStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    }
    displayRecentSearches();
  }

  function displayRecentSearches() {
    recentSearchesContainer.innerHTML =
      '<h2 class="text-lg mb-2 text-white">Recherches Récentes :</h2>';
    const recentSearches =
      JSON.parse(sessionStorage.getItem("recentSearches")) || [];
    recentSearches.forEach((search) => {
      const searchLink = document.createElement("button");
      searchLink.textContent = search;
      searchLink.classList.add(
        "text-blue-500",
        "hover:text-blue-700",
        "mr-2",
        "mb-2",
        "bg-transparent",
        "border",
        "border-blue-500",
        "rounded",
        "p-1",
        "text-white"
      );
      searchLink.addEventListener("click", () => {
        searchInput.value = search;
        performSearch(search);
      });
      recentSearchesContainer.appendChild(searchLink);
    });
  }
});
