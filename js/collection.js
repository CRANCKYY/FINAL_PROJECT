// Collection page functionality

document.addEventListener('DOMContentLoaded', function() {
    const moviesGrid = document.getElementById('movies-grid');
    const emptyState = document.getElementById('empty-state');
    const searchInput = document.getElementById('search-input');
    const genreFilter = document.getElementById('genre-filter');

    let currentMovies = [];

    // Load and display movies
    function loadMovies() {
        currentMovies = getMovies();
        displayMovies(currentMovies);
    } 

    // Display movies based on filter
    function displayMovies(movies) {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedGenre = genreFilter ? genreFilter.value : 'all';

        // Filter movies
        let filteredMovies = movies;

        if (searchTerm) {
            filteredMovies = filteredMovies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm)
            );
        }

        if (selectedGenre !== 'all') {
            filteredMovies = filteredMovies.filter(movie =>
                movie.genre === selectedGenre
            );
        }

        // Show empty state or grid
        if (filteredMovies.length === 0) {
            if (moviesGrid) moviesGrid.style.display = 'none';
            if (emptyState) {
                emptyState.style.display = 'block';

                // Custom message based on filter
                if (searchTerm || selectedGenre !== 'all') {
                    emptyState.innerHTML = `
                     <p>No movies match your filters.</p>
                     <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
                    `;
                }
            }
        } else {
            if (moviesGrid) {
                moviesGrid.style.display = 'grid';
                moviesGrid.innerHTML = filteredMovies.map(createMovieCard).join('');
               }
               if (emptyState) emptyState.style.display = 'none';  
        }
    }
        
    // Clear all filters
    window.clearFilters = function() {
         if (searchInput) searchInput.value = '';
         if (genreFilter) genreFilter.value = 'all';
        displayMovies(currentMovies);
    };

     // Handle delete movie
     window.handleDelete = function(movieId) {
        if (confirm('Are you sure you want to delete this movie?')) {
            deleteMovie(movieId);
            loadMovies(); // Reload the display
        }
    };

    // Event listeners 
    if (searchInput) {
        searchInput.addEventListener('input', () => displayMovies(currentMovies));
    }

    if (genreFilter) {
        genreFilter.addEventListener('change', () => displayMovies(currentMovies));
    }

    // Initial load
    loadMovies();
});