angular.module('month')
	.controller('month', [
		'$scope',
		'$stateParams',
		'dropbox',
		function ($scope, $stateParams, dropbox) {
			'use strict';

			var now = new Date();

			$scope.year = now.getFullYear();
			$scope.month = now.getMonth() + 1;

			var days = {};
			$scope.days = days;

			var numberOfDays = daysInMonth(now.getMonth() + 1, now.getFullYear());
			var dayOffset = now.getDay();
			for (var i = 0; i < numberOfDays; i++) {
				 days[i + dayOffset] = {
					 amount: 45,
					 day: i
				 };
			}

			function daysInMonth(month, year) {
				return new Date(year, month, 0).getDate();
			}
		}
	]);
