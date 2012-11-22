var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , timestamps = require('./../lib/plugins/timestamps.js')
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

module.exports = mongoose.model('Question', Question);
