var Question = require('./../models/question.js');
var Answer = require('./../models/answer.js');

/*
 * GET /results
 */

exports.index = function(req, res){
  // get latest trends
  res.render("./../views/results/index", {
    title: 'Trends'
  });
};

/*
 * GET /results/:id
 */

exports.show = function(req, res){
  Question.findOne({
    _id: req.params.id
  }, function(err, question) {
    Answer.find({
      question_id: req.params.id
    }, function(err, answers) {
      res.render("./../views/results/show", {
        title: 'Results',
        question: question,
        answers: answers
      });
    });
  });
};