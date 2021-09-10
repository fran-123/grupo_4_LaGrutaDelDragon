var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require("method-override");
const session = require('express-session')
const localsUserCheck = require('./Middlewares/localsUserCheck');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require("./routes/products");
var formularioRouter = require('./routes/formulario');
var recordame = require('./Middlewares/cookie');
const { addAbortSignal } = require('stream');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", 'public')));
app.use(session({
  secret : 'mi secreto',
  saveUninitialized : true,
  resave : false,
}));

/* envia los datos del usuario logueado al cliente */
app.use(localsUserCheck);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));
app.use(recordame);



/* rutas */
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use("/product",productsRouter); 
app.use("/cart",formularioRouter);
/* app.use("admin/edit",productsRouter); */




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
