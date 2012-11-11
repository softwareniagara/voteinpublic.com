var Question = require('./../models/question.js')
  , Answer = require('./../models/answer.js')
  , exec = require('child_process').exec
  , fdf = require('fdf')
  , fs = require('fs')
  , Cookies = require('cookies');

/*
 * GET /questions
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
          title: 'Questions',
          questions: questions
        });
      };
  }
  
  return Question.find(callback);
};

/*
 * GET /questions/:id
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

        // Is this spot okay to prepare the PDF?
        console.log(question);                                                       
        var url = "http://website.com/questions/" + question._id;                    
        var data = fdf.generate({                                                    
          question: question.value,                                                  
          yesurl: url + "/yes",                                                      
          nourl: url + "/no"                                                         
        });                                                                          
        // Static filename would be easier when generating the pdf,                  
        // but what happens when different questions are created                     
        // right after each other...                                                 
        var filename = "tmp/" + question._id + ".fdf";                              
        fs.writeFile(filename, data, function(err) {                                 
          if (err) throw err;                                                        
          console.log('Saved to ' + filename);                                       
        });                        
      
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
 * We need to do some content negotation here too. But I'm very tired right now. 
 * I'll implement this tomorrow. 
 *
 * 1) On failure when create via json, it should return 422 code
 * 2) On failure when create via html, it should redirect to 500 code page (user probably doesn't care about proper code - they just care that shit blew up - tell them the app is broke).
 * 3) On success when created via json, it should return 201 code
 * 4) On success when create via html, it should do what it does now.
 */
exports.create = function(req, res) {
  var questionValue = req.body.question.trim();

  if (questionValue == '') {
    res.redirect('/');
    return false;
  }

  // Add a question mark if there isn't one present as the last character
  if (questionValue.slice(-1) !== '?') {
    questionValue += '?';
  }

  var question = new Question({
    value: questionValue
  });

  return question.save(function(err, question) {
    if (err || !question) {
      res.redirect('/404');
      return false;
    }

    // redirect to show route after create question
    res.redirect('/questions/' + question.id);
  });
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
  // Get the answer. Who cares if it is valid. That will get verified in the 
  // next step.
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
    if (cookies.get(baseName + question.id)) {
      res.statusCode = '403';
      res.setHeader('Content-Type', 'application/json');
      return res.send({
        'error': 'You have already cast your vote. You are not permitted to vote again.'
      });
    }
  
    var answer = new Answer({
      value: selectedAnswer,
      question_id: question.id,
      latitude: lat,
      longitude: lng
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
