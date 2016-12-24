var shortid = require('shortid');

module.exports.respond = function(event, cb) {

  cb(null, {id: shortid.generate()});

};

