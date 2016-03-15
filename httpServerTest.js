var http = require('http');

var options = {
	host: 'localhost',
	path: '/',
	port: '8000',
	method: 'POST'
};

var req = http.request(options, function(res) {
	res.on('data', function (data) {
		console.log(data.toString());
	})
});

req.on('error', function(e) {
	console.log(e.message);
})

req.on('data', function(data) {
	console.log(data);
})

req.write('Hello\n');
req.write('There\n');

req.end();