angular.module('money')
	.controller('integrations', [
		'$http',
		'$scope',
		function($http, $scope) {
			var integrations = {};

			$scope.integrate = function integrate(service) {
				$http
					.get('/integrations/' + service)
					.success(function(data) {
						integrations[service] = window.open(data, 'Connect to Drive', 'width=480,height=480');
						integrations;
					});
			};
		}
	]);
