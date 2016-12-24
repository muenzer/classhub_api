var dynamo = require('./dynamo');

module.exports.respond = function(event, cb) {

  console.log(event);

  var params = {
    TableName : dynamo.tableName,
    Key: {
      id: decodeURIComponent(event.params.id)
    }
  };

  console.log(params);

  return dynamo.doc.get(params, function(err, data) {
    if (err){
      cb(err);
    }else{
      var item = data.Item;
      var newData = item;

      cb(err,newData);
    }
  });
};