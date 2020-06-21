const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  isProd,
  isTest,
  secretKey: isProd ? process.env.SECRET_KEY : 'secret-key',
  mongoURI: isProd ? process.env.MONGO_URI : (isTest ? 'mongodb://localhost/molehill_test' : 'mongodb://localhost/molehill'),
};