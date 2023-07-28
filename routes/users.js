const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { getUserData, changeUserData } = require('../controllers/user');

router.get('/me', getUserData);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), changeUserData);

module.exports = router;
