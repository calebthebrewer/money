angular.module('recurring')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('recurring', {
					url: '/recurring',
					templateUrl: 'recurring/recurring.tpl.html',
					controller: 'recurring'
				});
		}]);
