angular.module('money')
.service('data', [
		'googleDrive',
		'dropbox',
		function (googleDrive, dropbox) {
			'use strict';

			var map = {
				'google-drive': googleDrive,
				dropbox: dropbox
			};

			this.setToken = function setToken(service, token) {
				map[service].setToken(token);
			};

			this.getToken = function getToken(service) {
				map[service].getToken();
			};

			this.saveDay = function saveDay(data) {
			};

			this.getDay = function getDay(day) {
				return dropbox.getAll();
			};

		}
	]);
