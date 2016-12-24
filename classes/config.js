module.exports.tableName = "classhub-classes";
module.exports.root = '/classes';

module.exports.params = {
  TableName: module.exports.tableName,
  AttributeDefinitions: [
  { "AttributeName": "id", "AttributeType": "S" },
  { "AttributeName": "client", "AttributeType": "S" }
  ],
  KeySchema: [
  { "AttributeName": "client", "KeyType": "HASH" },
  { "AttributeName": "id", "KeyType": "RANGE" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};
