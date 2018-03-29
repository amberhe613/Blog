var express = require('express');
var router = express.Router();
var Website = require("../website/website.schema.server");
var Page = require("./page.schema.server");

// POST createPage
router.post('/website/:websiteId/page', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.body.name || !req.body.title){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Website.findById(req.params.websiteId, function (err, website) {
      if (website) {
        var newPage = new Page({_website: website, name: req.body.name, title: req.body.title});
        newPage.save(function (err) {
          if (err) {
            res.status(400);
            res.json({message: "Bad Request"});
          } else {
            website.pages.push(newPage._id);
            website.save();
            res.json({message: "New page created.", location: "/api/page/" + newPage._id});
          }
        });
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// GET findAllPagesForWebsite
router.get('/website/:websiteId/page', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.websiteId){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Page.find({_website: req.params.websiteId}, function (err, pages) {
      if (pages) {
        var pageMap = [];

        pages.forEach(function(page){
          pageMap.push(page);
        });
        res.json(pageMap);
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// GET findPageById
router.get('/page/:pageId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.pageId){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Page.findById(req.params.pageId, function (err, page) {
      if (page) {
        res.json(page);
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// PUT updatePage
router.put('/page/:pageId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.pageId
    || !req.body.name
    || !req.body.title){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Page.findByIdAndUpdate(req.params.pageId, {$set:req.body}, function(err, updatepage){
      if(err){
        res.status(400);
        res.json({message: "Not Found"});
      } else {
        res.json({message: "Page id " + req.params.pageId + " updated.",
          location: "/api/page/" + req.params.pageId});
      }
    });
  }
});

// DELETE deletePage
router.delete('/page/:pageId', function(req, res){
    //Check if all fields are provided and are valid:
    if (!req.params.pageId) {
      res.status(400);
      res.json({message: "Bad Request"});
    } else {
      Page.findByIdAndRemove(req.params.pageId, function (err, deletePage) {
        if (err) {
          res.status(400);
          res.json({message: "Not found"});
        } else {
          var websiteId = deletePage._website;
          Website.findById(websiteId, function (err, website) {
            var removeIndex = website.pages.map(function(page){
              return page._id;
            }).indexOf(parseInt(req.params.pageId).toString());
            wbesite.pages.splice(removeIndex, 1);
            wbesite.save();
            res.send({message: "Page id " + req.params.pageId + " removed."});
          });
        }
      });
    }
  });

module.exports = router;
