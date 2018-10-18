var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  content: String,
  detailContent: String,
  checked: Boolean,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('todo', todoSchema);
