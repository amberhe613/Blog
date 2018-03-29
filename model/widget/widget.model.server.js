var express = require('express');
var router = express.Router();
var Page = require("../page/page.schema.server");
var Widget = require("./widget.schema.server");

// POST createWidget
router.post('/page/:pageId/widget', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.body.widgetType){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Page.findById(req.params.pageId, function (err, page) {
      if (page) {
        var newWidget = new Widget({
          _page: page,
          type: req.body.widgetType,
          size: parseInt(req.body.size),
          text: req.body.text,
          width: req.body.width,
          url: req.body.url
        });
        newWidget.save(function (err) {
          if (err) {
            res.status(400);
            res.json({message: "Bad Request"});
          } else {
            page.widgets.push(newWidget._id);
            page.save();
            res.json({message: "New widget created.", location: "/api/widget/" + newWidget._id});
          }
        });
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// GET findAllWidgetsForPage
router.get('/page/:pageId/widget', function(req, res) { //Check if all fields are provided and are valid:
if(!req.params.pageId){
  res.status(400);
  res.json({message: "Bad Request"});
} else {
    Widget.find({_page: req.params.pageId}, function (err, widgets) {
      if (widgets) {
        var widgetMap = [];

        widgets.forEach(function(widget){
          widgetMap.push(widget);
        });
        res.json(widgetMap);
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// GET findWidgetById
router.get('/widget/:widgetId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.widgetId){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Widget.findById(req.params.widgetId, function (err, widget) {
      if (widget) {
        res.json(widget);
      } else {
        res.status(400);
        res.json({message: "Not Found"});
      }
    });
  }
});

// PUT updateWidget
router.put('/widget/:widgetId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.widgetId
    || !req.body.widgetType){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Widget.findByIdAndUpdate(req.params.widgetId, {$set:req.body}, function(err, updateWidget){
      if(err){
        res.status(400);
        res.json({message: "Not Found"});
      } else {
        res.json({message: "Widget id " + req.params.widgetId + " updated.",
          location: "/api/widget/" + req.params.widgetId});
      }
    });
  }
});

// DELETE deleteWidget
router.delete('/widget/:widgetId', function(req, res){
  //Check if all fields are provided and are valid:
  if (!req.params.widgetId) {
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    Widget.findByIdAndRemove(req.params.widgetId, function (err, deleteWidget) {
      if (err) {
        res.status(400);
        res.json({message: "Not found"});
      } else {
        var pageId = deleteWidget._page;
        Page.findById(pageId, function (err, page) {
          var removeIndex = page.widgets.map(function(widget){
            return widget._id;
          }).indexOf(parseInt(req.params.widgetId).toString());
          page.widgets.splice(removeIndex, 1);
          page.save();
          res.send({message: "Widget id " + req.params.widgetId + " removed."});
        });
      }
    });
  }
});

module.exports = router;
