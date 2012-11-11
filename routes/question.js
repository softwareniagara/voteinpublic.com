var Question = require('./../models/question.js')
  , exec = require('child_process').exec;

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
      return res.send({
        "error": err
      },{
        "Content-Type": "application/json"
      }, 422);
    }

    return res.send(question, {
      "Content-Type": "application/json"
    }, 200);
  });
};