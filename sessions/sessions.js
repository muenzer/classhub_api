module.exports.setup = function (api, dynamo) {
  var config = require('./config');

  api.get(config.root + '/createtable', function () {
    var lib = require('lib/create-table');
    return lib.respond(config.params, dynamo);
  });

  api.post(config.root, function (request) {
  	'use strict';
  	var lib = require('lib/create');
  	dynamo.tableName = config.tableName;

  	var data = request.body;

  	return lib.respond(data, dynamo);
  }, { success: 201 });

  api.get(config.root, function (request) {
  	var lib = require('lib/scan');
  	dynamo.tableName = config.tableName;

  	return lib.respond(dynamo);
  });

  api.get(config.root + '/{class}', function (request) {
    var lib = require('lib/query');
  	dynamo.tableName = config.tableName;

    var key = {
      class: decodeURIComponent(request.pathParams.class)
    };
    return lib.respond(key, dynamo);
  });

  api.get(config.root + '/{class}' + '/{id}', function (request) {
    var lib = require('lib/get');
  	dynamo.tableName = config.tableName;

    var key = {
      class: decodeURIComponent(request.pathParams.class),
  		id: decodeURIComponent(request.pathParams.id)
    };
    return lib.respond(key, dynamo);
  });

  api.patch(config.root + '/{class}' + '/{id}', function (request) {
    var lib = require('lib/update');
    dynamo.tableName = config.tableName;

    var key = {
      class: decodeURIComponent(request.pathParams.class),
      id: decodeURIComponent(request.pathParams.id)
    };

    var data = request.body;

    return lib.respond(key, body, dynamo);
  });

  api.delete(config.root + '/{class}' + '/{id}', function (request) {
    var lib = require('lib/delete');
  	dynamo.tableName = config.tableName;

  	var key = {
      class: decodeURIComponent(request.pathParams.class),
  		id: decodeURIComponent(request.pathParams.id)
    };
    return lib.respond(key, dynamo);
  });
};
