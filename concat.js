var concat = require('concat-stream');

var concatStream = function(buffer) {
    // var sbuf = buffer.toString();

    // console.log(sbuf);

    var s = buffer.toString().split('').reverse().join('');
    process.stdout.write(s + '\n');
};

// Concat is writeable stream only, cannot be piped to stdout.
// https://github.com/nodeschool/discussions/issues/388
var concatProcess = concat(concatStream);
process.stdin.pipe(concatProcess);


// If want to see the results, need to capture SIGINT CTRL + C event. 
process.on('SIGINT', function() {
  // some other closing procedures go here
  concatProcess.end();
  process.exit( );
});