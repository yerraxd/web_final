// Gets shows from TVMaze API
async function fetchShows(query) {
    const response = await fetch("https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(query));
    if (!response.ok) {
        throw new Error("Server error " + response.status);
    }
    return await response.json();
}

// Shows a message under the search form
function setStatus(text, isError) {
    const status = document.getElementById("apiStatus");
    status.textContent = text;
    status.className = isError ? "text-danger" : "muted";
}

// Creates cards from the API data
function renderApiShows(data) {
    const container = document.getElementById("apiResults");
    container.innerHTML = "";

    data.forEach(function (item) {
        const show = item.show;
        const image = show.image ? show.image.medium : "https://placehold.co/210x295?text=No+image";
        const year = show.premiered ? show.premiered.slice(0, 4) : "N/A";
        const rating = show.rating.average || "N/A";
        const genres = show.genres.join(", ") || "N/A";

        container.innerHTML += `
      <div class="col">
        <article class="card show-card h-100">
          <img class="artwork" src="${image}" alt="Poster of ${show.name}">
          <div class="card-body">
            <h3>${show.name}</h3>
            <p class="card-meta">${genres} &bull; ${year} &bull; <span class="star">&#9733;</span> ${rating}</p>
            <a href="${show.url}" target="_blank" rel="noopener">More on TVMaze</a>
          </div>
        </article>
      </div>
    `;
    });
}

async function runSearch(query) {
    document.getElementById("apiResults").innerHTML = "";
    setStatus("Loading...", false);

    try {
        const data = await fetchShows(query);

        if (data.length === 0) {
            setStatus("Nothing found.", false);
            return;
        }

        renderApiShows(data);
        setStatus("Found " + data.length + " series.", false);
    } catch (error) {
        setStatus("Could not load data. Try again later.", true);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("apiForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const query = document.getElementById("apiQuery").value.trim();

        if (query === "") {
            setStatus("Enter a title to search.", true);
            return;
        }
        runSearch(query);
    });
});