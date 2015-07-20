'use strict';

var fs = require('fs-extra');
var path = require('path');

module.exports = function(app) {
	app.get('/files/npm/:path', function(req, res) {
		res.send(fs.readJsonSync(path.join(req.params.path, 'package.json')));
	});

	app.get('/files/bower/:path', function(req, res) {
		res.send(fs.readJsonSync(path.join(req.params.path, 'bower.json')));
	});

	app.get('/files/readme/:path', function(req, res) {
		res.send(fs.readFileSync(path.join(req.params.path, 'README.md')));
	});
	app.get('/files/:path', function(req, res) {
		res.send(fs.readFileSync(req.params.path));
	});
};
