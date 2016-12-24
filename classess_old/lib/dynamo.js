var AWS = require('aws-sdk');
var dynamoconfig = {};

if(process.env.SERVERLESS_STAGE === 'dev' & false){
  dynamoconfig = {
    endpoint: "http://localhost:8000",
    region: "someregion",
    accessKeyId: "test",
    secretAccessKey: "test"
  };
}

console.log(JSON.stringify(dynamoconfig));

var dynamodb = new AWS.DynamoDB(dynamoconfig);
module.exports.raw = dynamodb;
module.exports.doc = new AWS.DynamoDB.DocumentClient({service:dynamodb});
module.exports.tableName = "classes-" + process.env.SERVERLESS_STAGE;

