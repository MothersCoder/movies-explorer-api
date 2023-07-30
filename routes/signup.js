const router = require('express').Router();
const { createUser } = require('../controllers/user');
const { createUserValidation } = require('../middlewares/validation');

router.post('/signup', createUserValidation, createUser);

module.exports = router;
