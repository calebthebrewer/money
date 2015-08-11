angular.module('year')
	.controller('year', [
		'$scope',
		'$stateParams',
		'months',
		function ($scope, $stateParams, months) {
			'use strict';

			var maxAmount = 0;

			for (var month in months) {
				for (var day in months[month]) {
					var amount = Math.abs(months[month][day].amount);

					if (amount > maxAmount) {
						maxAmount = amount;
					}
				}
			}

			$scope.maxAmount = maxAmount;

			$scope.Math = window.Math;
			$scope.year = $stateParams.year;
			$scope.months = months;

			$scope.monthsOfTheYear = [
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

			$scope.daysInMonth = [
				31,
				leapYear($scope.year) ? 29 : 28,
				31,
				30,
				31,
				30,
				31,
				31,
				30,
				31,
				30,
				31
			];

			function leapYear(year) {
				return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
			}
		}
	]);
