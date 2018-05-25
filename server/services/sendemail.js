'use strict';
const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport

module.exports = {
  sendMail: function(mailOptions){
    var transporter = nodemailer.createTransport({
        host: 'server-020.impetus.co.in',
        port: 25,
        secure: false
    });
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.error('Error sent: ' + error);
      }
      console.log('Message sent: ' + info.response);
    });
  }
};
