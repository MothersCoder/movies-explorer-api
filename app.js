const express = require('express');

const app = express();
const helmet = require('helmet');

const mongoose = require('mongoose');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { error } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { limiter } = require('./middlewares/limiter');

const login = require('./routes/signin');
const register = require('./routes/signup');
const signout = require('./routes/signout');
const { auth } = require('./middlewares/auth');

const routers = require('./routes');

const { hostname, PORT, mongodbUrl } = require('./constants');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://dpw.nomoredomains.work',
    'https://dpw.nomoredomains.work',
  ],
  credentials: true,
}));

app.use(express.json());

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
}).then(() => console.log('Connected to MongoDB'));

app.use(limiter);
app.use(helmet());

app.use(requestLogger);

app.use(login);
app.use(register);

app.use(cookieParser());
app.use(auth);

app.use(routers);
app.use(signout);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT, hostname, () => {
  console.log(`server running on port ${PORT}`);
});
