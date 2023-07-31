const router = require('express').Router();
const { getUserData, changeUserData } = require('../controllers/user');
const { changeUserDataValidation } = require('../middlewares/validation');

router.get('/me', getUserData);
router.patch('/me', changeUserDataValidation, changeUserData);

module.exports = router;
