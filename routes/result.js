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
          countNo = answers.filter(filterNo).length;
          countYes = answers.filter(filterYes).length;
          yesWidth = roundNumber(countYes / answers.length * 100, 2);
          noWidth = roundNumber(countNo / answers.length * 100, 2); 
          return res.render("./../views/results/show", {
            title: 'Results',
            question: question,
            answers: answers,
            yesWidth: yesWidth,
            noWidth: noWidth,
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

var getClusteredAnswers = function(answer, question_id, answers, results, callback) {
  if (!answer) return callback(null, results);
  
  var result = {
    yes: 0,
    no: 0,
    coordinates: null,
    includedCoordinates: []
  };
  
  result.coordinates = answer.coordinates;
  result.includedCoordinates.push(answer.coordinates);
  if (answer.value == 'yes') result.yes = result.yes + 1;
  if (answer.value == 'no') result.no = result.no + 1;
  answers.push(answer.id);

  return Answer.find({
    question_id: question_id,
    _id: {$nin: answers},
    coordinates: { $nearSphere: answer.coordinates, $maxDistance: 0.00009}
  }, function(err, r) {
    if (err) {
      // Find another random answer.
      return Answer.findOne({
        question_id: question_id,
        _id: {$nin: answers}
      }, function(err, answer) {
        if (err) return callback(err, null);
        return getClusteredAnswers(answer, question_id, answers, results, callback);
      });
    }
    
    if (r && r.length > 0) {
      for (var i = 0, max = r.length; i < max; i++) {
        var insertNew = true
          , r1 = r[i];
          
        for (var j = 0, jMax = answers.length; j < jMax; j++) {
          if (answers[j] == r1.id) {
            insertNew = false;
            break;
          }
        }
        
        if (insertNew) {
          result.coordinates = r1.coordinates;
          result.includedCoordinates.push(r1.coordinates);
          if (r1.value == 'yes') result.yes = result.yes + 1;
          if (r1.value == 'no') result.no = result.no + 1;
          answers.push(r1.id);
        }
      }
      
      results.push(result);
      
      return Answer.findOne({
        question_id: question_id,
        _id: {$nin: answers}
      }, function(err, answer) {
        if (err) return callback(err, null);
        return getClusteredAnswers(answer, question_id, answers, results, callback);
      });
    } else {
      results.push(result);
      // Find another random answer.
      return Answer.findOne({
        question_id: question_id,
        _id: {$nin: answers}
      }, function(err, answer) {
        if (err) return callback(err, null);
        return getClusteredAnswers(answer, question_id, answers, results, callback);
      });
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

var filterYes = function(answer) {
  return answer.value == 'yes';
}

var filterNo = function(answer) {
  return answer.value == 'no';
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
