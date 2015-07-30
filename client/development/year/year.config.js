angular.module('year')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('year', {
					url: '/{year:[0-9]{4}}',
					templateUrl: 'year/year.tpl.html',
					controller: 'year',
					reloadOnSearch: true
				});
		}]);
