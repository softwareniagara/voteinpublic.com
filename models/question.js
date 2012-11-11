var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
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

module.exports = mongoose.model('Question', Question);
