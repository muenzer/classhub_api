var dynamo = require('./dynamo');
var uuid = require('uuid');

module.exports.respond = function(event, cb) {

  console.log(event);

  var data = event;
  data.id = uuid.v1();
  data.CreatedAt = new Date().getTime();
  data.UpdatedAt  = data.CreatedAt;
  var params = {
    TableName : dynamo.tableName,
    Item:data
  };

  return dynamo.doc.put(params, function(err,data) {
    if (err){
      cb(err);
    }else{
      var newData = {"participants": params.Item};
      cb(err,newData);
    }
  });

};

