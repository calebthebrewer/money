angular.module('home')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('home', {
					url: '/'
				});
		}]);
