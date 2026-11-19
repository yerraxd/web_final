// Reads an array from localStorage. If nothing is saved or the data is broken, returns []
function loadList(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : [];
    } catch (e) {
        return [];
    }
}

// Stores ids of favorite and watched movies saved in localStorage
let favorites = loadList("favorites");
let watched = loadList("watched");

// Adds a movie to favorites, or removes it if it is already there
function toggleFav(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(function (item) {
            return item !== id;
        });
    } else {
        favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
    renderStats();
}

// Adds a movie to watched, or removes it if it is already there
function toggleWatched(id) {
    if (watched.includes(id)) {
        watched = watched.filter(function (item) {
            return item !== id;
        });
    } else {
        watched.push(id);
    }
    localStorage.setItem("watched", JSON.stringify(watched));
    renderStats();
}

function renderFavorites() {
    const container = document.getElementById("favorites-list");
    container.innerHTML = "";

    movies.forEach(function (movie) {
        if (favorites.includes(movie.id)) {
            const row = document.createElement("div");
            row.innerHTML = movie.title + ' <button class="remove-fav" data-id="' + movie.id + '">×</button>';
            container.appendChild(row);
        }
    });

    if (favorites.length === 0) {
        container.textContent = "Empty";
    }
}

function addFav() {
    document.getElementById("moviestr").addEventListener("click", function (e) {
        if (e.target.classList.contains("fav-btn")) {
            const id = Number(e.target.dataset.id);
            toggleFav(id);

            if (favorites.includes(id)) {
                e.target.textContent = "♥";
            } else {
                e.target.textContent = "♡";
            }
        }

        if (e.target.classList.contains("watched-btn")) {
            const id = Number(e.target.dataset.id);
            toggleWatched(id);

            if (watched.includes(id)) {
                e.target.textContent = "✓ Watched";
            } else {
                e.target.textContent = "Mark as watched";
            }
        }
    });

    document.getElementById("favorites-list").addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-fav")) {
            toggleFav(Number(e.target.dataset.id));
            updateMovies();
        }
    });
}

function renderMovies(list) {
    const container = document.getElementById("moviestr");
    container.innerHTML = "";

    list.forEach(function (movie) {
        container.innerHTML += movie.getCardHTML(
            favorites.includes(movie.id),
            watched.includes(movie.id)
        );
    });
}

function renderSeries(list) {
    const container = document.getElementById("seriesl");
    container.innerHTML = "";

    list.forEach(function (serie) {
        container.innerHTML += `
      <div class="col">
        <article class="card show-card h-100">
          <img class="artwork" src="${serie.image}" alt="Scene from ${serie.title}">
          <div class="card-body">
            <h3>${serie.title}</h3>
            <p class="card-meta">${serie.genre} &bull; ${serie.year} &bull; <span class="star">&#9733;</span> ${serie.rating}</p>
            <p class="series-more">${serie.creator} &bull; Seasons: ${serie.seasons}</p>
          </div>
        </article>
      </div>
    `;
    });
}

// Returns a new array of movies whose title contains the search text
function filterMovies(query) {
    return movies.filter(function (movie) {
        return movie.matches(query);
    });
}

// Fills the "Movies at a Glance" table from the movies array
function renderTable() {
    const body = document.getElementById("movies-table-body");
    body.innerHTML = "";
    movies.forEach(function (movie) {
        body.innerHTML += movie.getRowHTML();
    });
}

// Returns a sorted copy of the list; slice() keeps the original array unchanged
function sortMovies(list, order) {
    const sorted = list.slice();

    if (order === "desc") {
        sorted.sort(function (a, b) {
            return b.rating - a.rating;
        });
    }
    if (order === "asc") {
        sorted.sort(function (a, b) {
            return a.rating - b.rating;
        });
    }

    return sorted;
}

function filterSeries(genre) {
    if (genre === "all") {
        return series;
    }
    return series.filter(function (serie) {
        return serie.genre === genre;
    });
}

