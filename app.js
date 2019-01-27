const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Anuncio');

const indexRouter = require('./routes/index');
const anunciosRouter = require('./routes/anuncios/anuncios.api');
const imagesRouter = require('./routes/images');
const anunciosViewRouter = require('./routes/anuncios/anuncios.views');

mongoose.connect(keys.mongoURI);

const app = express();
const expressSwagger = require('express-swagger-generator')(app);
let options = {
  swaggerDefinition: {
      info: {
          description: 'API docs',
          title: 'Nodepop',
          version: '1.0.0',
      },
      host: 'localhost:3000',
      produces: [
          "application/json",
          "application/xml"
      ],
      schemes: ['http', 'https'],
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/images', imagesRouter);
app.use('/anuncios', anunciosViewRouter);

app.use('/api/v1/anuncios', anunciosRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
