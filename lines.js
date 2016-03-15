var split = require('split');
var through = require('through2');

var lineCount = 0;

var throughStream  = through(function(buffer, encoding, next) {
	var line = buffer.toString();
	this.push(lineCount % 2 === 0 ? line.toLowerCase() + '\n' : line.toUpperCase() + '\n');
	lineCount++;
	next();
});

process.stdin.pipe(split()).pipe(throughStream).pipe(process.stdout);