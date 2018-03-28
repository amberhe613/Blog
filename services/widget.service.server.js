var express = require('express');
var router = express.Router();
var widgets = [
  {_id: '123', widgetType: 'HEADING', pageId: '321', size: 2, text: 'GIZMODO'},
  {_id: '234', widgetType: 'HEADING', pageId: '321', size: 4, text: 'Lorem ipsum'},
  {_id: '345', widgetType: 'IMAGE', pageId: '321', width: '100%',
    url: 'http://images.beyazgazete.com/haber/2012/10/5/20121005_ofiste-basarinin-anahtari-yavru-kedi-resimleri.jpg'},
  {_id: '456', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'},
  {_id: '567', widgetType: 'HEADING', pageId: '321', size: 4, text: 'Lorem ipsum'},
  {_id: '678', widgetType: 'YOUTUBE', pageId: '321', width: '100%', url: 'https://www.youtube.com/embed/aqHhpahguVY'},
  {_id: '789', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'},
  {_id: '321', widgetType: 'HEADING', pageId: '234', size: 2, text: 'GIZMODO'},
  {_id: '432', widgetType: 'HEADING', pageId: '234', size: 4, text: 'Lorem ipsum'},
  {_id: '543', widgetType: 'IMAGE', pageId: '234', width: '100%',
    url: 'http://images.beyazgazete.com/haber/2012/10/5/20121005_ofiste-basarinin-anahtari-yavru-kedi-resimleri.jpg'},
  {_id: '654', widgetType: 'HTML', pageId: '234', text: '<p>Lorem ipsum</p>'},
  {_id: '765', widgetType: 'HEADING', pageId: '234', size: 4, text: 'Lorem ipsum'},
  {_id: '876', widgetType: 'YOUTUBE', pageId: '234', width: '100%', url: 'https://www.youtube.com/embed/aqHhpahguVY'},
  {_id: '987', widgetType: 'HTML', pageId: '234', text: '<p>Lorem ipsum</p>'}
];

// POST createWidget
router.post('/page/:pageId/widget', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.body.widgetType){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var newId = (String(Date.now()) + Math.floor(Math.random() * 10000)).slice(-3);
      widgets.push({
        _id: newId,
        widgetType: req.body.widgetType,
        pageId: req.params.pageId,
        size: req.body.size,
        text: req.body.text,
        width: req.body.width,
        url: req.body.url
      });
    res.json({message: "New widget created.", location: "/api/widget/" + newId});
  }
});

// GET findAllWidgetsForPage
router.get('/page/:pageId/widget', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.pageId.toString().match(/^[0-9]{3,}$/g)){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var curWidgets = widgets.filter(function(widget){
      if(widget.pageId == req.params.pageId){
        return true;
      }
    });
    if (curWidgets.length > 0) {
      res.json(curWidgets);
    } else {
      res.status(400);
      res.json({message: "Not Found"});
    }
  }
});

// GET findWidgetById
router.get('/widget/:widgetId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.widgetId.toString().match(/^[0-9]{3,}$/g)){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    var curWidget = widgets.filter(function(widget){
      if(widget._id == req.params.widgetId){
        return true;
      }
    });
    if (curWidget.length == 1) {
      res.json(curWidget[0]);
    } else {
      res.status(400);
      res.json({message: "Not Found"});
    }
  }
});

// PUT updateWidget
router.put('/widget/:widgetId', function(req, res){
  //Check if all fields are provided and are valid:
  if(!req.params.widgetId.toString().match(/^[0-9]{3,}$/g)
    || !req.body.widgetType
    || !req.body.pageId){
    res.status(400);
    res.json({message: "Bad Request"});
  } else {
    //Gets us the index of widget with given id.
    var updateIndex = widgets.map(function(widget){
      return widget._id;
    }).indexOf(parseInt(req.params.widgetId).toString());

    if(updateIndex === -1){
      //Widget not found, create new widget
      widgets.push({
        _id: req.params.widgetId,
        widgetType: req.body.widgetType,
        pageId: req.body.pageId,
        size: req.body.size,
        text: req.body.text,
        width: req.body.width,
        url: req.body.url
      });
      res.json({
        message: "New widget created.", location: "/api/widget/" + req.params.widgetId});
    } else {
      //Update existing widget
      widgets[updateIndex] = {
        _id: req.params.widgetId,
        widgetType: req.body.widgetType,
        pageId: req.body.pageId,
        size: req.body.size,
        text: req.body.text,
        width: req.body.width,
        url: req.body.url
      };
      res.json({message: "Widget id " + req.params.widgetId + " updated.",
        location: "/api/widget/" + req.params.widgetId});
    }
  }
});

// DELETE deleteWidget
router.delete('/widget/:widgetId', function(req, res){
  //Gets us the index of widget with given id.
  var removeIndex = widgets.map(function(widget){
    return widget._id;
  }).indexOf(parseInt(req.params.widgetId).toString());

  if(removeIndex === -1){
    res.json({message: "Not found"});
  } else {
    widgets.splice(removeIndex, 1);
    res.send({message: "Widget id " + req.params.widgetId + " removed."});
  }
});


module.exports = router;
