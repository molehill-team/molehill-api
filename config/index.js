const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  isProd,
  secretKey: isProd ? process.env.SECRET_KEY : 'secret-key',
  mongoURI: isProd ? process.env.MONGO_URI : 'mongodb://localhost/molehill',
};