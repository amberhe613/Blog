var express = require('express');

var app = express();

module.exports = function(app){
  require("./model/user/user.model.server")(app);
  require("./services/website.service.server")(app);
  require("./services/page.service.server")(app);
  require("./services/widget.service.server")(app);
}
