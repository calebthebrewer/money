angular.module('day')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('day', {
					url: '/{year:[0-9]{4}}/:month/:day',
					templateUrl: 'day/day.tpl.html',
					controller: 'day',
					reloadOnSearch: true,
					resolve: {
						transactions: [
							'$stateParams',
							'dropbox',
							function ($stateParams, dropbox) {
								return dropbox
									.getDay($stateParams.year + '/' + $stateParams.month + '/' + $stateParams.day)
									.catch(function () {
										return [];
									});
							}
						]
					}
				});
		}]);
