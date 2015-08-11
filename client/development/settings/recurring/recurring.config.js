angular.module('recurring')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('settings.recurring', {
					url: '/recurring',
					templateUrl: 'settings/recurring/recurring.tpl.html',
					controller: 'recurring',
					resolve: {
						transactions: [
							'dropbox',
							function (dropbox) {
								return dropbox
									.getRecurring()
									.catch(function () {
										return [];
									});
							}
						]
					}
				});
		}]);
