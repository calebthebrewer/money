angular.module('money')
	.service('dropbox', [
		'$http',
		'$q',
		function ($http, $q) {
			'use strict';

			var self;

			this.authenticate = function authenticate() {
				return $q(function(resolve, reject) {
					var requestUrl = 'https:////www.dropbox.com/1/oauth2/authorize?client_id=ghvr0jtvuv7ii8p&redirect_uri=' +
						encodeURIComponent(location.protocol + '//' + location.host + '/integrations/dropbox/callback') +
						'&response_type=token';

					var width = 480;
					var height = 480;
					var left = (window.screen.width / 2) - ((width / 2) + 10);
					var top = (window.screen.height / 2) - ((height / 2) + 50);
					var popup = window.open(requestUrl, 'Connect to Dropbox', 'width=' + width + ',height=' + height +
						',left=' + left + ',top=' + top + ',screenX=' + left + ',screenY=' + top + ',scrollbars');

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

				return getDropbox(day);
			};

			this.saveDay = function saveDay(data, day) {
				if (!day) {
					day = today();
				}

				return postDropbox(day, data);
			};

			this.getMonth = function getMonth(month) {
				if (!month) {
					month = today(true);
				}

				return getDropbox(month);
			};

			this.saveMonthDay = function saveMonth(data, month, day) {
				this.getMonth(month)
					.then(function(days) {
						days[day] = data;

						return days;
					})
					.catch(function() {
						var days = {};
						days[day] = data;

						return days;
					})
					.then(function (days) {
						return postDropbox(month, days);
					});
			};

			this.getRecurring = function getRecurring() {
				return getDropbox('recurring');
			};

			this.saveRecurring = function saveRecurring(data) {
				return postDropbox('recurring', data);
			};

			self = this;

			function getDropbox(path) {
				return $q(function(resolve, reject) {
					var token = self.getToken();
					if (!token) {
						return reject();
					}

					$http
						.get(
						'https://api-content.dropbox.com/1/files/auto/' + path + '.json' +
						'?access_token=' + token, {cache: true}
					)
						.success(resolve)
						.error(reject);
				});
			}

			function postDropbox(path, data) {
				return $q(function(resolve, reject) {
					var token = self.getToken();
					if (!token) {
						return reject();
					}

					$http
						.post(
						'https://api-content.dropbox.com/1/files_put/auto/' + path + '.json' +
						'?overwrite=true&access_token=' + token,
						data
					)
						.success(resolve)
						.error(reject);
				});
			}

			function today(noDay) {
				var date = new Date();
				return date.getFullYear() + '/' + (date.getMonth() + 1) +
					(noDay) ? '' : '/' + date.getDate();
			}
		}
	]);
