// server.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://amber:123@ds127589.mlab.com:27589/blog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


// install, load, and configure body parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

var user = require('./model/user/user.model.server');
var website = require('./model/website/website.model.server');
var page = require('./model/page/page.model.server');
var widget = require('./model/widget/widget.model.server');

//Use the Router on the sub route
app.use('/api/user', user);
app.use('/api', website);
app.use('/api', page);
app.use('/api', widget);

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
