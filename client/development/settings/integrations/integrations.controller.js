angular.module('integrations')
	.controller('integrations', [
		'$scope',
		'dropbox',
		function ($scope, dropbox) {
			'use strict';

			$scope.dropboxStatus = false;

			if (dropbox.getToken()) {
				$scope.dropboxStatus = true;
			}

			$scope.connect = function connect() {
				dropbox
					.authenticate()
					.then(document.location.reload.bind(document.location));
			};

			$scope.disconnect = function disconnect() {
				dropbox.setToken('');
				document.location.reload();
			};
		}
	]);
