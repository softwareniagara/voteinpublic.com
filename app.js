
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , question = require('./routes/question')
  , results = require('./routes/result')
  , map = require('./routes/map')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , stylus = require('stylus')
  , nib = require('nib');

var app = express();

// Establish a connection to the database.
mongoose.connect('mongodb://localhost/pollapp');

// Create a session in mongoose.
var SessionMongoose = require('session-mongoose')
  , mongooseSessionStore = new SessionMongoose({
      url: 'mongodb://localhost/pollapp',
      interval: 120000
  });

// Instructions for compiling stylesheets with stylus and nib.
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())
    .import('nib');
}

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(stylus.middleware({
    src: __dirname + '/public',
    dest: __dirname + '/public',
    compile: compile
  }));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    store: mongooseSessionStore,
    secret: 'a9dflkjaj4lr8ajdklfdlffa943f4hju'
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/questions/:id/:answer', question.answer);
app.get('/questions:format?', question.index);
app.get('/questions/:id.:format?', question.show);
app.post('/questions', question.create);
app.get('/results', results.index);
app.get('/results/:id', results.show);
app.get('/map', map.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
