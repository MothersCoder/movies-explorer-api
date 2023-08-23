const Movie = require('../models/movie');
const BadRequest = require('../errors/bad-req-err');
const NotFound = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden-err');
const {
  movieListErr, movieValidationErr, movieDeletErr, movieIdErr,
} = require('../constants');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => new NotFound(movieListErr))
    .then((movieList) => res.status(200).send(movieList))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner,
  })
    .then((newMovie) => res.status(201).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(movieValidationErr));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => new NotFound(movieIdErr))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new Forbidden(movieDeletErr));
      }
      res.status(200).send(movie);
      return Movie.deleteOne(movie)
        .then(() => res.status(200).send('Фильм успешно удален'));
    })
    .catch(next);
};

module.exports = {
  addMovie, getUserMovies, deleteMovie,
};
