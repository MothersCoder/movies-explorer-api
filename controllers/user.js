const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { tokenKey } = require('../constants');

const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-req-err');
const Conflict = require('../errors/conflict-err');
const Unauthorized = require('../errors/unauthorized-err');

const getUserData = (req, res, next) => {
  User.findById(req.user._id, 'email name')
    .orFail(() => new NotFoundError('Пользователь с таким ID не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const changeUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .orFail(() => new NotFoundError('Пользователь с заданным ID не найден'))
    .then((newUserData) => res.status(200).send(newUserData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('При обновлении данных пользователя введены некорректные данные'));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, email } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже зарегестрирован'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest('При обновлении данных пользователя введены некорректные данные'));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => new Unauthorized('Неверный логин или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          next(new Unauthorized('Неверный логин или пароль'));
          return;
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : tokenKey, { expiresIn: '7d' });
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .send(user)
          .end();
      }))
    .catch(next);
};

module.exports = {
  getUserData, changeUserData, createUser, login,
};
