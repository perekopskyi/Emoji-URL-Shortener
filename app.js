const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const hjs = require('hogan-express');
const i18n = require('i18n-express');




mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = global.Promise;
fs.readdirSync(path.join(__dirname, '/models'))
  .forEach((filename) => {
    require(path.join(__dirname, '/models/', filename));
  });

const indexRouter = require('./routes/index');
const addressRouter = require('./routes/address');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hjs', hjs);
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ['en', 'ru'],
  textsVarName: 'texts',
}));

app.use('/', indexRouter);
app.use('/address', addressRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
