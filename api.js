/*global require, module*/
var ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	api = new ApiBuilder(),
	dynamoDb = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'}),
  dynamo = require('./lib/dynamo');

module.exports = api;

var config = null;

//Clients
var clients = require('./clients/clients');

clients.setup(api, dynamo);

//Classes
var classes = require('./classes/classes');

classes.setup(api, dynamo);

//Sessions
var sessions = require('./sessions/sessions');

sessions.setup(api, dynamo);

//Participants
api.post('/participants', function (request) {
	'use strict';
	var lib = require('lib/create');
	dynamo.tableName = "classhub-participants";

	return lib.respond(request.body, dynamo);
}, { success: 201 });

api.get('/participants', function (request) {
	var lib = require('lib/scan');
	dynamo.tableName = "classhub-participants";

	return lib.respond(dynamo);
});

api.get('/participants/{coursesession}/{emailaddress}', function (request) {
  var lib = require('lib/get');
	dynamo.tableName = "classhub-participants";

  var key = {
    CourseSession: decodeURIComponent(request.pathParams.coursesession),
    EmailAddress: decodeURIComponent(request.pathParams.emailaddress)
  };
  return lib.respond(key, dynamo);
});

api.delete('/participants/{coursesession}/{emailaddress}', function (request) {
  var lib = require('lib/delete');
	dynamo.tableName = "classhub-participants";

  var key = {
    CourseSession: decodeURIComponent(request.pathParams.coursesession),
    EmailAddress: decodeURIComponent(request.pathParams.emailaddress)
  };
  return lib.respond(key, dynamo);
});

api.get('participants/createtable', function () {
  var lib = require('participants/create-table');
  return lib.respond(dynamo);
});