function updateMovies() {
    const query = document.getElementById("search").value;
    const order = document.getElementById("sort").value;
    renderMovies(sortMovies(filterMovies(query), order));
}

// Shows how many movies are watched, their average rating and the favorites count
function renderStats() {
    const seen = movies.filter(function (movie) {
        return watched.includes(movie.id);
    });

    let total = 0;
    seen.forEach(function (movie) {
        total += movie.rating;
    });
    const average = seen.length > 0 ? (total / seen.length).toFixed(1) : "-";

    document.getElementById("stats").textContent =
        "Watched: " + seen.length + " of " + movies.length +
        " | Average rating of watched: " + average +
        " | Favorites: " + favorites.length;
}

// Removes saved data from localStorage (the theme is kept) and refreshes the page
function clearData() {
    if (confirm("Delete all saved data?")) {
        localStorage.removeItem("favorites");
        localStorage.removeItem("watched");
        localStorage.removeItem("contactDraft");
        movies.forEach(function (movie) {
            localStorage.removeItem("note-" + movie.id);
        });
        favorites = [];
        watched = [];
        renderFavorites();
        updateMovies();
        renderStats();
    }
}

// Switches the Bootstrap theme and saves the choice in localStorage
function setTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);

    const button = document.getElementById("theme-toggle");
    if (button) {
        if (theme === "dark") {
            button.textContent = "Light mode";
        } else {
            button.textContent = "Dark mode";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setTheme(localStorage.getItem("theme") || "dark");

    document.getElementById("theme-toggle").addEventListener("click", function () {
        const current = document.documentElement.getAttribute("data-bs-theme");
        if (current === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    });

    if (document.getElementById("moviestr")) {
        renderMovies(movies);
        renderTable();
        document.getElementById("search").addEventListener("input", updateMovies);
        document.getElementById("sort").addEventListener("change", updateMovies);

        addFav();
        renderFavorites();
        renderStats();

        const clearButton = document.getElementById("clear-data");
        if (clearButton) {
            clearButton.addEventListener("click", clearData);
        }
    }

    if (document.getElementById("seriesl")) {
        renderSeries(series);

        document.getElementById("genre").addEventListener("change", function (e) {
            renderSeries(filterSeries(e.target.value));
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    if (!form) return;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const success = document.getElementById("successMessage");

    // Load the saved draft if there is one into the form fields
    let draft = {};
    try {
        draft = JSON.parse(localStorage.getItem("contactDraft")) || {};
    } catch (e) {
        draft = {};
    }
    name.value = draft.name || "";
    email.value = draft.email || "";
    message.value = draft.message || "";

    // Saves the draft every time the user types
    function saveDraft() {
        const data = {
            name: name.value,
            email: email.value,
            message: message.value
        };
        localStorage.setItem("contactDraft", JSON.stringify(data));
    }

    name.addEventListener("input", saveDraft);
    email.addEventListener("input", saveDraft);
    message.addEventListener("input", saveDraft);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        success.hidden = true;

        if (name.value.trim().length < 2) {
            document.getElementById("nameError").textContent =
                "Enter at least 2 characters.";
            name.classList.add("is-invalid");
            valid = false;
        } else {
            document.getElementById("nameError").textContent = "";
            name.classList.remove("is-invalid");
        }

        // Simple email format check: text@text.text
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            document.getElementById("emailError").textContent =
                "Enter a valid email address.";
            email.classList.add("is-invalid");
            valid = false;
        } else {
            document.getElementById("emailError").textContent = "";
            email.classList.remove("is-invalid");
        }

        if (message.value.trim().length < 10) {
            document.getElementById("messageError").textContent =
                "Message must contain at least 10 characters.";
            message.classList.add("is-invalid");
            valid = false;
        } else {
            document.getElementById("messageError").textContent = "";
            message.classList.remove("is-invalid");
        }

        if (valid) {
            success.hidden = false;
            localStorage.removeItem("contactDraft");
            form.reset();
        }
    });

});