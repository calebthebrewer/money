'use strict';

var _ = require('lodash');
var teams = require('node-persist').create();
teams.initSync(_.defaults({dir: 'teams'}));

module.exports = function(app) {
	app.get('/teams', function(req, res) {
		res.send(teams.values());
	});

	app.get('/teams/:key', function(req, res) {
		var pckg = teams.getItemSync(encodeURIComponent(req.params.key).toLowerCase());

		if (pckg) {
			res.send(pckg);
		} else {
			res.sendStatus(404);
		}

	});

	app.post('/teams/:key', function(req, res) {
		res.send(teams.setItemSync(encodeURIComponent(req.params.key).toLowerCase(), req.body));
	});

	app.delete('/teams/:key', function(req, res) {
		res.send(teams.removeItemSync(encodeURIComponent(req.params.key).toLowerCase()));
	});
};
