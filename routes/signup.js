const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/user');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина имени 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
        'any.required': 'Поле "имя" обязательно к заполнению',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Проверьте формат записи электронного адреса. Формат записи должен соответстовать шаблону - name@server.com',
      }),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = router;
