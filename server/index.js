'use strict';

var bodyParser = require('body-parser');
var path = require('path');

//express server
var express = require('express');
var app = express();
var server = require('http').Server(app);

app.set('port', process.env.PORT || 4000);
app.set('client', 'client/production');

app.use(bodyParser());
app.use(express.static(path.join(__dirname, '..', app.get(('client')))));

require('./dropbox')(app);

server.listen(app.get('port'), function () {
	console.log('Doin\' something fun over at :' + app.get('port'));
});

process.on('SIGINT', process.exit.bind(process));
process.on('SIGTERM', process.exit.bind(process));
