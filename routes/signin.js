const router = require('express').Router();
const { login } = require('../controllers/user');
const { loginValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);

module.exports = router;
