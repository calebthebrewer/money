angular.module('month')
	.controller('month', [
		'$scope',
		'$stateParams',
		'days',
		function ($scope, $stateParams, days) {
			'use strict';

			var now = new Date($stateParams.year, $stateParams.month - 1, 0);

			$scope.year = $stateParams.year;
			$scope.month = $stateParams.month;

			$scope.days = days;
			$scope.dayOffset = now.getDay();
			$scope.daysInMonth = now.getDate();

		}
	]);
