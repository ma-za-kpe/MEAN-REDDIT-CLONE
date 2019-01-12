const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
