var dynamo = require('./dynamo');
var update_expression = require('./update-expression');

module.exports.respond = function(event, cb) {

  var params = {
    TableName : dynamo.tableName,
    Key: {
      id: decodeURIComponent(event.params.id)
    },
    ReturnValues: "UPDATED_NEW"
  };

  event.body.UpdatedAt = new Date().getTime();

  delete event.body.id; //Remove id from body to avoid issues with trying to update key 

  Object.assign(params, update_expression.parse(event.body));

  console.log(params);

  return dynamo.doc.update(params, function(err,data) {
    if (err){
      cb(err);
    }else{
      cb(err,params.Item);
    }
  });
};

