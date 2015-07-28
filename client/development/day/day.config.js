angular.module('day')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('day', {
					url: '/:year/:month/:day',
					templateUrl: 'day/day.tpl.html',
					controller: 'day',
					resolve: {
						transactions: [
							'dropbox',
							function (dropbox) {
								return dropbox
									.getDay()
									.catch(function () {
										return [];
									});
							}
						]
					}
				});
		}]);
