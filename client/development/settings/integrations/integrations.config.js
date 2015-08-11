angular.module('integrations')
	.config([
		'$stateProvider',
		function ($stateProvider) {
			'use strict';

			$stateProvider
				.state('settings.integrations', {
					url: '/integrations',
					templateUrl: 'settings/integrations/integrations.tpl.html',
					controller: 'integrations'
				});
		}]);
