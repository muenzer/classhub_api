var shortid = require('shortid');

module.exports.respond = function(data, dynamo, conditional, attributes) {

  // data.id = shortid.generate();
  if(!(data.hasOwnProperty('id'))) {
    data.id = shortid.generate();
  }
  data.CreatedAt = new Date().getTime();
  data.UpdatedAt  = data.CreatedAt;

  var params = {
    TableName : dynamo.tableName,
    Item : data
  };

  if(conditional) {
    params.ConditionExpression = conditional;
  }

  if(attributes) {
    params.ExpressionAttributeNames = attributes;
  }

  //return dynamo.doc.put(params).promise();

  return dynamo.doc.put(params).promise().then(function () {
    return data;
  })
  .catch(function (err) {
    throw err;
  });
};
