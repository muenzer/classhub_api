module.exports.respond = function(dynamo) {

  var params = {
    TableName: dynamo.tableName,
    AttributeDefinitions: [
    { "AttributeName": "CourseSession", "AttributeType": "S" },
    { "AttributeName": "EmailAddress", "AttributeType": "S" },
    { "AttributeName": "PaymentStatus", "AttributeType": "S"},
    { "AttributeName": "DueDate", "AttributeType": "N"}
    ],
    KeySchema: [
    { "AttributeName": "CourseSession", "KeyType": "HASH" },
    { "AttributeName": "EmailAddress", "KeyType": "RANGE" }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    "GlobalSecondaryIndexes": [
    {
      "IndexName": "PaymentStatus",
      "KeySchema": [
      { "AttributeName": "PaymentStatus", "KeyType": "HASH"},
      { "AttributeName": "DueDate", "KeyType": "RANGE" }

      ],
      "Projection": {
        "ProjectionType": "ALL"
      },
      "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,"WriteCapacityUnits": 1
      }
    }
    ]
  };

  return dynamo.raw.createTable(params).promise().then(function (response) {
		return response;
	});

};
