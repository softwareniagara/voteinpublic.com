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
    default: ['yes', 'no']
  }
});

Question.plugin(timestamps);

module.exports = mongoose.model('Question', Question);
