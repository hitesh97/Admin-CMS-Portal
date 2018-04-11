'use strict';
const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "vipuldahale1985@gmail.com", // generated ethereal user
            pass: "" // generated ethereal password
        }
    }); 
// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'vipuldahale1985@gmail.com', // sender address
    to: 'chetan.singhal@impetus.co.in', // list of receivers
    subject: 'Hello Subject', // Subject line
    text: 'Hello world text?', // plaintext body
    html: '<b>Hello world html?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.error('Error sent: ' + error);
    }
    console.log('Message sent: ' + info.response);
});


module.exports = transporter; 
