var dynamo = require('./dynamo');
var shortid = require('shortid');

module.exports.respond = function(event, cb) {

  console.log(event);

  var data = event;
  data.id = shortid.generate();
  data.CreatedAt = new Date().getTime();
  var params = {
    TableName : dynamo.tableName,
    Item:data
  };

  return dynamo.doc.put(params, function(err,data) {
    if (err){
      cb(err);
    }else{
      var newData = {"contact": params.Item};
      cb(err,newData);
    }
  });

};

