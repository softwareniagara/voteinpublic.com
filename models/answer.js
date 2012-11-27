var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , timestamps = require('./../lib/plugins/timestamps.js')
  , location = require('./../lib/plugins/location.js')
  , Question = require('./question')
  , Answer;
  
Answer = new mongoose.Schema({
  value: {
    type: String
  },
  question_id: {
    type: String
  }
});

Answer.pre('save', function(next) {
  // Needs to happen before it is timestamped so we know the answer is fresh.
  if (typeof this.question_id !== 'undefined' && typeof this.modified_at === 'undefined') {
    Question.findOne({_id: this.question_id}, function(err, question) {
      question.numAnswers = question.numAnswers + 1;
      question.save(function(err, question) {
        // who cares what happens. Let's assume it worked.
        console.log(question.numAnswers);
      });
    });
  }
  next();
});

Answer.plugin(timestamps);
Answer.plugin(location);

module.exports = mongoose.model('Answer', Answer);
