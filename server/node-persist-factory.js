var _ = require('lodash');

module.exports = function nodePersistFactory(directory) {
	'use strict';

	var persist = require('node-persist');

	persist.initSync(_.defaults({dir: directory}));

	return _.cloneDeep(persist);
};
