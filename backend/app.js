require('dotenv-expand')(require('dotenv').config());
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sentry = require('@sentry/node');

const indexRouter = require('./routes/index');

// Test router
const usersRouter = require('./routes/users');
const voteRouter = require('./routes/vote');

const app = express();

Sentry.init({ dsn: 'https://f5141de13e874db5974acf6a53d02fe1@sentry.io/5169136' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vote', voteRouter);

app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

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

// Custom Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('info', `Server is running at port : ${PORT}`);
});

module.exports = app;
