// Homepage functionality
document.addEventListener('DOMContentLoaded', function() {
    const recentContainer = document.getElementById('recent-movies-container')

    function loadRecentMovies() {
        const movies = getMovies();

        if (recentContainer) {
            if (movies.length === 0) {
                recentContainer.innerHTML = '<p class="empty-message">No movies in collection yet. <a href="add-movie.html">Add your first movie!</a></p>';
            } else {
                // Get 3 most recent movies
                const recentMovies = [...movies]
                .sort((a, b) => new Date(b.dateAdded) - new Data(a.dateAdded))
                .slice(0, 3);

                recentContainer.innerHTML = recentMovies.map(createMovieCard).join('');
            }
        }
    }

    // Handle delete form homepage
    wimdow.handleDelete = function(movieId)  {
        if (confirm('Are you want to delete this movie?')) {
            deleteMovie(movieId);
            loadRecentMovies(); // Reload the display
        }
    };

    // Initial load
    loadRecentMovies();
});