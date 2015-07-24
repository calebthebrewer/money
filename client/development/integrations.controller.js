angular.module('money')
	.controller('integrations', [
		'$http',
		'$scope',
		'data',
		function($http, $scope, data) {
			var integrations = {};

			$scope.integrations = {
				'google-drive': data.getToken('google-drive'),
				dropbox: data.getToken('dropbox')
			};

			$scope.integrate = function integrate(service) {
				if ($scope.integrations[service]) {
					return;
				}

				$http
					.get('/integrations/' + service)
					.success(function(requestUrl) {
						integrations[service] = window.open(requestUrl, 'Connect to Drive', 'width=480,height=480');
						var listener = window.addEventListener('message', function(message) {
							data.setToken(service, message.data);
							$scope.integrations[service] = message.data;

							// cleanup
							window.removeEventListener(listener);
							integrations[service].close();
							delete integrations[service];
						});
					});
			};
		}
	]);
