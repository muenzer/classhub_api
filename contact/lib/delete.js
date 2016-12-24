var dynamo = require('./dynamo');

module.exports.respond = function(event, cb) {

  var params = {
    TableName : dynamo.tableName,
    Key: {
      CourseSession: decodeURIComponent(event.coursesession),
      EmailAddress: decodeURIComponent(event.emailaddress)
    }
  };

  return dynamo.doc.delete(params, cb);

};

