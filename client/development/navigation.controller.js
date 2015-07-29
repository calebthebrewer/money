angular.module('money')
.controller('navigation', [
		'$scope',
		'$stateParams',
		'$rootScope',
		function ($scope, $stateParams, $rootScope) {
			$rootScope.$on('$stateChangeSuccess', function () {
				var now;
				if ($stateParams.month) {
					now = new Date($stateParams.year, $stateParams.month - 1);
				} else {
					now = new Date();
				}

				$scope.month = now.toLocaleString('en-us', {month:'long'});
				$scope.monthParams = {
					year: now.getFullYear(),
					month: now.getMonth() + 1
				};
			});
		}
	]);
