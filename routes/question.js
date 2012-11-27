/*
 * question.js
 *
 * This router is responsible for CRUD operations on question models and
 * dealing with views for those CRUD operations.
 *
 * This router uses content negotiation and can serve views in html or json.
 */

var Question    = require('./../models/question.js')
  , Answer      = require('./../models/answer.js')
  , Cookies     = require('cookies');

/*
 * GET /questions
 *
 * This route returns of a list of questions in html or json.
 */
exports.index = function(req, res) {
  var callback;

  switch (req.params.format) {
    case '.json':
      callback = function(err, questions) {
        if (err || !questions) {
          res.statusCode = '500';
          res.setHeader('Content-Type', 'application/json');
          return res.send({'error': err});
        } else {
          res.statusCode = '200';
          res.setHeader('Content-Type', 'application/json');
          return res.send(questions);
        }
      };
      break;
    default: 
      callback = function(err, questions) {
        if (err || !questions) {
          res.redirect('/404');
          return false;
        }

        return res.render("./../views/questions/index", {
          title: 'Trending Answers | Vote in Public',
          questions: questions
        });
      };
  }

  return Question.find({}).sort({'numAnswers': -1, createdAt: -1}).execFind(callback);
};

/*
 * GET /questions/:id
 *
 * This route returns a question in html or json.
 */

exports.show = function(req, res) {
  var callback;

  switch (req.params.format) {
    case 'json':
      callback = function(err, question) {
        if (err || !question) {
          res.statusCode = '404';
          res.setHeader('Content-Type', 'application/json');
          return res.send({
            'error': 'The record you were looking for could not be found.'
          });
        } else {
          res.statusCode = '200';
          res.setHeader('Content-Type', 'application/json');
          return res.send(question);
        }
      };
      break;
    default:
      callback = function(err, question) {
        if (err || !question) {
          res.redirect('/404');
          return false;
        }

        return res.render("./../views/questions/show", {
          title: question.value,
          question: question
        });
      };
  }
  
  return Question.findOne({_id: req.params.id}, callback);
};

/*
 * POST /question
 *
 * This route allows a user to create a question from multi-part form data or json.
 */
exports.create = function(req, res) {
  var questionValue = req.body.question.trim()
    , question = new Question({value: questionValue})
    , callback;

  console.log(question);

  switch (req.params.format) {
    case 'json':
      callback = function(err, question) {
        if (err) {
          res.statusCode = '422';
          res.setHeader('Content-Type', 'application/json');
          return res.send(err);
        }
        res.statusCode = '200';
        res.setHeader('Content-Type', 'application/json');
        return res.send(question);
      };
      break;
    default:
      callback = function(err, question) {
        if (err) {
          // WTF this is ugly.
          if (err.errors && err.errors.value && err.errors.value.type) {
            err = err.errors.value.type;
          } else {
            err = 'Oops. Your question could not be asked. Please try again.';
          }
          req.session.error = err;
          return res.redirect('/');
        }

        return res.redirect('/questions/'+question.id);
      };
  }

  return question.save(callback);
};

/*
 * GET /question/:id/:answer
 * 
 * This is an intermediary step where we will be using an HTML5 api to grab the
 * user's location from their device's operating system. We will then send the
 * lat/lng to POST /question/:id/:answer. 
 *
 * There should be no API end-point here. An API user should be responsible for
 * getting the lat/lng themselves and posting it to /question/:id/:answer.
 */
 exports.addGeolocationToAnswer = function(req, res) {
  // Get the answer. Who cares if it is valid. That will get verified in the next step.
  var answer      = req.params.answer
    , question_id = req.params.id;
  
  return res.render("./../views/questions/location", {
    title: 'Verifying location',
    answer: answer,
    question_id: question_id
  });
 };

/*
 * POST /question/:id/:answer
 *
 * This is an api endpoint only. Don't do any template rendering or redirect
 * here.
 */
exports.answer = function(req, res) {
  var selectedAnswer = req.params.answer
    , lat = req.body.latitude
    , lng = req.body.longitude
    , cookies = new Cookies(req, res)
    , baseName = 'spaceweasel_';
    
  return Question.findOne({
    _id: req.params.id
  }, function(err, question) {
    // If the user has a cookie for this question, they cannot vote.

    /* Commented out to disable multi vote prevention
    * 
    if (cookies.get(baseName + question.id)) {
      res.statusCode = '403';
      res.setHeader('Content-Type', 'application/json');
      return res.send({
        'error': 'You have already cast your vote. You are not permitted to vote again.'
      });
    }
    */
  
    var answer = new Answer({
      value: selectedAnswer,
      question_id: question.id,
      coordinates: [lat, lng]
    });
    
    return answer.save(function(err, answer) {
      if (err || !answer) {
        res.statusCode = '422';
        res.setHeader('Content-Type', 'application/json');
        return res.send({
          'error': 'Could not save your answer.'
        });
      } else {
        // User voted. Cast a cookie so they cannot cast a vote.
        cookies.set(baseName + question.id, question.id);
        res.statusCode = '200';
        res.setHeader('Content-Type', 'application/json');
        res.send({
          'success': 'Everything went great.'
        });
      }
    });
  });
};
