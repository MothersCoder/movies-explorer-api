const router = require('express').Router();
const usersRouters = require('./users');
const moviesRouters = require('./movies');
const logout = require('./signout');

const NotFound = require('../errors/not-found-err');
const { routerLinkErr } = require('../constants');

router.use('/users', usersRouters);
router.use('/movies', moviesRouters);
router.use('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFound(routerLinkErr));
});

module.exports = router;
