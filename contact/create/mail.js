require("mailin-api-node-js");

module.exports.sendMailTemplate = function(data, callback) {
	'use strict';

	var client = new Mailin("https://api.sendinblue.com/v2.0","rkcs4NxFYjKAwU9H",5000); //Optional parameter: Timeout in MS

	client.send_transactional_template(data).on('complete', function(data) {
		console.log(data);

		var response = JSON.parse(data);
		if(response.code === "success") {
			callback(null, response.message);
		} else {
			callback(response.code, response.message);
		}
		
	});
};

module.exports.sendMail = function(data, callback) {
	'use strict';

	var client = new Mailin("https://api.sendinblue.com/v2.0","rkcs4NxFYjKAwU9H",5000); //Optional parameter: Timeout in MS

	client.send_email(data).on('complete', function(data) {
		console.log(data);

		var response = JSON.parse(data);
		if(response.code === "success") {
			callback(null, response.message);
		} else {
			callback(response.code, response.message);
		}
		
	});
};

module.exports.createMailData = function(object) {
	'use strict';
	console.log(object);
	var dateFormat = require('dateformat');

	var number;
	if(object.Number == 1) {
		number = 'one space';
	} else {
		number = object.Number + ' spaces';
	}

	var data = { 
		id : object.Template,
		to : object.EmailAddress,
		attr : {
			CLASS:object.ClassName,
			NAME:object.Name,
			COST:object.Payment,
			DATE:dateFormat(object.Date, "mmmm dS"),
			DUEDATE: dateFormat(object.DueDate, "mmmm dS"),
			NUMBER: number,
			MESSAGE: object.Message | ""
		}
	};

	return data;
};

module.exports.createRegistrationMail = function(object) {
	'use strict';
	var json2html = require('json-to-html');
	var dateFormat = require('dateformat');

	console.log(object);

	var data = {	
			Name:object.Name.S,
			Class:object.ClassName.S,
			Date: dateFormat(Number(object.Date.N), "mmmm dS"),
			Number: object.Number.N | object.Number.S
		};

	console.log(data);

	var html = json2html(data);

	var input = { 
          to : {"meghan@designedbytro.com":"Meghan Howard"},
          from: ["meghan@designedbytro.com","Meghan Howard"],
          subject: "New Registration: " + object.ClassName.S + " - " + dateFormat(Number(object.Date.N), "mmmm dS"),
          html: html
        }; 

    return input;
};

module.exports.createOverdueMail = function(object) {
	'use strict';
	var dateFormat = require('dateformat');

	var html = "";

	for(var idx in object) {
		var item = object[idx];

		var data = "<div>" + item.Name + " - " + item.Payment + "CHF due on " + dateFormat(item.DueDate, "mmmm dS") + "</div>";

		html = html + data;
	}

	html = html + "<div><a href='backend.designedbytro.com/#/status'>Backend</a></div>";

	var input = { 
          to : {"meghan@designedbytro.com":"Meghan Howard"},
          from: ["meghan@designedbytro.com","Meghan Howard"],
          subject: "Overdue Payments: " + dateFormat(Date.now(), "mmmm dS"),
          html: html
        }; 

    return input;
};
