var dynamo = require('./dynamo');

module.exports.respond = function(event, cb) {

  var params = {
    TableName: dynamo.tableName,
    AttributeDefinitions: [
    { "AttributeName": "id", "AttributeType": "S" },
    { "AttributeName": "CreatedAt", "AttributeType": "N" }
    ],
    KeySchema: [
    { "AttributeName": "id", "KeyType": "HASH" },
    { "AttributeName": "CreatedAt", "KeyType": "RANGE" }  
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
  };

  return dynamo.raw.createTable(params, cb);

};