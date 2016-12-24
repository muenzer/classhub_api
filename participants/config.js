module.exports.tableName = "classhub-participants";
module.exports.root = '/participants';

module.exports.params = {
  TableName: module.exports.tableName,
  AttributeDefinitions: [
  { "AttributeName": "id", "AttributeType": "S" }
  ],
  KeySchema: [
  { "AttributeName": "id", "KeyType": "HASH" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};
