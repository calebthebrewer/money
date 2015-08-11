angular.module('recurring')
	.controller('recurring', [
		'$scope',
		'dropbox',
		'transactions',
		function ($scope, dropbox, transactions) {
			'use strict';

			$scope.recurringTransactions = transactions;

			$scope.addRecurringTransaction = function addRecurringTransaction() {
				$scope.recurringTransactions.push({
					amount: $scope.amount,
					description: $scope.description,
					frequency: $scope.frequency,
					recurring: true
				});

				saveRecurringTransactions();

				$scope.amount = null;
				$scope.description = null;
				$scope.frequency = 'daily';
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
