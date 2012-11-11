var Question = require('./../models/question.js')
  , Answer = require('./../models/answer.js')
  , exec = require('child_process').exec
  , fdf = require('fdf')
  , fs = require('fs');

/*
 * GET /questions
 */
exports.index = function(req, res) {
  var callback;

  switch (req.params.format) {
    case '.json':
      callback = function(err, questions) {
        if (err || !questions) {
          return res.send({
            'error': err
          },{
            'Content-Type': 'application/json'
          }, 500);
        } else {
          return res.send(questions, {
            'Content-Type': 'application/json'
          }, 200);
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
          return res.send({
            'error': 'The record you were looking for could not be found.'
          }, {
            'Content-Type': 'application/json'
          }, 404);
        } else {
          return res.send(question, {
            'Content-Type': 'application/json'
          }, 200);
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
 * Same deal with content negotiation as above. 
 */
exports.answer = function(req, res) {
  question = Question.findOne({
    _id: req.params.id
  }, function(err, question) {

    var selectedAnswer = req.params.answer;

    // check to ensure that the answer given is a possible answer
    if (question.possibleAnswers.indexOf(selectedAnswer) === -1) {
      //answer is not one of the possible answers
      res.redirect('/questions');
      return false;
    }

    // Create an answer
    var answer = new Answer({
      value: selectedAnswer,
      question_id: question.id,
      latitude: '43.155684',
      longitude: '-79.246513'
    });

    return answer.save(function(err, answer) {
      if (err || !answer) {
        res.redirect('/404');
        return false;
      }

      // redirect to results
      res.redirect('/results/' + question.id);
    });
  });
};
