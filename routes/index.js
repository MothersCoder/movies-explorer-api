const router = require('express').Router();
const usersRouters = require('./users');
const moviesRouters = require('./movies');

const NotFound = require('../errors/not-found-err');

router.use('/users', usersRouters);
router.use('/movies', moviesRouters);

router.use('*', (req, res, next) => {
  next(new NotFound('По вашему запросу ничего не найдено, уточните запрос'));
});

module.exports = router;
