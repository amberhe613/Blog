// server.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var passport = require('passport');
var multer = require('multer');
var path =require('path');
var upload = multer();
mongoose.connect('mongodb://amber:123@ds127589.mlab.com:27589/blog');

// for cross-origin resource sharing (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// install, load, and configure body parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(upload.array());

var sess = ({
  resave: true,
  saveUninitialized: true
});
if (app.get('env' === 'production')) {
  sess.secret = process.env.SESSION_SECRET;
} else {
  sess.secret = "Spring in the Mountains";
}
app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());


// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

require('./services/user.service.server')(app);
var website = require('./model/website/website.model.server');
var page = require('./model/page/page.model.server');
var widget = require('./model/widget/widget.model.server');

//Use the Router on the sub route
app.use('/api', website);
app.use('/api', page);
app.use('/api', widget);
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
