angular.module('money')
	.controller('integrations', [
		'$http',
		'$scope',
		function($http, $scope) {
			var integrations = {};

			$scope.integrations = {
				'google-drive': localStorage.getItem('money.integrations.google-drive')
			};

			$scope.integrate = function integrate(service) {
				if ($scope.integrations[service]) {
					return;
				}

				$http
					.get('/integrations/' + service)
					.success(function(data) {
						integrations[service] = window.open(data, 'Connect to Drive', 'width=480,height=480');
						var listener = window.addEventListener('message', function(message) {
							localStorage.setItem('money.integrations.' + service, message.data);
							$scope.integrations[service] = message.data;
							window.removeEventListener(listener);
							integrations[service].close();
							delete integrations[service];
						});
					});
			};
		}
	]);
