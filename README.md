# Movie Land

Movie Land is a website about movies and series. This is the final version of our project. We kept the midterm and endterm work and added an API, a class, more localStorage and a few new features on top.

**Live site:** https://yerraxd.github.io/web_final/index.html
**Repository:** https://github.com/yerraxd/web_final

## Group members

- **Omirtayev Yertore:** localStorage with JSON (favorites, watched movies, contact form draft, safe reading with `try/catch`, the "Clear saved data" button) and the statistics panel on the Movies page.
- **Mukhtarova Dana:** object-oriented programming: the `Movie` class (`classes.js`) and its use in the Movies page (cards, search, table rows).
- **Orynbassarov Yerassyl:** TVMaze API search on the Series page (`api.js`) with loading, success, empty and error states, personal notes on the movie pages (`moviepage.js`), and the movies table generated from data.

## Pages

- `index.html` - Home
- `movies.html` - Movies (search, sort, favorites, watched, statistics, table)
- `movies/*.html` - one page for each of the 8 movies, with a personal note
- `series.html` - Series (genre filter and online search through the API)
- `about.html` - About
- `contact.html` - Contact (validated form with a saved draft)

## Project structure

```
web_final/
├── index.html
├── movies.html
├── series.html
├── about.html
├── contact.html
├── README.md
├── css/
│   └── style.css
├── movies/
│   └── dune.html, oppenheimer.html, batman.html, spiderman.html,
│       interstellar.html, inception.html, parasite.html, gladiator.html
├── script/
│   ├── data.js
│   ├── classes.js
│   ├── script.js
│   ├── api.js
│   ├── moviepage.js
│   └── jquery.js
└── images/
```

- `data.js` - plain data: `moviesData` and `series` arrays
- `classes.js` - the `Movie` class, creates the `movies` array from `moviesData`
- `script.js` - rendering, search, sort, filter, favorites, watched, statistics, theme, form validation, localStorage
- `api.js` - TVMaze API search on the Series page
- `moviepage.js` - notes on the movie pages
- `jquery.js` - jQuery effects and animations

## API

- **API:** TVMaze, https://www.tvmaze.com/api (free, no API key needed)
- **Endpoint:** `GET https://api.tvmaze.com/search/shows?q={query}`
- **Where it is used:** Series page, "Search online" section
- **How it works:** `fetch` with `async/await`. The JSON answer is turned into cards on the page.
- **States:**
  - loading: the text "Loading..." while the request is running
  - success: cards with title, genres, year and rating, and the number of results
  - empty: "Nothing found." when the API returns an empty list
  - error: a red message if the network fails or the server answers with an error
- If a show has no image, year or rating, the card shows a placeholder or "N/A".

## Final-stage features

1. **API integration** - online series search with TVMaze (see above).
2. **Object-oriented programming** - the `Movie` class has a constructor, properties and methods: `matches(query)` for the search, `getCardHTML()` for the movie card and `getRowHTML()` for the table row. All movies are objects created from this class.
3. **localStorage**
   - favorites, watched movies, notes and the contact form draft are saved and restored
   - data is stored as JSON; broken or missing values are handled with `try/catch`
   - the "Clear saved data" button on the Movies page removes everything (the theme stays)
4. **Statistics dashboard** - on the Movies page: cards with the number of watched
   movies, the average rating of watched movies and the number of favorites, plus
   a progress bar with the percent of watched movies. It is built from the movies
   data and the saved localStorage data, and updates on every click.
5. **Movie notes** - on every movie page you can write a personal note, save it and delete it. The note is restored when you open the page again.

Other changes: the "Movies at a Glance" table is now generated from the `movies` array, each movie has its own page, and cards have a "Mark as watched" button.

## How to test

1. **Theme:** click "Light mode" / "Dark mode" in the navbar. Reload the page, the theme stays.
2. **Search and sort (Movies):** type a title in the search field and change the Sort dropdown.
3. **Favorites and watched (Movies):** click the heart and "Mark as watched" on a card. The favorites list and the statistics change. Reload the page, the data stays.
4. **Statistics (Movies):** mark two movies as watched and check the count and the average rating.
5. **Movie pages:** click a movie card, write a note, press "Save note", reload the page. Press "Delete" to remove it.
6. **API (Series):** in "Search online" search for `dark` (results), `qwertyuiop` (nothing found) and send an empty field (a hint). Turn on Offline in DevTools (Network tab) and search again to see the error message.
7. **Genre filter (Series):** choose a genre in the dropdown.
8. **Form (Contact):** type something and reload the page, the draft is restored. Submit an empty form to see the errors. Fill in valid data to see the success message.
9. **Clear data (Movies):** press "Clear saved data" and confirm. Favorites, watched movies and notes are removed.
10. **Back to top:** scroll down any page and click the arrow button in the corner.

To run the site locally, download the project and open `index.html` in a browser. An internet connection is needed for Bootstrap, jQuery and the API.

## Technologies

HTML5, CSS3, Bootstrap 5.3, JavaScript (ES6, classes, async/await, fetch), jQuery 3.7, localStorage, TVMaze API
