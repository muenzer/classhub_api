var dynamo = require('./dynamo');

module.exports.respond = function(event, cb) {

  var params = {
    TableName : dynamo.tableName,
    Key: {
      id: decodeURIComponent(event.params.id)
    }
  };

  return dynamo.doc.delete(params, cb);

};

