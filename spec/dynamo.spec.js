var AWS = require('aws-sdk');
var dynamo = {};
var id = null;

describe("DynamoDB interface", function () {
  beforeEach(function () {
    var dynamoconfig = {
      endpoint: "http://localhost:8000",
      region: "someregion",
      accessKeyId: "test",
      secretAccessKey: "test"
    };

    var dynamodb = new AWS.DynamoDB(dynamoconfig);
    dynamo.raw = dynamodb;
    dynamo.doc = new AWS.DynamoDB.DocumentClient({service:dynamodb});
    dynamo.tableName = "test";
  });

  it("that creates a table", function (done) {
    var params = {
      TableName: dynamo.tableName,
      AttributeDefinitions: [
      { "AttributeName": "name", "AttributeType": "S" },
      { "AttributeName": "id", "AttributeType": "S" }
      ],
      KeySchema: [
      { "AttributeName": "name", "KeyType": "HASH" },
      { "AttributeName": "id", "KeyType": "RANGE" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    };

    var lib = require('../lib/create-table');

    var response = lib.respond(params, dynamo);

    response.then(function (response) {
      expect(response).toBeDefined();
      done();
    });
  });

  it("creates an item", function (done) {
    var lib = require('../lib/create');
    dynamo.tableName = "test";

    var data = {
      name: "foo"
    };

    var response = lib.respond(data, dynamo);

    response.then(function (response) {
      expect(response.name).toBe('foo');
      done();
    });
  });

  it("scans table", function (done) {
    var lib = require('../lib/scan');
    dynamo.tableName = "test";

    var response = lib.respond(dynamo);

    response.then(function (response) {
      id = response[0].id;
      expect(response[0].name).toBe('foo');
      done();
    });
  });

  it("gets an item", function (done) {
    var lib = require('../lib/get');
    dynamo.tableName = "test";

    var data = {
      name: "foo",
      id: id
    };

    var response = lib.respond(data, dynamo);

    response.then(function (response) {
      expect(response.name).toBe('foo');
      done();
    });
  });

  it("query a primary key", function (done) {
    var lib = require('../lib/query');
    dynamo.tableName = "test";

    var data = {
      name: "foo"
    };

    var response = lib.respond(data, dynamo);

    response.then(function (response) {
      expect(response[0].name).toBe('foo');
      done();
    });
  });

  it("deletes the table", function (done) {
    var params = {
      TableName: dynamo.tableName,
    };
    dynamo.raw.deleteTable(params, function(err, data) {
      expect(err).toBeNull();
      done();
    });
  });
});
