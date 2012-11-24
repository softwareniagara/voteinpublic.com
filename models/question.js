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

Question.plugin(timestamps);
Question.plugin(questionizer, {properties: ['value']});

module.exports = mongoose.model('Question', Question);
