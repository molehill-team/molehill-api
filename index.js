const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect(config.mongoURI);
if(!config.isProd){
  mongoose.set('debug', true);
}

require('./models/User');
require('./models/Product');

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(require('./routes'))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const server = app.listen(PORT, () => {
  console.log('Listening on port ' + server.address().port);
});