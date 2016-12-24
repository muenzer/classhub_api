module.exports.respond = function(body, dynamo) {
  var query_expression = require('./query-expression');

  var params = query_expression.parse(body);

  params.TableName = dynamo.tableName;

  return dynamo.doc.query(params).promise().then(function (response) {
    return response.Items;
  });
};
