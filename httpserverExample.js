var http = require('http');
var through = require('through2');

function transform(buffer, _, next) {
	this.push(buffer.toString().toUpperCase());
	next();
};

var server = http.createServer(function(req, res) {

	// need to create a new through stream for each request, because it is closed after being piped to response stream, resulting in write after end error.
	var throughStream = through(transform, function(done) {done();});

	if(req.method === 'POST'){
		req.pipe(throughStream).pipe(res);
	}
	else {
		res.end('Done response \n');
	}
});

server.listen(process.argv[2]);