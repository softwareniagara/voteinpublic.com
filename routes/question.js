var Question = require('./../models/question.js');

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
