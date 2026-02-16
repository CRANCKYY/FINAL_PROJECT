//Form handling for add-movie.html

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('movie-form');
    const formMessage = document.getElementById('form-message');

    //Stops if from is missing
    if (!form) {
        console.error('form not found!');
        return;
    }

    //Clear all error messages
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
            el.classList.remove('error');
        });
    } 
    
    //Validate from inputs
    function validateForm(formData) {
        let isValid = true;
        clearErrors();

        // Validate title
        if (!formData.title || formData.title.trim().length < 2) {

            document.getElementById('title-error').textContent = 'Title must be at least 2 characters';
            document.getElementById('title').classList.add('error');
            isValid = false;
        }

        // Validate genre
        if (!formData.genre || formData.genre === ''){
            document.getElementById('genre-error').textContent = 'Please select a genre';
            document.getElementById('genre').classList.add('error');
            isValid = false;
        }

        // Validte year
        const year = parseInt(formData.year);
        const currentYear = new Date ().getFullYear ();
        if (!formData.year || year < 1900 || year > currentYear + 5) {
            document.getElementById('year-error').textContent = `Year must be between 1900 and ${currentYear + 5}`;
            document.getElementById('year').classList.add('error');
            isValid = false;
        }

        // Validate rating
        const rating = parseFloat (formData.rating);
        if (!formData.rating || rating < 1 || rating > 5) {
            document.getElementById('rating-error').textContent = 'Rating must be between 1 and 5';
            document.getElementById('rating').classList.add('error');
            isValid = false;
        }

         return isValid;
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            title: document.getElementById('title').value.trim(),
            genre: document.getElementById('genre').value,
            year: document.getElementById('year').value,
            rating: document.getElementById('rating').value,
            review: document.getElementById('review').value.trim(),
            dateAdded: new Date().toISOString()
        };

        // Validate form
        if (validateForm(formData)) {
            try {
                // Add movie to localstorage
                addMovie(formData);

                // show success message
                formMessage.textContent = 'Movie added successfully!';
                formMessage.className = 'form-message success';

                // Reset form
                form.reset();

                // Clear success message after 3 seconds
                setTimeout (() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 3000);

            } catch (error) {
                formMessage.textContent = 'Error adding movie. Please try again';
                formMessage.className = 'form-message error';
            }
        } else {
            formMessage.textContent = 'Please fix the errors above';
            formMessage.className = 'form-message error';
        }
    });

    // Handle form reset
    form.addEventListener('reset', function () {
        clearErrors();
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    });
});       