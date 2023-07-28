const { NODE_ENV, MONGODB } = process.env;

const hostname = '0.0.0.0';
const { PORT = 3000 } = process.env;
const mongodbUrl = NODE_ENV === 'production' ? MONGODB : 'mongodb://0.0.0.0:27017/bitfilmsdb';
const tokenKey = 'Qj#405_!{rOhpA@';

module.exports = {
  hostname, PORT, mongodbUrl, tokenKey,
};
