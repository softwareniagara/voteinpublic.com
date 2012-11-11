var Question = require('./../models/question')
  , exec = require('child_process').exec;

/*
 * GET index
 */

exports.index = function(req, res){
  res.render('questions/index', { title: 'Poll App!' });
};

/*
 * POST create
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