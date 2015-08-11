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
					reloadOnSearch: true,
					resolve: {
						months: [
							'$stateParams',
							'dropbox',
							function($stateParams, dropbox) {
								return dropbox
									.getYear($stateParams.year)
									.catch(function () {
										return {};
									});
							}
						]
					}
				});
		}]);
