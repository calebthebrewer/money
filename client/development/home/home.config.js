angular.module('home')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'home/home.tpl.html',
					controller: 'home',
					resolve: {
						transactions: [
							'data',
							function(data) {
								return data.getDay();
							}
						]
					}
				});
		}]);
