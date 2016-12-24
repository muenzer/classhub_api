var shortid = require('shortid');

module.exports.respond = function(data, dynamo) {

  data.id = shortid.generate();
  data.CreatedAt = new Date().getTime();
  data.UpdatedAt  = data.CreatedAt;

  console.log(data.id);

  var params = {
    TableName : dynamo.tableName,
    Item : data
  };

  console.log(params);

  return dynamo.doc.put(params).promise().then(function () {
    return data;
  });
};
