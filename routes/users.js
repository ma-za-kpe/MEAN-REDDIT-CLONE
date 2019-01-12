var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// const vote = mongoose.model('vote');
const Vote = require('../models/vote')

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({
    "error": message
  });
}


//get votes
router.get('/api/getVotes', (req, res, next) => {
  Vote.find((err, data) => {
    if (err) {
      // res.send(err)
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.json(data);
    }
  });
});

router.post('/api/addVote', (req, res, next) => {
  const addVote = new Vote({
    name: req.body.name
  });
  addVote.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(err)
    }
  });

});

module.exports = router;
