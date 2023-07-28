const router = require('express').Router();
const { getUserData, changeUserData } = require('../controllers/user');

router.get('/me', getUserData);
router.patch('/me', changeUserData);

module.exports = router;
