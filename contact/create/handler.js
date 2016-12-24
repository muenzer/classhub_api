// Require Serverless ENV vars
var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var lib = require('../lib/create');

// Lambda Handler
module.exports.handler = function(event, context, cb) {
	'use strict';

	lib.respond(event, cb);
};


