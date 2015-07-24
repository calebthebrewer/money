angular.module('money')
.service('googleDrive', [
		'$http',
		'$q',
		function ($http, $q) {
			'use strict';

			this.setToken = function setToken(token) {
				return localStorage.setItem('money.integrations.google-drive', token);
			};

			this.getToken = function getToken() {
				return localStorage.getItem('money.integrations.google-drive');
			};

			this.getAll = function getAll() {
				return $q(function(resolve, reject) {
					var token = this.getToken();
					if (!token) {
						return reject();
					}

					$http
						.get('/google-drive?token=' + token)
						.success(resolve)
						.error(reject);
				}.bind(this));
			}
		}
	]);
