var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
  _website: {
    type: Schema.Types.ObjectId,
    ref: "Website"
  },
  name: String,
  title: String,
  description: String,
  widgets:[{
    type: Schema.Types.ObjectId,
    ref: "Widget"
  }],
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Page", PageSchema);
