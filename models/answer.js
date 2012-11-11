var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , timestamps = require('./../lib/plugins/timestamps.js')
  , location = require('./../lib/plugins/location.js')
  , Answer;
  
Answer = new mongoose.Schema({
  value: {
    type: String
  },
  question_id: {
    type: String
  }
});

Answer.plugin(timestamps);
Answer.plugin(location);

module.exports = mongoose.model('Answer', Answer);
