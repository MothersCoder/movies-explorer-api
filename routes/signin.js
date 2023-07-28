const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/user');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Проверьте формат записи электронного адреса. Формат записи должен соответстовать шаблону - name@server.com',
      }),
    password: Joi.string().required(),
  }),
}), login);

module.exports = router;
