angular.module('recurring-transactions')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('settings.recurringTransactions', {
					url: '/recurring-transactions',
					templateUrl: 'settings/recurring-transactions/recurring-transactions.tpl.html'
				});
		}]);
