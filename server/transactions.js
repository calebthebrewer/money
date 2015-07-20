/**
 * Transaction Data Store
 *
 * timestamp: {
 * 	amount,
 * 	description,
 * 	timestamp
 * }
 *
 */

'use strict';

var _ = require('lodash');
var transactions = require('node-persist').create();
transactions.initSync(_.defaults({dir: 'transactions'}));

module.exports = function(app) {
	app.get('/transactions', function(req, res) {
		res.send(transactions.values());
	});

	app.get('/transactions/:timestamp', function(req, res) {
		var pckg = transactions.getItemSync(encodeURIComponent(req.params.key).toLowerCase());

		if (pckg) {
			res.send(pckg);
		} else {
			res.sendStatus(404);
		}

	});

	app.post('/transactions/:timestamp', function(req, res) {
		res.send(transactions.setItemSync(encodeURIComponent(req.params.date).toLowerCase(), req.body));
	});

	app.delete('/transactions/:key', function(req, res) {
		res.send(transactions.removeItemSync(encodeURIComponent(req.params.key).toLowerCase()));
	});
};
