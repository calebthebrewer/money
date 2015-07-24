angular.module('money')
	.service('dropbox', [
		'$http',
		'$q',
		function ($http, $q) {
			'use strict';

			var client = new Dropbox.Client({ key: 'ghvr0jtvuv7ii8p' });

			client.authDriver(new Dropbox.AuthDriver.Popup({
				receiverUrl: "http://localhost/integrations/dropbox/callback"}));


			this.setToken = function setToken(token) {
				return localStorage.setItem('money.integrations.dropbox', token);
			};

			this.getToken = function getToken() {
				return localStorage.getItem('money.integrations.dropbox');
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
