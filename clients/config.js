module.exports.tableName = "classhub-clients";
module.exports.root = '/clients';

module.exports.params = {
  TableName: module.exports.tableName,
  AttributeDefinitions: [
  { "AttributeName": "url", "AttributeType": "S" }
  ],
  KeySchema: [
  { "AttributeName": "url", "KeyType": "HASH" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};
