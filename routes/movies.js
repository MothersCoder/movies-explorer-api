const router = require('express').Router();
const { addMovie, getUserMovies, deleteMovie } = require('../controllers/movie');
const { addMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

router.post('/', addMovieValidation, addMovie);

router.get('/', getUserMovies);

router.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = router;
