angular.module('money')
	.service('dropbox', [
		'$http',
		'$q',
		function ($http, $q) {
			'use strict';

			this.authenticate = function authenticate() {
				return $q(function(resolve, reject) {
					var requestUrl = 'https://www.dropbox.com/1/oauth2/authorize?client_id=ghvr0jtvuv7ii8p&redirect_uri=' +
						encodeURIComponent('http://' + location.host + '/integrations/dropbox/callback') +
						'&response_type=token';
					var popup = window.open(requestUrl, 'Connect to Dropbox', 'width=480,height=480,left=100,top=100,scrollbars');

					var listener = window.addEventListener('message', function(message) {
						var auth = {};
						message.data.split('#')[1].split('&').forEach(function (rawParam) {
							var param = rawParam.split('=');
							auth[param[0]] = param[1];
						});

						this.setToken(auth.access_token);

						// cleanup
						window.removeEventListener(listener);
						popup.close();

						if (auth.error) {
							reject();
						} else {
							resolve();
						}
					}.bind(this));
				}.bind(this));
			};

			this.setToken = function setToken(token) {
				return localStorage.setItem('money.integrations.dropbox', token);
			};

			this.getToken = function getToken() {
				return localStorage.getItem('money.integrations.dropbox');
			};

			this.getDay = function getDay(day) {
				if (!day) {
					day = today();
				}

				return $q(function(resolve, reject) {
					var token = this.getToken();
					if (!token) {
						return reject();
					}

					$http
						.get(
							'https://api-content.dropbox.com/1/files/auto/' +
							day + '.json?access_token=' + token
						)
						.success(resolve)
						.error(reject);
				}.bind(this));
			};

			this.saveDay = function saveDay(data, day) {
				if (!day) {
					day = today();
				}

				return $q(function(resolve, reject) {
					var token = this.getToken();
					if (!token) {
						return reject();
					}

					$http
						.post(
							'https://api-content.dropbox.com/1/files_put/auto/' +
							day + '.json?overwrite=true&access_token=' + token,
							data
						)
						.success(resolve)
						.error(reject);
				}.bind(this));
			};

			this.getRecurring = function getRecurring() {
				return $q(function(resolve, reject) {
					var token = this.getToken();
					if (!token) {
						return reject();
					}

					$http
						.get(
							'https://api-content.dropbox.com/1/files/auto/recurring.json' +
							'?access_token=' + token
						)
						.success(resolve)
						.error(reject);
				}.bind(this));
			};

			this.saveRecurring = function saveRecurring(data) {
				return $q(function(resolve, reject) {
					var token = this.getToken();
					if (!token) {
						return reject();
					}

					$http
						.post(
							'https://api-content.dropbox.com/1/files_put/auto/recurring.json' +
							'?overwrite=true&access_token=' + token,
							data
						)
						.success(resolve)
						.error(reject);
				}.bind(this));
			};

			function today() {
				var date = new Date();
				return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
			}
		}
	]);
