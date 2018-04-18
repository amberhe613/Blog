var mongoose = require("mongoose");
var userModel = require("./user.schema.server");

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;

function createUser(user) {
  return userModel.create(user);
}
function findUserById(userId) {
  return userModel.findById(userId);
}
function findUserByCredentials(username, password) {
  return userModel.findOne({'username': username, 'password': password}, function(err, user) {
  });
}
function findUserByUsername(username) {
  return userModel.findOne({'username': username});
}


module.exports = userModel;
