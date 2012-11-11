var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , timestamps = require('./../lib/plugins/timestamps.js')
  , location   = require('./../lib/plugins/location.js')
  , Question
  , Answer = require('./answer.js').Schema;
  
Question = new mongoose.Schema({
  value: {
    type: String
  },
  possibleAnswers: {
    type: Array,
    default: ['yes', 'no']
  },
  answers: [Answer]
});

Question.plugin(timestamps);
Question.plugin(location);

module.exports = mongoose.model('Question', Question);
