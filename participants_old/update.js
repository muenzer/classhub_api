var dynamo = require('./dynamo');
var update_expression = require('./update-expression');

module.exports.respond = function(event, cb) {

  var params = {
    TableName : dynamo.tableName,
    Key: {
      CourseSession: decodeURIComponent(event.params.coursesession),
      EmailAddress: decodeURIComponent(event.params.emailaddress)
    },
    ReturnValues: "UPDATED_NEW"
  };

  event.body.UpdatedAt = new Date().getTime();

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

