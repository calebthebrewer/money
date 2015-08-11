angular.module('month')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('month', {
					url: '/{year:[0-9]{4}}/:month',
					templateUrl: 'month/month.tpl.html',
					controller: 'month',
					reloadOnSearch: true,
					resolve: {
						days: [
							'$stateParams',
							'dropbox',
							function ($stateParams, dropbox) {
								return dropbox
									.getMonth($stateParams.year + '/' + $stateParams.month)
									.catch(function () {
										return {};
									});
							}
						]
					}
				});
		}]);
