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

/*
 * GET /results/clustered.:format?
 */
var getClusteredAnswers = function(question_id, callback) {
   return Answer.findOne({
    question_id: req.params.id
   }, function(err, answer) {
      return Answer.find({
          question_id: req.params.id
      })
   });
}

var getClusteredAnswers = function(answer, question_id, answers, results, callback) {
  return Answer.find({
    question_id: question_id,
    _id: {$nin: answers},
    coordinates: { $nearSphere: answer.coordinates, $maxDistance: 0.01}
  }, function(err, rawResults) {
    if (err) {
      return callback(err, null);
    } else {
      var result = {
        yes: 0,
        no: 0,
        coordinates: null
      };

      if (answer) {
        result.coordinates = answer.coordinates;
        if (answer.value == 'yes') {
          result.yes = result.yes + 1;
        } else if (answer.value == 'no') {
          result.no = result.no + 1;
        }
      }

      if (rawResults && rawResults.length > 0) {
        for (var i = 0, max = rawResults.length; i < max; i++) {
          var rawResult = rawResults[i];
          answers.push(rawResult.id);
          if (rawResult.value == 'yes') {
            result.yes = result.yes + 1;
          } else if (rawResult.value == 'no') {
            result.no = result.no + 1;
          }
          result.coordinates = rawResult.coordinates;
        }

        results.push(result);

        return Answer.findOne({
          question_id: question_id,
          _id: {$nin: answers}
        }, function(err, answer) {
          if (err) {
            return callback(err, null);
          } else {
            return getClusteredAnswers(answer, question_id, answers, results, callback);
          }
        });
      } else {
        results.push(result);
        return callback(null, results);
      }
    }
  });
};

exports.clustered = function(req, res) {
  return Answer.findOne({
    question_id: req.params.id
  }, function(err, answer) {
    if (err) {
      res.status = '500';
      res.setHeader('Content-Type', 'application/json');
      return res.send({'error': 'Cannot find a result for this answer'});
    } else {
      var answers = [answer.id];
      return getClusteredAnswers(answer, req.params.id, answers, [], function(err, results) {
        if (err) {
          res.status = '500';
          res.setHeader('Content-Type', 'application/json');
          return res.send({
            'error': 'Error clustering results for this answer'
          });
        } else {
          res.status = '200';
          res.setHeader('Content-Type', 'application/json');
          return res.send(results);
        }
      });
    }
  });
}