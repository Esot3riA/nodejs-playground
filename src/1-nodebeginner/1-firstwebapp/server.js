// In goorm.io, need project - properties - nodejs property - server check.
// access url : https://nodejs-playground-exerk.run.goorm.io/
// port is fixed to 3000!

var http = require("http");

http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("hello, world\n");
	response.write("it is working!");
	response.end();
}).listen(3000, function() {});
// Why need empty function?