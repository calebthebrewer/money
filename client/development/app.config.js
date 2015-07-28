angular.module('money')
	.config([
		'$urlRouterProvider',
		function ($urlRouterProvider) {
			'use strict';

			var now = new Date();

			$urlRouterProvider
				.otherwise('/' + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate());
		}]);
