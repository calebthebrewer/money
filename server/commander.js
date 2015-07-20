'use strict';

var spawn = require('child_process').spawn;

var process = spawn('ls');

process.stdout.on('data', function(data) {
	console.log(data);
});

process.stderr.on('data', function(data) {
	console.error(data);
});

process.on('end', function(code) {
	console.log('done: ', code);
});
