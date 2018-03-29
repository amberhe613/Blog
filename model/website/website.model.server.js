var express = require('express');
var router = express.Router();
var User = require("../user/user.schema.server");
var Website = require("./website.schema.server");

// POST createWebsite
router.post('/user/:userId/website', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.body.name || !req.body.description){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    User.findById(req.params.userId, function (err, user) {
      if (user) {
        var newWebsite = new Website({_user: user, name: req.body.name, description: req.body.description});
        newWebsite.save(function (err) {
          if (err) {
            res.status(400);
            res.json({message: "Bad Request"});
          } else {
            user.websites.push(newWebsite._id);
            user.save();
            res.json({message: "New website created.", location: "/api/website/" + newWebsite._id});
          }
        });
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// GET findAllWebsitesForUser
router.get('/user/:userId/website', function(req, res){
  if(!req.params.userId){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Website.find({_user: req.params.userId}, function (err, websites) {
      if (websites) {
        var websiteMap = [];

        websites.forEach(function(website){
          websiteMap.push(website);
        });
        res.json(websiteMap);
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// GET findWebsiteById
router.get('/website/:websiteId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.websiteId){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Website.findById(req.params.websiteId, function (err, website) {
      if (website) {
        res.json(website);
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// PUT updateUser
router.put('/website/:websiteId', function(req, res){
  //Check if all fields are provided and are valid:
  if (!req.params.websiteId
    || !req.body.name
    || !req.body.description) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Website.findByIdAndUpdate(req.params.websiteId, {$set:req.body}, function(err, updateWebsite){
      if(err){
        res.status(400);
        res.json({message: "Not Found"});
      } else {
        res.json({message: "Website id " + req.params.websiteId + " updated.",
          location: "/api/website/" + req.params.websiteId});
      }
    });
  }
});

// DELETE deleteUser
router.delete('/website/:websiteId', function(req, res){
  //Check if all fields are provided and are valid:
  if (!req.params.websiteId) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Website.findByIdAndRemove(req.params.websiteId, function (err, deleteWebsite) {
      if (err) {
        res.status(400);
        res.json({message: "Not found"});
      } else {
        var userId = deleteWebsite._user;
        User.findById(userId, function (err, user) {
          var removeIndex = user.websites.map(function(website){
            return website._id;
          }).indexOf(parseInt(req.params.websiteId).toString());
          user.websites.splice(removeIndex, 1);
          user.save();
          res.send({message: "Website id " + req.params.websiteId + " removed."});
        });
      }
    });
  }
});

module.exports = router;
