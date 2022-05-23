var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');
const flash = require('connect-flash');
const passport = require('./routes/auth');
const multer = require("multer");

// モデルの読み込み
var User = require('./models/user');
var Schedule = require('./models/schedule');
var Availability = require('./models/availability');
var Candidate = require('./models/candidate');
var Comment = require('./models/comment');
var Result = require('./models/result');
var Profile = require('./models/profile');
var Account = require('./models/account');
var Rate = require('./models/rate');

User.sync().then(() => {
  Schedule.belongsTo(User, { foreignKey: 'createdBy' });
  Schedule.sync();
  Comment.belongsTo(User, { foreignKey: 'userId' });
  Comment.sync();
  Availability.belongsTo(User, { foreignKey: 'userId' });
  Result.belongsTo(User, { foreignKey: 'userId' });
  Result.sync()
  Profile.belongsTo(User, { foreignKey: 'userId' });
  Profile.sync()
  Rate.belongsTo(User, { foreignKey: 'userId' });
  Rate.sync()
  Account.sync()
  Candidate.sync().then(() => {
    Availability.belongsTo(Candidate, { foreignKey: 'candidateId' });
    Availability.sync();
  });
});

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var formRouter = require('./routes/form');
var schedulesRouter = require('./routes/schedules');
var availabilitiesRouter = require('./routes/availabilities');
var commentsRouter = require('./routes/comments');
var resultsRouter = require('./routes/results');
var profileRouter = require('./routes/profile');
var registerRouter = require('./routes/register');

const { log } = require('console');

var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'e55be81b307c1c09', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/schedules', schedulesRouter);
app.use('/schedules', availabilitiesRouter);
app.use('/schedules', commentsRouter);
app.use('/results', resultsRouter);
app.use('/form', formRouter);
app.use('/profile', profileRouter);
app.use('/register', registerRouter);

const authMiddleware = (req, res, next) => {
  console("authMiddleware is called");
  if (req.isAuthenticated()) { // ログインしてるかチェック
    next();
  } else {
    res.redirect(302, '/login');
  }
};

// ログイン成功後のページ
app.get('/profile', authMiddleware, (req, res) => {
  const user = req.user;
  res.send('ログイン完了！');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('error   404');
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
