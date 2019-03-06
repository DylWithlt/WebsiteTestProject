const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('client-sessions');
const mysql = require('mysql');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const calendarRouter = require('./routes/calendar');
const dayRouter = require('./routes/day');

const app = express();

// Init Session
app.use(session({
  cookieName: 'session',
  secret: '23qawztfsdq23rwaf',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

// init mysql
const con = mysql.createConnection({
  host: 'localhost',
  user : 'admin',
  password : 'Thequickbrownf0x',
  database : 'moise'
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/calendar', calendarRouter);
app.use('/day', dayRouter);

// session check
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    con.query('SELECT username FROM users WHERE username = "'+req.session.user+'"; ', function(err, request) {
      if (request.size > 0) {
        req.user = user;
        delete req.user.password;
        req.session.user = user;
        req.locals.user = user;
      }
      next();
    })
  } else {
    next();
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;