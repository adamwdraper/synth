var express = require('express');
var path = require('path');
var compression = require('compression')

var routes = require('./routes/index');

var Config = require('./config/config');
var Assets = require('./config/assets');
    
var app = express();

app.locals.config = new Config();
app.locals.assets = new Assets(app.locals.config);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, app.locals.config.static)));

app.use('/', routes);

app.use(compression());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;