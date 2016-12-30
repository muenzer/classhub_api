module.exports.setup = function (api, dynamo) {
  config = require('./config');

  api.get(config.root + '/createtable', function () {
    var lib = require('lib/create-table');
    return lib.respond(config.params, dynamo);
  });

  api.post(config.root, function (request) {
  	'use strict';
  	var lib = require('lib/create');
  	dynamo.tableName = config.tableName;

  	var data = request.body;

    var conditional = 'attribute_not_exists(url)';

  	return lib.respond(data, dynamo, conditional);
  }, { success: {code: 201} , error: {code: 403}});

  api.get(config.root, function (request) {
  	var lib = require('lib/scan');
  	dynamo.tableName = config.tableName;

  	return lib.respond(dynamo);
  });

  api.get(config.root + '/{url}', function (request) {
    var lib = require('lib/get');
  	dynamo.tableName = config.tableName;

    var key = {
      url: decodeURIComponent(request.pathParams.url)
    };
    return lib.respond(key, dynamo);
  });

  api.patch(config.root + '/{url}', function (request) {
    var lib = require('lib/update');
    dynamo.tableName = config.tableName;

  	var key = {
      url: decodeURIComponent(request.pathParams.url)
    };

    var data = request.body;

    return lib.respond(key, body, dynamo);
  });

  api.delete(config.root + '/{url}', function (request) {
    var lib = require('lib/delete');
  	dynamo.tableName = config.tableName;

  	var key = {
      url: decodeURIComponent(request.pathParams.url)
    };
    return lib.respond(key, dynamo);
  });
};
