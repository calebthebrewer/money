angular.module('home')
	.controller('home', [
		'$scope',
		'dropbox',
		function ($scope, dropbox) {
			'use strict';

			$scope.time = new Date();

			$scope.transactions = [];
			dropbox
				.getDay()
				.then(function (transactions) {
					$scope.transactions = transactions;
				})
				.catch(function (error) {
					if (error.error.indexOf('not found') > -1) {
						dropbox
							.getRecurring()
							.then(function (transactions) {
								$scope.transactions = transactions;
								dropbox.saveDay(transactions);
							});
					}
				});

			$scope.sum = function sum() {
				var total = 0;

				$scope.transactions.forEach(function (transaction) {
					total += parseInt(transaction.amount);
				});

				return total;
			};

			$scope.addTransaction = function addTransaction() {
				$scope.transactions.push({
					type: 'expense',
					amount: $scope.amount,
					description: $scope.description,
					location: null,
					timestamp: $scope.time
				});

				dropbox.saveDay($scope.transactions);

				$scope.amount = null;
				$scope.description = null;
				$scope.time = new Date();
			};
		}
	]);
