const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина имени должна быть 2 символа, специально по запросу пользователей из Китая :)'],
    maxlength: [30, 'Максимальная длина имени должна быть 30 символов'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Введеный вами адрес электронной почты не соответствует формату user@server.com',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  token: {
    type: String,
  },
});
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
