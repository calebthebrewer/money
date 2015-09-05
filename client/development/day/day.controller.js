angular.module('day')
	.controller('day', [
		'$scope',
		'$stateParams',
		'dropbox',
		'transactions',
		function ($scope, $stateParams, dropbox, transactions) {
			'use strict';

			var day = $stateParams.year + '/' + $stateParams.month + '/' + $stateParams.day;

			$scope.transactions = transactions;
			$scope.isDirty = false;

			$scope.sum = sum();

			$scope.addTransaction = function addTransaction() {
				var transaction = {
					amount: $scope.amount,
					description: $scope.description,
					timestamp: new Date()
				};

				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (location) {
						transaction.location = {
							longitude: location.coords.longitude,
							latitude: location.coords.latitude
						};

						actuallyAddTransaction(transaction);
					});
				} else {
					actuallyAddTransaction(transaction);
				}
			};

			function actuallyAddTransaction(transaction) {
				$scope.transactions.push(transaction);
				$scope.isDirty = true;
				$scope.amount = null;
				$scope.description = null;
				$scope.time = new Date();
			}

			$scope.save = function save() {
				saveDay();
			};

			$scope.removeTransaction = function removeTransaction(index) {
				$scope.transactions.splice(index, 1);
				$scope.isDirty = true;
			};

			$scope.addRecurringTransactions = function addRecurringTransactions() {
				dropbox
					.getRecurring()
					.then(function (transactions) {
						var now = new Date();
						var year = now.getFullYear();
						// get the number of days in this month
						var daysInMonth = new Date(year, now.getMonth(), 0).getDate();
						// get the number of days in this year
						var daysInYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0) ? 366 : 365;

						transactions.forEach(function (transaction) {
							var divisor;
							switch (transaction.frequency) {
								case 'weekly':
									divisor = 7;
									break;
								case 'monthly':
									divisor = daysInMonth;
									break;
								case 'yearly':
									divisor = daysInYear;
									break;
								default:
									divisor = 1;
									break;
							}

							$scope.transactions.push({
								amount: Math.round((transaction.amount / divisor) * 100) / 100,
								description: transaction.description,
								recurring: true
							});
						});

						$scope.isDirty = true;
						$scope.sum = sum();
					});
			};

			function saveDay() {
				$scope.sum = sum();

				dropbox.saveDay($scope.transactions, day);

				dropbox
					.saveMonthDay({
						amount: $scope.sum,
						transactions: $scope.transactions.length
					}, $stateParams.year + '/' + $stateParams.month, $stateParams.day)
					.then(function () {
						$scope.isDirty = false;
						dropbox
							.getMonth($stateParams.year + '/' + $stateParams.month)
							.then(function (month) {
								var monthAmount = 0;
								var monthTransactions = 0;

								for (var day in month) {
									monthAmount += month[day].amount;
									monthTransactions += month[day].transactions;
								}

								dropbox.saveYearMonth({
									amount: monthAmount,
									transactions: monthTransactions
								}, $stateParams.year, $stateParams.month);
							});
					});
			}

			function sum() {
				var total = 0;

				$scope.transactions.forEach(function (transaction) {
					total += parseInt(transaction.amount);
				});

				return total;
			}
		}
	]);
