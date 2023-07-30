const router = require('express').Router();

router.get('/', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Осуществлен выход из учетной записи' });
});

module.exports = router;
