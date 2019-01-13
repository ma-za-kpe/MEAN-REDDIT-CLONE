var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const {
  ObjectID
} = require('mongodb');

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

//GET /votes/:id
router.get('/api/votes/:id', (req, res) => {

  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    // return res.status(404).send();
    handleError(res.status(404), err.message, "Invalid id");
  }

  Vote.findById(id).then((vote) => {
    if (!vote) {
      // return res.status(404).send();
      handleError(res.status(404), err.message, "id not found");
    } else {
      res.send({
        vote
      });
    }
  }).catch((e) => {
    res.status(400).send();
    //change this error message
    handleError(res.status(404), err.message, "ID NOT PRESENT");
  });

});

//geting vote by id
// router.get('/api/vote/:id', (req, res, next) => {
//   UserReg.findById(req.params.id, (err, vote) => {
//     if (err)
//       console.log(err);
//     else
//       res.send(vote);
//   });
// });

//adding votes
router.post('/api/addVote', (req, res, next) => {
  const addVote = new Vote({
    title: req.body.title,
    link: req.body.link,
    upVote: req.body.upVote,
    downVote: req.body.downVote
  });
  addVote.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(err)
    }
  });

});

//updating titles etc by the admin
router.put('/api/editVote/:id', (req, res, next) => {
  if (!(req.params && req.params.id)) {
    // res.status(404).send("Invalid ID");
    handleError(res.status(404), err.message, "Invalid ID");
  } else {
    var edit = {
      title: req.body.title,
      link: req.body.link,
      upVote: req.body.upVote,
      downVote: req.body.downVote
    };

    Vote.findByIdAndUpdate(req.params.id, {
      $set: edit
    }, {
      new: true
    }, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.json(data);
      }
    })

  }
  //);
});

// delete titles
//delete route
router.delete('/delete/:id', (req, res) => {
  Vote.findByIdAndRemove(req.params.id, (err, data) => {
    if (err)
      console.log(err);
    else
      res.send(data);
  })
});

//upVote 
router.put('/api/upVote/:id', (req, res, next) => {
  if (!(req.params && req.params.id)) {
    // res.status(404).send("Invalid ID");
    handleError(res.status(404), err.message, "Invalid ID");
  } else {

    var update = {
      $inc: {
        upVote: 1
      }
    };
    var options = {
      'new': true
    };
    Vote.findOneAndUpdate({
      _id: req.params.id
    }, update, options, (err, doc) => {
      if (err) {
        res.send(err)
      } else {
        res.json(doc);
      }
    });

  }
  //);
});

//downVote 
router.put('/api/downVote/:id', (req, res, next) => {
  if (!(req.params && req.params.id)) {
    // res.status(404).send("Invalid ID");
    handleError(res.status(404), err.message, "Invalid ID");
  } else {

    var update = {
      $inc: {
        upVote: -1
      }
    };
    var options = {
      'new': true
    };
    Vote.findOneAndUpdate({
      _id: req.params.id
    }, update, options, (err, doc) => {
      if (err) {
        res.send(err)
      } else {
        res.json(doc);
      }
    });

  }
  //);
});


module.exports = router;
