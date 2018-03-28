var express = require('express');
var router = express.Router();
  var users = [
  {_id: '123', username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder'},
  {_id: '234', username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'},
  {_id: '345', username: 'charlie', password: 'charlie', firstName: 'Charlie', lastName: 'Garcia'}
];

// POST createUser
router.post('/', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.body.username || !req.body.password){
      res.status(400);
      res.json({message: "Bad Request"});
  } else {
    var newId = (String(Date.now()) + Math.floor(Math.random() * 10000)).slice(-3);
    users.push({
      _id: newId,
      username: req.body.username,
      password: req.body.password
    });
    res.json(parseInt(newId));
  }
});

// GET findUserByUsername
router.get('/', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.query.username){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var curUser = users.filter(function(user){
      if(user.username == req.query.username){
        return true;
      }
    });
    if (curUser.length == 1) {
      res.json(curUser[0]);
    } else {
      res.status(400);
      res.json({message: "Not Found"});
    }
  }
});

// GET findUserByCredentials
router.get('/', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.query.username || !req.query.password){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var curUser = users.filter(function(user){
      if(user.username == req.query.username && user.password == req.query.password){
        return true;
      }
    });
    if (curUser.length == 1) {
      res.json(curUser[0]);
    } else {
      res.status(400);
      res.json({message: "Not Found"});
    }
  }
});

// GET findUserById
router.get('/:userId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.userId.toString().match(/^[0-9]{3,}$/g)){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var curUser = users.filter(function(user){
      if(user._id == req.params.userId){
        return true;
      }
    });
    if (curUser.length == 1) {
      res.json(curUser[0]);
    } else {
      res.status(400);
      res.json({message: "Not Found"});
    }
  }
});

// PUT updateUser
router.put('/:userId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.userId.toString().match(/^[0-9]{3,}$/g)
    || !req.body.username
    || !req.body.firstName
    || !req.body.lastName){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    //Gets us the index of user with given id.
    var updateIndex = users.map(function(user){
      return user._id;
    }).indexOf(parseInt(req.params.userId).toString());


    if(updateIndex === -1){
      //User not found, create new user
      users.push({
        _id: req.params.userId,
        username: req.body.username,
        password: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      });
      res.json({
        message: "New user created.", location: "/api/user/" + req.params.userId});
    } else {
      //Update existing user
      users[updateIndex] = {
        _id: req.params.userId,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };
      res.json({message: "User id " + req.params.userId + " updated.",
        location: "/api/user/" + req.params.userId});
    }
  }
});

// DELETE deleteUser
router.delete('/:userId', function(req, res){
  //Gets us the index of user with given id.
  var removeIndex = users.map(function(user){
    return user._id;
  }).indexOf(parseInt(req.params.userId).toString());

  if(removeIndex === -1){
    res.json({message: "Not found"});
  } else {
    users.splice(removeIndex, 1);
    res.send({message: "User id " + req.params.userId + " removed."});
  }
});

module.exports = router;
