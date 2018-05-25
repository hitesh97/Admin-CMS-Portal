'use strict';
const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
        host: 'server-020.impetus.co.in',
        port: 25,
        secure: false
    }); 
// setup e-mail data with unicode symbols
var mailOptions = {};
/*var mailOptions = {
    from: 'admincms@test.com', // sender address
    to: 'chetan.singhal@impetus.co.in', // list of receivers
    subject: 'Hello Subject', // Subject line
    text: 'Hello world text?', // plaintext body
    html: '<b>Hello world html?</b>' // html body
};*/

// send mail with defined transport object
if(mailOptions && mailOptions.from) {
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.error('Error sent: ' + error);
		}
		console.log('Message sent: ' + info.response);
	});
}

module.exports = transporter; 
