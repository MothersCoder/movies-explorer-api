const router = require('express').Router();

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Осуществлен выход из учетоной записи' });
});

module.exports = router;
