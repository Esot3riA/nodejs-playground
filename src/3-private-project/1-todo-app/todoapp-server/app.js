var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Configure mongoose and connect to db.
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log("Connected to mongo server.");
});
mongoose.connect('mongodb://localhost/todoDB');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
// Handle CORS.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", 
             "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 3001;
var Todo = require('./models/todo');
var router = require('./routes')(app, Todo);

var server = app.listen(port, function() {
  console.log("Express server has started on port " + port);
});
