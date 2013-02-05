
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , question = require('./routes/question')
  , poster = require('./routes/poster')
  , result = require('./routes/result')
  , error = require('./routes/error')
  , config = require('./routes/config')
  , about = require('./routes/about')
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

// Homepage
app.get('/', routes.index);                                             // Ask a question

// Questions
app.get('/questions/:id/:answer', question.addGeolocationToAnswer);     // Get user location
app.post('/questions/:id/:answer', question.answer);                    // Answer a question
app.get('/questions:format?', question.index);                          // See all questions
app.get('/questions/:id.:format?', question.show);                      // See a question
app.post('/questions', question.create);                                // Create a question

// Posters
app.post('/poster/:id', poster.create);                                 // Create a poster for a question.

// Results
app.get('/results:format?', question.index);                            // See all questions
app.get('/results/:id/clustered.:format?', result.clustered);           // See results for question clustered by location
app.get('/results/:id.:format?', result.show);                          // See results for question

// Standard error pages
app.get('/404', error.get404);                                          // Content not found
app.get('/500', error.get500);                                          // Application error

// Application error pages
app.get('/no_location', error.no_location);                             // No location sent
app.get('/failed_location', error.failed_location);                     // Failed to retrieve location
app.get('/already_voted', error.already_voted);                         // Cannot vote more than once
app.get('/vote_failed', error.vote_failed);                             // Failed to vote

// Routes that should maybe be removed:
app.get('/map', map.show);
app.get('/config/kml/list', config.getKMLFiles);
app.get('/config/kml/list', config.kml);
app.get('/config/:id', config.get);

app.get('/about', about.index);

// Start the server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
