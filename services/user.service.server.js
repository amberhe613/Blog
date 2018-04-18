module.exports = function (app) {
  var UserModel = require("../model/user/user.model.server");
  var passport = require('passport');
  var bcrypt = require("bcrypt-nodejs");

  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(localStrategy));
  function localStrategy(usrn, pass, done) {
    UserModel
      .findUserByUsername(usrn)
      .then(
        function(user) {
          if(user.username === usrn
            && bcrypt.compareSync(pass, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }});}


  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    UserModel
      .findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        },
        function (err) {
          done(err, null);
        }
      );
  }
  app.post('/api/register', register);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    UserModel
      .createUser(user)
      .then(function (user) {
        req.login(user, function (err) {
          res.json(user);
        });
      });
  }

  function login(req, res) {
    res.json(req.user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function loggedIn(req, res) {
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }

  app.put('/api/user/:userId', function(req, res) {
    //Check if all fields are provided and are valid:
    if (!req.params.userId
      || !req.body.username
      || !req.body.firstName
      || !req.body.lastName) {
      res.status(400);
      res.json({message: "Bad Request"});
    } else {
      UserModel.findByIdAndUpdate(req.params.userId, {$set:req.body}, function(err, updateUser){
        if(err){
          res.status(400);
          res.json({message: "Not Found"});
        } else {
          res.json({message: "User id " + req.params.userId + " updated.",
            location: "/api/user/" + req.params.userId});
        }
      });
    }
  });

};
