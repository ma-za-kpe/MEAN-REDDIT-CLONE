const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  upVote: {
    type: Number,
    required: true,
    default: 0
  },
  downVote: {
    type: Number,
    required: true,
    default: 0
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
