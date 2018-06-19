var express = require('express');
var qs = require('qs');
var router = express.Router();
var mongoose = require('mongoose');
var Employee = require('../models/employee.js');
var Email = require('../services/sendemail.js');
var commonConfig = require('../models/commonSetting.js');
var mailOptions = "";

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Employee.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* get common setting by type */
router.get('/getCommonSetting/:type', function(req, res, next) {
  var reqBody = qs.parse(req.body, {depth: 900000, arrayLimit: 1000000});
  var emailSettingJson = {
    type: req.params.type
  };

  commonConfig.findOne(emailSettingJson, function (err, post) {
    if (err) return next(err);    
    mailOptions = JSON.parse(post.req_json);
    res.json(post);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function(req, res, next) {
  Employee.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {  
  var reqBody = qs.parse(req.body, {depth: 900000, arrayLimit: 1000000});
  var full_name = reqBody.first_name+" "+reqBody.last_name;
  var mail_html = reqBody.mail_html;  
  Employee.create(reqBody, function (err, post) {
    var attachments = [
        {   // data uri as an attachment
            path: reqBody.user_image,
            cid: reqBody.email
        }
    ];
    var mOptions = {
        from: mailOptions.from, // sender address
        to: mailOptions.to, // list of receivers
        subject: mailOptions.subject_text+' '+full_name, // Subject line
        html: mail_html, // html body
        attachments: attachments
    };
    Email.sendMail(mOptions);
	if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.post('/:id', function(req, res, next) {
  var reqBody = qs.parse(req.body, {depth: 900000, arrayLimit: 1000000});
  console.log('mailOptions = ', mailOptions);
  var full_name = reqBody.first_name+" "+reqBody.last_name;
  var mail_html = reqBody.mail_html; 
  Employee.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    var attachments = [
        {   // data uri as an attachment
            path: reqBody.user_image,
            cid: reqBody.email
        }
    ];
    var mOptions = {
        from: mailOptions.from, // sender address
        to: mailOptions.to, // list of receivers
        subject: mailOptions.subject_text+' '+full_name, // Subject line
        html: mail_html, // html body
        attachments: attachments
    };
    Email.sendMail(mOptions);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  Employee.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;