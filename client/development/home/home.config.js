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
