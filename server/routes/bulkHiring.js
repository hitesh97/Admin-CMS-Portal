var express = require('express');
var qs = require('qs');
var router = express.Router();
var mongoose = require('mongoose');
var bulkEmployees = require('../models/bulkEmployees.js');
var Email = require('../services/sendemail.js');
var commonConfig = require('../models/commonSetting.js');
var mailOptions = "";


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

/* GET Bulk ALL */
router.get('/listing', function(req, res, next) {
  bulkEmployees.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE data of Bulk BY ID */
router.get('/bulkCreate/:id', function(req, res, next) {
  bulkEmployees.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/***Bulk Email for create */
router.post('/bulkCreate', function(req, res, next) {  
  var reqBody = qs.parse(req.body, {depth: 900000, arrayLimit: 1000000});
  var full_name =" - Budding Impros";
  var mail_html = reqBody.mail_html;  
  bulkEmployees.create(reqBody, function (err, post) {
    if (err) return next(err);

    if(reqBody.is_mail === "Yes") {
      var attachments = [];

      if(reqBody.user_image.length > 0 ) {
        for(var i=0; i<reqBody.user_image.length;i++) {
          attachments.push({
            path: reqBody.user_image[i],
            cid: "bulk-images-"+i
          })
        }
      }

      var mOptions = {
          from: mailOptions.from, // sender address
          to: mailOptions.to, // list of receivers
          subject: mailOptions.subject_text+full_name+'!', // Subject line
          html: mail_html, // html body
          attachments: attachments
      };
      Email.sendMail(mOptions);
    }

    res.json(post);
  });
});

/* UPDATE Bulk data by ID */
router.post('/bulkCreate/:id', function(req, res, next) {
  var reqBody = qs.parse(req.body, {depth: 900000, arrayLimit: 1000000});
  var full_name =" - Budding Impros";
  var mail_html = reqBody.mail_html; 
  bulkEmployees.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);

    if(reqBody.is_mail === "Yes") {
      var attachments = [];

      if(reqBody.user_image.length > 0 ) {
        for(var i=0; i<reqBody.user_image.length;i++) {
          attachments.push({
            path: reqBody.user_image[i],
            cid: "bulk-images-"+i
          })
        }
      }
      var mOptions = {
          from: mailOptions.from, // sender address
          to: mailOptions.to, // list of receivers
          subject: mailOptions.subject_text+full_name+'!', // Subject line
          html: mail_html, // html body
          attachments: attachments
      };
      Email.sendMail(mOptions);
    }
    
    res.json(post);
  });
});

/* DELETE Bulk data by ID */
router.delete('/bulkCreate/:id', function(req, res, next) {
  bulkEmployees.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;