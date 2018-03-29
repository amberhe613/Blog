var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WebsiteSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: String,
  description: String,
  pages:
    [{
      type: Schema.Types.ObjectId,
      ref: "Page"
    }],
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Website", WebsiteSchema);
