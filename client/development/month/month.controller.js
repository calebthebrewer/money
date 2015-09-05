angular.module('month')
	.controller('month', [
		'$scope',
		'$stateParams',
		'days',
		function ($scope, $stateParams, days) {
			'use strict';

			var now = new Date($stateParams.year, $stateParams.month, 0);

			$scope.year = $stateParams.year;
			$scope.month = $stateParams.month;

			$scope.days = days;
			// subtract two because it is zero indexed and we don't want to display the zero
			$scope.dayOffset = now.getDay() - 2;
			if ($scope.dayOffset < 0) {
				$scope.dayOffset = 6 + $scope.dayOffset;
			}
			$scope.daysInMonth = now.getDate();

			$scope.daysOfTheWeek = [
				'Sunday',
				'Month',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday'
			];
		}
	]);
