angular.module('money')
	.config([
		'$urlRouterProvider',
		function ($urlRouterProvider) {
			'use strict';

			$urlRouterProvider
				.otherwise('/');
		}]);
