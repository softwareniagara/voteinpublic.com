var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , timestamps = require('./../lib/plugins/timestamps.js')
  , location   = require('./../lib/plugins/location.js')
  , Question;
  
Question = new mongoose.Schema({
  value: {
    type: String
  },
  possibleAnswers: {
    type: Array,
    default: ['no','yes']
  }
});

Question.plugin(timestamps);
Question.plugin(location);

module.exports = mongoose.model('Question', Question);
