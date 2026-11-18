// A movie: stores its data and knows how to show itself
class Movie {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.year = data.year;
        this.rating = data.rating;
        this.genre = data.genre;
        this.director = data.director;
        this.runtime = data.runtime;
        this.image = data.image;
        this.page = data.page;
    }

    // Returns true if the title contains the search text
    matches(query) {
        return this.title.toLowerCase().includes(query.toLowerCase());
    }

    // Returns the HTML of one card; heart is "♡" or "♥"
    getCardHTML(heart) {
        return `
      <div class="col-6 col-md-4 col-lg-3">
        <article class="movie-card">
          <a href="${this.page}" class="text-reset text-decoration-none">
            <img class="artwork" src="${this.image}" alt="Poster of ${this.title}">
            <h3>${this.title}</h3>
          </a>
          <p class="card-meta">${this.year} &bull; <span class="star">&#9733;</span> ${this.rating}</p>
          <button type="button" class="btn btn-sm btn-outline-danger fav-btn" data-id="${this.id}">${heart}</button>
        </article>
      </div>
    `;
    }
}

// Turn every plain object from data.js into a Movie object
const movies = moviesData.map(function (data) {
    return new Movie(data);
});