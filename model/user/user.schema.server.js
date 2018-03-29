var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites:
    [{
      type: Schema.Types.ObjectId,
      ref: "Website"
    }],
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
