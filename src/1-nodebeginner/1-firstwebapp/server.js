// In goorm.io, need project - properties - nodejs property - server check.
// access url : https://nodejs-playground-exerk.run.goorm.io/
// port is fixed to 3000!

var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	}
	
	http.createServer(onRequest).listen(3000);
	console.log("Server has started.");
}

exports.start = start;
