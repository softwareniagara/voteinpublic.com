var Question = require('./../models/question.js')
  , exec = require('child_process').exec;

var Answer = require('./../models/answer.js');

/*
 * GET /api/questions
 */
exports.list = function(req, res) {
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
};

/*
 * GET /questions
 */
exports.index = function(req, res) {
  return Question.find(function(err, questions) {
    res.render("./../views/questions/index", {
      title: 'Questions',
      questions: questions
    });
  });
};

/*
 * GET /questions/:id
 */
exports.show = function(req, res) {
  question = Question.findOne({
    _id: req.params.id
  }, function(err, question) {
    res.render("./../views/questions/show", {
      title: question.value,
      question: question
    });
  });
};

/*
 * POST /question
 */
exports.create = function(req, res) {

  var questionValue = req.body.question.trim();

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
      location: {
        latitude: '43.155684',
        longitude: '-79.246513'
      }
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