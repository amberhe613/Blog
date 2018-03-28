var express = require('express');
var router = express.Router();
var pages = [
  {_id: '321', name: 'Post 1', websiteId: '456', description: 'Lorem'},
  {_id: '432', name: 'Post 2', websiteId: '456', description: 'Lorem'},
  {_id: '543', name: 'Post 3', websiteId: '456', description: 'Lorem'},
  {_id: '234', name: 'Post 4', websiteId: '890', description: 'Lorem'},
  {_id: '567', name: 'Post 5', websiteId: '890', description: 'Lorem'}
];

// POST createPage
router.post('/website/:websiteId/page', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.body.name || !req.body.description){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var newId = (String(Date.now()) + Math.floor(Math.random() * 10000)).slice(-3);
    pages.push({
      _id: newId,
      name: req.body.name,
      websiteId: req.params.websiteId,
      description: req.body.description
    });
    res.json({message: "New page created.", location: "/api/page/" + newId});
  }
});

// GET findAllPagesForWebsite
router.get('/website/:websiteId/page', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.websiteId.toString().match(/^[0-9]{3,}$/g)){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var curPages = pages.filter(function(page){
      if(page.websiteId == req.params.websiteId){
        return true;
      }
    });
    if (curPages.length > 0) {
      res.json(curPages);
    } else {
      res.status(400);
      res.json({message: "Not Found"});
    }
  }
});

// GET findPageById
router.get('/page/:pageId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.pageId.toString().match(/^[0-9]{3,}$/g)){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var curPage = pages.filter(function(page){
      if(page._id == req.params.pageId){
        return true;
      }
    });
    if (curPage.length == 1) {
      res.json(curPage[0]);
    } else {
      res.status(400);
      res.json({message: "Not Found"});
    }
  }
});

// PUT updatePage
router.put('/page/:pageId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.pageId.toString().match(/^[0-9]{3,}$/g)
    || !req.body.websiteId
    || !req.body.name
    || !req.body.description){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    //Gets us the index of page with given id.
    var updateIndex = pages.map(function(page){
      return page._id;
    }).indexOf(parseInt(req.params.pageId).toString());

    if(updateIndex === -1){
      //User not found, create new user
      pages.push({
        _id: req.params.pageId,
        name: req.body.name,
        websiteId: req.body.websiteId,
        description: req.body.description
      });
      res.json({
        message: "New page created.", location: "/api/page/" + req.params.pageId});
    } else {
      //Update existing page
      pages[updateIndex] = {
        _id: req.params.pageId,
        name: req.body.name,
        websiteId: req.body.websiteId,
        description: req.body.description
      };
      res.json({message: "Page id " + req.params.pageId + " updated.",
        location: "/api/page/" + req.params.pageId});
    }
  }
});

// DELETE deletePage
router.delete('/page/:pageId', function(req, res){
  //Gets us the index of page with given id.
  var removeIndex = pages.map(function(page){
    return page._id;
  }).indexOf(parseInt(req.params.pageId).toString());

  if(removeIndex === -1){
    res.json({message: "Not found"});
  } else {
    pages.splice(removeIndex, 1);
    res.send({message: "Page id " + req.params.pageId + " removed."});
  }
});

module.exports = router;
