angular.module('money')
.controller('navigation', [
		'$scope',
		'$stateParams',
		'$rootScope',
		function ($scope, $stateParams, $rootScope) {
			'use strict';

			var months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];

			$scope.loading = false;

			$rootScope.$on('$stateChangeStart', function() {
				$scope.loading = true;
			});

			$rootScope.$on('$stateChangeSuccess', function () {
				$scope.loading = false;

				if ($stateParams.month) {
					$scope.year = $stateParams.year;
					$scope.month = $stateParams.month;
					$scope.niceMonth = months[$stateParams.month - 1];
					$scope.day = $stateParams.day;
				} else {
					var now = new Date();
					$scope.year = now.getFullYear();
					$scope.month = now.getMonth() + 1;
					$scope.niceMonth = months[$scope.month - 1];
					$scope.day = now.getDate();
				}

				$scope.params = {
					year: $scope.year,
					month: $scope.month,
					day: $scope.day
				};
			});
		}
	]);
