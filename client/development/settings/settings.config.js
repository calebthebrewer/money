angular.module('settings')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('settings', {
					url: '/settings',
					templateUrl: 'settings/settings.tpl.html'
				});
		}]);
