var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	title: String,
	author: String,
	published_date: {
		type: Date,
		default: Date.now
	}
});

// Generates 'Book' javascript instance.
module.exports = mongoose.model('book', bookSchema);