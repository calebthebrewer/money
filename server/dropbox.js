'use strict';

var fs = require('fs');
var path = require('path');

var googleAuth = require('google-auth-library');
var auth = new googleAuth();
var google = require('googleapis');
var drive = google.drive('v2');

var oauth2Client = new auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URL
);
var authUrl = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: ['https://www.googleapis.com/auth/drive']
});

module.exports = function(app) {
	app.get('/integrations/dropbox/callback', function(req, res) {
		if (!req.query.code) {
			return res.send(req.body);
		}
		fs.readFile(path.join(__dirname, 'callback.html'), 'utf8', function (error, file) {
			if (error) {
				return res.send(error);
			}
			res.send(file.replace('{{TOKEN}}', req.query.code));
		});
	});
};
