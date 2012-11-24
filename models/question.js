var mongoose     = require('mongoose')
  , Schema       = mongoose.Schema
  , timestamps   = require('./../lib/plugins/timestamps.js')
  , questionizer = require('./../lib/plugins/questionizer.js')
  , Question;
  
Question = new mongoose.Schema({
  value: {
    type: String
  },
  possibleAnswers: {
    type: Array,
    default: ['no','yes']
  },
  numAnswers: {
    type: Number,
    default: 0
  }
});

Question.path('value').validate(function(v) {
   return v.length <= 140;
}, 'Your question must be less than 140 characters. Please revise.');

Question.path('value').validate(function(v) {
   return v && v.length > 0;
}, 'You must ask a question.');

Question.plugin(timestamps);
Question.plugin(questionizer, {properties: ['value']});

module.exports = mongoose.model('Question', Question);
