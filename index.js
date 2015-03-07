/*jslint node: true, indent: 2, nomen: true, stupid:true */
'use strict';

var express     = require('express'),
  sections      = require('./sections'),
  http          = require('http'),
  path          = require('path'),
  fs            = require('fs'),
  config        = require('./config')(),

// Middleware
  bodyParser      = require('body-parser'),
  compression     = require('compression'),
  expressLess     = require('express-less'),
  cookieParser    = require('cookie-parser'),
  cookieSession   = require('cookie-session'),
  expressLess     = require('express-less'),
  methodOverride  = require('method-override'),
  morgan          = require('morgan'),

// Sesion stuff
  passport = require('passport'),
  loginStrategies = require('./sections/login/loginStrategies'),

// Create server
  app             = express(),
  server;

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/sections');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
/* Paste all the /less folders from sections */
fs.readdirSync(__dirname + '/sections').forEach(function (file) {
  var filePath = __dirname + '/sections/' + file,
    isDirectory = fs.lstatSync(filePath).isDirectory();

  if (isDirectory) {
    app.use('/css', expressLess(filePath + '/less'));
  }
});
/**/
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(__dirname + '/bower_components'));

app.use(cookieParser());
app.use(cookieSession({ secret: '1234567890QWERTY' }));

passport.use(loginStrategies.localStrategy);
passport.serializeUser(loginStrategies.serializeUser);
passport.deserializeUser(loginStrategies.deserializeUser);

app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */

server = http.createServer(app);

// Add the routes from the sections
sections(app);

// serve index and view partials
app.get('/', function (req, res) {
  var username = '';
  if (req.user) {
    username = req.user.username;
  }
  res.cookie('user', JSON.stringify({
    'username': username
  }));
  res.render('_default/layout');
  //res.redirect('/landing');
});

app.get(/\/html\/([\w\/]+)\.html/, function (req, res) {
  var name = req.params[0];
  res.render(name);
});

/*
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express app listening on port ' + app.get('port'));
  console.log('API: ' + config.API);
});
