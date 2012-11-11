var Question = require('./../models/question.js')
  , Answer = require('./../models/answer.js')
  , exec = require('child_process').exec;

/*
 * GET /questions
 */
exports.index = function(req, res) {
  switch (req.params.format) {
    case '.json':
      return Question.find(function(err, questions) {
        if (err) {
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
      });
      break;
    default: 
      return Question.find(function(err, questions) {
        if (err) {
          // Should redirect to a 500: application error page here.
        }
        return res.render("./../views/questions/index", {
          title: 'Questions',
          questions: questions
        });
      });
  }
};

/*
 * GET /questions/:id
 */

exports.show = function(req, res) {
  switch (req.params.format) {
    case 'json':
      return Question.findOne({
        _id: req.params.id
      }, function(err, question) {
        if (err) {
          return res.send({
            'error': err
          }, {
            'Content-Type': 'application/json'
          }, 404);
        } else {
          return res.send(question, {
            'Content-Type': 'application/json'
          }, 200);
        }
      });
      break;
    default:
      return Question.findOne({
        _id: req.params.id
      }, function(err, question) {
        if (err) {
          // Should probably redirect to a 404 page here.
        }
      
        return res.render("./../views/questions/show", {
          title: question.value,
          question: question
        });
      });
  }
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
    if (err) {
      //todo: send to error page when saving failed
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
      if (err) {
        //todo: send to error page when saving failed
      }

      // redirect to results
      res.redirect('/results/' + question.id);
    });
  });
};
