angular.module('recurring')
	.controller('recurring', [
		'$scope',
		'dropbox',
		function ($scope, dropbox) {
			'use strict';

			$scope.recurringTransactions = [];

			dropbox
				.getRecurring()
				.then(function (transactions) {
					$scope.recurringTransactions = transactions;
				});

			$scope.addRecurringTransaction = function addRecurringTransaction() {
				$scope.recurringTransactions.push({
					amount: $scope.amount,
					description: $scope.description
				});

				saveRecurringTransactions();

				$scope.amount = null;
				$scope.description = null;
			};

			$scope.removeRecurringTransaction = function removeTransaction(index) {
				$scope.recurringTransactions.splice(index, 1);
				saveRecurringTransactions();
			};

			function saveRecurringTransactions() {
				dropbox.saveRecurring($scope.recurringTransactions);
			}
		}
	]);
