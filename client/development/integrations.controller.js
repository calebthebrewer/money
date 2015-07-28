angular.module('money')
	.controller('integrations', [
		'$http',
		'$scope',
		'dropbox',
		function($http, $scope, dropbox) {
			'use strict';

			$scope.authenticate = function() {
				dropbox.authenticate();
			};
		}
	]);
