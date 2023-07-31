function error(err, req, res, next) {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send('На сервере произошла ошибка, повторите свой запрос позже');
  }

  next();
}

module.exports = { error };
