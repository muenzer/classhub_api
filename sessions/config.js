module.exports.tableName = "classhub-sessions";
module.exports.root = '/sessions';

module.exports.params = {
  TableName: module.exports.tableName,
  AttributeDefinitions: [
  { "AttributeName": "id", "AttributeType": "S" },
  { "AttributeName": "class", "AttributeType": "S" }
  ],
  KeySchema: [
  { "AttributeName": "class", "KeyType": "HASH" },
  { "AttributeName": "id", "KeyType": "RANGE" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};
