var express = require('express');
var router = express.Router();
var websites = [
  {_id: '123', name: 'Facebook', developerId: '456', description: 'Lorem'},
  {_id: '234', name: 'Tweeter', developerId: '456', description: 'Lorem'},
  {_id: '456', name: 'Gizmodo', developerId: '456', description: 'Lorem'},
  {_id: '890', name: 'Go', developerId: '123', description: 'Lorem'},
  {_id: '567', name: 'Tic Tac Toe', developerId: '123', description: 'Lorem'},
  {_id: '678', name: 'Checkers', developerId: '123', description: 'Lorem'},
  {_id: '789', name: 'Chess', developerId: '234', description: 'Lorem'}
];

// POST createWebsite
router.post('/user/:userId/website', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.body.name || !req.body.description){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var newId = (String(Date.now()) + Math.floor(Math.random() * 10000)).slice(-3);
    websites.push({
      _id: newId,
      name: req.body.name,
      developerId: req.params.userId,
      description: req.body.description
    });
    res.json({message: "New Website created.", location: "/api/website/" + newId});
  }
});

// GET findAllWebsitesForUser
router.get('/user/:userId/website', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.userId.toString().match(/^[0-9]{3,}$/g)){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var curWebsites = websites.filter(function(website){
      if(website.developerId == req.params.userId){
        return true;
      }
    });
    if (curWebsites.length >= 0) {
      res.json(curWebsites);
    } else {
      res.status(400);
      res.json({message: "Not Found"});
    }
  }
});

// GET findWebsiteById
router.get('/website/:websiteId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.websiteId.toString().match(/^[0-9]{3,}$/g)){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var curWebsite = websites.filter(function(website){
      if(website._id == req.params.websiteId){
        return true;
      }
    });
    if (curWebsite.length == 1) {
      res.json(curWebsite[0]);
    } else {
      res.status(400);
      res.json({message: "Not Found"});
    }
  }
});

// PUT updateWebsite
router.put('/website/:websiteId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.websiteId.toString().match(/^[0-9]{3,}$/g)
    || !req.body.developerId
    || !req.body.name
    || !req.body.description){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    //Gets us the index of website with given id.
    var updateIndex = websites.map(function(website){
      return website._id;
    }).indexOf(parseInt(req.params.websiteId).toString());

    if(updateIndex === -1){
      //User not found, create new website
      websites.push({
        _id: req.params.websiteId,
        name: req.body.name,
        developerId: req.body.developerId,
        description: req.body.description
      });
      res.json({
        message: "New website created.", location: "/api/website/" + req.params.websiteId});
    } else {
      //Update existing website
      websites[updateIndex] = {
        _id: req.params.websiteId,
        name: req.body.name,
        developerId: req.body.developerId,
        description: req.body.description
      };
      res.json({message: "Website id " + req.params.websiteId + " updated.",
        location: "/api/website/" + req.params.websiteId});
    }
  }
});

// DELETE deleteWebsite
router.delete('/website/:websiteId', function(req, res){
  //Gets us the index of website with given id.
  var removeIndex = websites.map(function(website){
    return website._id;
  }).indexOf(parseInt(req.params.websiteId).toString());

  if(removeIndex === -1){
    res.json({message: "Not found"});
  } else {
    websites.splice(removeIndex, 1);
    res.send({message: "Website id " + req.params.websiteId + " removed."});
  }
});

module.exports = router;
