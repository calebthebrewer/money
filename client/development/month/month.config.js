angular.module('month')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('month', {
					url: '/:year/:month',
					templateUrl: 'month/month.tpl.html',
					controller: 'month',
					reloadOnSearch: true
				});
		}]);
