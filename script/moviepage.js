// Finds the movie for the current page (for example dune.html)
function getCurrentMovie() {
    const file = location.pathname.split("/").pop();
    return movies.find(function (movie) {
        return movie.page.endsWith(file);
    });
}

// Adds the note block (textarea + Save + Delete) to the movie page
function renderNote(movie) {
    const key = "note-" + movie.id;

    const box = document.createElement("div");
    box.className = "mt-4";
    box.innerHTML = `
      <h2 class="h5">My note</h2>
      <textarea class="form-control mb-2" id="note-text" rows="3" placeholder="What do you think about this movie?"></textarea>
      <button type="button" id="note-save" class="btn btn-accent btn-sm">Save note</button>
      <button type="button" id="note-delete" class="btn btn-outline-secondary btn-sm">Delete</button>
      <span id="note-status" class="muted ms-2"></span>
    `;
    document.querySelector(".col-md-8").appendChild(box);

    const text = document.getElementById("note-text");
    const status = document.getElementById("note-status");

    // Restore the saved note
    text.value = localStorage.getItem(key) || "";

    document.getElementById("note-save").addEventListener("click", function () {
        if (text.value.trim() === "") {
            status.textContent = "Write something first";
            return;
        }
        localStorage.setItem(key, text.value.trim());
        status.textContent = "Saved";
    });

    document.getElementById("note-delete").addEventListener("click", function () {
        localStorage.removeItem(key);
        text.value = "";
        status.textContent = "Deleted";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const movie = getCurrentMovie();
    if (movie) {
        renderNote(movie);
    }
});