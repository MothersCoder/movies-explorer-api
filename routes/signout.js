const router = require('express').Router();

router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Осуществлен выход из учетоной записи' });
});

module.exports = router;
