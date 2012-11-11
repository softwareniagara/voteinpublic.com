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
 * GET /results/:id.:format?
 */

exports.show = function(req, res) {
  var callback;
  
  switch (req.params.format) {
    case 'json':
      callback = function(err, question, answers) {
        if (err) {
          res.statusCode = '500';
          res.setHeader('Content-Type', 'application/json');
          return res.send({
            'error': 'There was an error retrieving results for this question.'
          });
        } else {
          res.statusCode = '200';
          res.setHeader('Content-Type', 'application/json');
          return res.send(answers);
        }
      };
      break;
    default:
      callback = function(err, question, answers) {
        if (err) {
          return res.redirect('/500');
        } else {
          return res.render("./../views/results/show", {
            title: 'Results',
            question: question,
            answers: answers
          });
        }
      }
  }
  
  return Question.findOne({
    _id: req.params.id
  }, function(err, question) {
    if (err) {
      return callback(err, null, null);
    }
  
    return Answer.find({
      question_id: req.params.id
    }, function(err, answers) {
      callback(err, question, answers);
    });
  });
};
