var shortid = require('shortid');

module.exports.respond = function(data, dynamo) {

  data.id = shortid.generate();
  data.CreatedAt = new Date().getTime();
  data.UpdatedAt  = data.CreatedAt;

  var params = {
    TableName : dynamo.tableName,
    Item : data
  };

  return dynamo.doc.put(params).promise().then(function () {
    return data;
  });
};
