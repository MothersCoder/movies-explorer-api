const { NODE_ENV, MONGODB } = process.env;

const hostname = '0.0.0.0';
const { PORT = 3000 } = process.env;
const mongodbUrl = NODE_ENV === 'production' ? MONGODB : 'mongodb://0.0.0.0:27017/bitfilmsdb';
const tokenKey = 'Qj#405_!{rOhpA@';

const userIdErr = 'Пользователь с таким ID не найден';
const userValidationErr = 'При обновлении данных пользователя введены некорректные данные';
const userEmailErr = 'Пользователь с таким email уже зарегестрирован';
const userLoginErr = 'Неверный логин или пароль';

const authErr = 'Пожалуйста, авторизуйтесь';

const movieListErr = 'Фильмотеки у запрашваемого пользователя не существует или самого пользователя';
const movieValidationErr = 'При создании карточки часть полей была заполнена некорректно';
const movieIdErr = 'Запрашиваемый фильм не найден';
const movieDeletErr = 'Вы не можете удалить карточку, которую создали не вы';

const routerLinkErr = 'По вашему запросу ничего не найдено, уточните запрос';

module.exports = {
  hostname,
  PORT,
  mongodbUrl,
  tokenKey,
  userEmailErr,
  userIdErr,
  userLoginErr,
  userValidationErr,
  authErr,
  movieDeletErr,
  movieIdErr,
  movieListErr,
  movieValidationErr,
  routerLinkErr,
};
