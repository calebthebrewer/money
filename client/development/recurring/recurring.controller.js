angular.module('recurring')
	.controller('recurring', [
		'$scope',
		function ($scope) {
			'use strict';

			$scope.recurringTransactions = JSON.parse(localStorage.getItem('recurring-transactions')) || [];

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
				localStorage.setItem('recurring-transactions', JSON.stringify($scope.transactions));
			}
		}
	]);
