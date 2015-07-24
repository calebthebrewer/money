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
	app.get('/integrations/google-drive', function(req, res) {
		res.send(authUrl);
	});

	app.get('/integrations/google-drive/callback', function(req, res) {
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

	app.get('/google-drive', function (req, res) {
		oauth2Client.getToken(req.query.token, function (error, token) {
			if (!token) {
				return res.sendStatus(401);
			}

			oauth2Client.setCredentials(token);

			drive.files.list({
				auth: oauth2Client,
				maxResults: 10,
				q: "'root' in parents and title = 'path0' and mimeType = 'application/vnd.google-apps.folder'"
			}, function (error, response) {
				if (error) {
					res.sendStatus(500);
				} else {
					res.send(response);
				}
			});
		});
	});
};
