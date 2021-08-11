var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var methodOverride = require('method-override')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var devicesRouter = require('./routes/devices')
var nodesRouter = require('./routes/nodes')
var capexRouter = require('./routes/capex')
var dashboardRouter = require('./routes/dashboard')
var nsoRouter = require('./routes/nso')
var versionsRouter = require('./routes/versions')
var redirectLogin = require('./middlewares/redirectLogin');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(session({
    secret: "Claro2021",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));
app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/devices', redirectLogin, devicesRouter)
app.use('/nodes', redirectLogin, nodesRouter)
app.use('/capex', redirectLogin, capexRouter);
app.use('/users', usersRouter);
app.use('/nso', redirectLogin, nsoRouter);
app.use('/versions', redirectLogin, versionsRouter);
app.use('/dashboard', dashboardRouter)

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