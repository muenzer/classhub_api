var dynamo = require('./dynamo');
var uuid = require('uuid');

module.exports.respond = function(event, cb) {

  var batchData = [];

  event.Items.forEach(function(data) {
    data.id = uuid.v1();
    data.CreatedAt = new Date().getTime();
    data.UpdatedAt  = data.CreatedAt;

    var request = {
      "PutRequest": {
        "Item": data
      }
    };

    batchData.push(request);
  });

  var params = {
    RequestItems: {
    }
  };

  var n = batchData.length;

  for (var i = 0; i <= n; i +=25) {
    params.RequestItems[dynamo.tableName] = batchData.slice(i, i+25);

    console.log(params);

    dynamo.doc.batchWrite(params, cb);
  }
};

response = function(err,data) {
      if (err){
        cb(err);
      }else{
        var newData = {"participants": data};
        cb(err,newData);
      }
    };