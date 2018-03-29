var express = require('express');
var router = express.Router();
var User     = require("./user.schema.server");

// POST createUser
router.post('/', function(req, res) {
  //Check if all fields are provided and are valid:
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var newUser = new User({username: req.body.username, password: req.body.password});
    newUser.save(function (err) {
    if (err) {
      res.status(400);
      res.json({message: "Bad Request"});
    } else {
      res.json(newUser._id);
    }
  });
  }
});

// GET findUserByUsername
router.get('/', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.query.username){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    User.findOne({username: req.query.username}, function (err, user) {
      if (user) {
        res.json(user);
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// GET findUserByCredentials
//TODO: password verify
router.get('/', function(req, res) {
  //Check if all fields are provided and are valid:
  if (!req.query.username || !req.query.password) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {

    User.findOne({username: req.query.username, password:req.query.password})
        .exec(function(err, user){
      if (user) {
        return true;
        res.json(user);
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// GET findUserById
router.get('/:userId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.userId){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    User.findById(req.params.userId, function (err, user) {
      if (user) {
        res.json(user);
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// PUT updateUser
router.put('/:userId', function(req, res) {
  //Check if all fields are provided and are valid:
  if (!req.params.userId
    || !req.body.username
    || !req.body.firstName
    || !req.body.lastName) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    User.findByIdAndUpdate(req.params.userId, {$set:req.body}, function(err, updateUser){
      if(err){
        res.status(400);
        res.json({message: "Not Found"});
      } else {
        res.json({message: "User id " + req.params.userId + " updated.",
          location: "/api/user/" + req.params.userId});
      }
    });
  }
});

// DELETE deleteUser
router.delete('/:userId', function(req, res){
  //Check if all fields are provided and are valid:
  if (!req.params.userId) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    User.findByIdAndRemove(req.params.userId, function (err, deleteUser) {
      if (err) {
        res.status(400);
        res.json({message: "Not found"});
      } else {
        res.send({message: "User id " + req.params.userId + " removed."});
      }
    });
  }
});

module.exports = router;
