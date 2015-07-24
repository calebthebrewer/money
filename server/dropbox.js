'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(app) {
	app.get('/integrations/dropbox/callback', function(req, res) {
		res.sendFile(path.join(__dirname, 'callback.html'));
	});
};
