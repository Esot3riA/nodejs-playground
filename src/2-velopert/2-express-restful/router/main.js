module.exports = function(app, fs) {
	
	app.get('/', function(req, res) {
		var sess = req.session;
		res.render('index', {
			title: "MY HOMEPAGE",
			length: 5,
			name: sess.name,
			username: sess.username
		});
	});
	
	app.get('/list', function(req, res) {
		fs.readFile(__dirname + "/../data/user.json", 
					"utf8", function(err, data) {
			console.log(data);
			res.end(data);
		});
	});
	
	app.get('/user/:username', function(req, res) {
		fs.readFile(__dirname + "/../data/user.json",
				   "utf8", function(err, data) {
			var users = JSON.parse(data);
			res.json(users[req.params.username]);
		});
	});
	
	app.post('/user/:username', function(req, res) {
		var result = {};
		var username = req.params.username;
		
		// Check req validity.
		if (!req.body.password || !req.body.name) {
			result.success = 0;
			result.error = "invalid request.";
			res.json(result);
			return;
		}
		
		// Load data & Check duplication.
		fs.readFile(__dirname + "/../data/user.json", "utf8", 
				   function(err, data) {
			var users = JSON.parse(data);
			if (users.username) {
				// Duplication found.
				result.success = 0;
				result.error = "duplicated.";
				res.json(result);
				return;
			}
			
			// Add data.
			users[username] = req.body;
			
			// Save data.
			fs.writeFile(__dirname + "/../data/user.json",
						JSON.stringify(users, null, '\t'), "utf8",
						function(err, data) {
				result.success = 1;
				res.json(result);
			});
			
		});
		
	});
	
	app.put('/user/:username', function(req, res) {
		var result = {};
		var username = req.params.username;
	
		// Check req validity.
		if (!req.body.password || !req.body.name) {
			result.success = 0;
			result.error = "invalid request.";
			res.json(result);
			return;
		}
		
		// Load data & Check data exist.
		fs.readFile(__dirname + "/../data/user.json", "utf8", 
				   function(err, data) {
			var users = JSON.parse(data);
			if (!users[username]) {
				// Not exist user.
				result.success = 0;
				result.error = "user is not exist.";
				res.json(result);
				return;
			}
			
			// Modify data.
			users[username] = req.body;
			
			// Save data.
			fs.writeFile(__dirname + "/../data/user.json",
						JSON.stringify(users, null, '\t'), "utf8",
						function(err, data) {
				result.success = 1;
				res.json(result);
			});
			
		});
		
	});
	
	app.delete('/user/:username', function(req, res) {
		var result = {};
		var username = req.params.username;
		
		fs.readFile(__dirname + "/../data/user.json", "utf8", 
				   function(err, data) {
			var users = JSON.parse(data);
			if (!users[req.params.username]) {
				// Not exist user.
				result.success = 0;
				result.error = "not found.";
				res.json(result);
				return;
			}
			
			// Delete user.
			delete users[req.params.username];
			fs.writeFile(__dirname + "/../data/user.json",
						JSON.stringify(users, null, '\t'), "utf8",
						function(err, data) {
				result.success = 1;
				res.json(result);
			});
		});
	});
	
	app.get('/login/:username/:password', function(req, res) {
		var sess = req.session;
		fs.readFile(__dirname + "/../data/user.json", "utf8", 
					function(error, data) {
			var users = JSON.parse(data);
			var username = req.params.username;
			var password = req.params.password;
			var result = {};
			if (!users[username]) {
				// Username is not found.
				result.success = 0;
				result.error = "username is not found.";
				res.json(result);
				return;
			}
			
			if (users[username].password == password) {
				result.success = 1;
				sess.username = username;
				sess.name = users[username].name;
				res.json(result);
			} else {
				result.success = 0;
				result.error = "login information is incorrect.";
				res.json(result);
			}
		});
	});
	app.get('/logout', function(req, res) {
		var sess = req.session;
		if (sess.username) {
			req.session.destroy(function(err) {
				if (err)
					console.log(err);
				else
					res.redirect('/');
			});
		} else
			res.redirect('/');
	});
	
};