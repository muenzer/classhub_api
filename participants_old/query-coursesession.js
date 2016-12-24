var dynamo = require('./dynamo');

module.exports.respond = function(event, cb) {

  var params = {
    TableName : dynamo.tableName,
    KeyConditionExpression: "CourseSession = :coursesession",
    ExpressionAttributeValues: {
        ":coursesession": decodeURIComponent(event.coursesession)
    }
  };

  return dynamo.doc.query(params, function(err, data) {
    if (err){
      cb(err);
    }else{
      var items = data.Items;

      cb(err,items);
    }
  });
};

