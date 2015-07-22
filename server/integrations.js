'use strict';

var fs = require('fs');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var path = require('path');

module.exports = function(app) {
	app.get('/integrations/google-drive', function(req, res) {
		var auth = new googleAuth();
		var oauth2Client = new auth.OAuth2(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			process.env.REDIRECT_URL
		);

		res.send(oauth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: ['https://www.googleapis.com/auth/drive.metadata.readonly']
		}));
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
};
