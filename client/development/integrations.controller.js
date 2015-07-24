angular.module('money')
	.controller('integrations', [
		'$http',
		'$scope',
		'dropbox',
		function($http, $scope, dropbox) {
			$scope.authenticate = function() {
				dropbox.authenticate();
			};
		}
	]);
