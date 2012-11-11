var Question = require('./../models/question.js')
  , exec = require('child_process').exec;

/*
 * GET /questions
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
 * POST /question
 */
exports.create = function(req, res) {
  var question = new Question({
    value: req.body.question
  });

  question.value = question.value.trim();

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