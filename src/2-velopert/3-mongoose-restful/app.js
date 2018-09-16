// Load packages.
var express		= require('express');
var app			= express();
var bodyParser	= require('body-parser');
var mongoose	= require('mongoose');

// Configure mongoose.
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
	console.log("Connected to mongodb server.");
});
mongoose.connect('mongodb://localhost/mongodb_tutorial');

// Define model.
var Book = require('./models/book');

// Configure app to use bodyParser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure server port.
var port = process.env.PORT || 3000;

// Configure router.
var router = require('./routes')(app, Book);

// Run server.
var server = app.listen(port, function() {
	console.log("Express server has started on port " + port + ".");
});