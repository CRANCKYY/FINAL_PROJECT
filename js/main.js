// Main JavaScript file for shared functions

// LocalStorage keys
const STORAGE_KEY = 'CRANCKY_flix';

// Get movies from localStorage
function getMovies() {
    const movies = localStorage.getItem(STORAGE_KEY);
    return movies ? JSON.parse(movies) : [];
}

//Save movies to localStorage
function saveMovies(movies) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

//Add a new movie
function addMovie(movie) {
    const movies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    movie.id = Date.now(); // Unique ID based on timestamp
    movies.push(movie);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    console.log('movie saved:', movie);
    return movie;
}

// Deleate a movie
function deleteMovie(movieId) {
    const movies = getMovies();
    const filteredMovies = movies.filter(movie => movie.id !== movieId);
    saveMovies(filteredMovies);
    return filteredMovies;
}

// Format rating to show stars
function formatRating(rating) {
    const fullStars = '★'.repeat(Math.floor(rating));
    const halfStar = rating % 1 !== 0 ? '½' : '';
    return fullStars + halfStar;
}

// Create movie card HTML
function createMovieCard(movie) {
    return `
     <div class="movie-card" data-id="${movie.id}">
         <h3>${movie.title}</h3>
         <div class="movie-meta">${movie.genre} (${movie.year})</div>
         <div class="movie-rating">${formatRating(movie.rating)}</div>
         <div class="movie-review">${movie.review || 'No review provided'}</div>
         <button class="delete-btn" onclick="handleDelete(${movie.id})">Delete</button>
     </div>
    `;
}

