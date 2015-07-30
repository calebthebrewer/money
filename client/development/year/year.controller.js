angular.module('year')
	.controller('year', [
		'$scope',
		'$stateParams',
		function ($scope, $stateParams) {
			'use strict';

			$scope.year = $stateParams.year;

			$scope.months = [

			];

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
		}
	]);
