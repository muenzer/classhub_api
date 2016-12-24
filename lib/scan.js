module.exports.respond = function(dynamo) {

  var params = {
    TableName: dynamo.tableName
  };

  return dynamo.doc.scan(params).promise().then(function (response) {
    return response.Items;
  });
};
