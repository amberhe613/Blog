// server.js
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// install, load, and configure body parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

var user = require('./services/user.service.server');
var website = require('./services/website.service.server');
var page = require('./services/page.service.server');
var widget = require('./services/widget.service.server');

//Use the Router on the sub route
app.use('/api/user', user);
app.use('/api', website);
app.use('/api', page);
app.use('/api', widget);

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
