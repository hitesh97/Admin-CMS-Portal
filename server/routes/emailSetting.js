var express = require('express');
var qs = require('qs');
var router = express.Router();
var mongoose = require('mongoose');
var EmailConfig = require('../models/emailSetting.js');

/* create email seeting */
router.post('/', function(req, res, next) {
  var reqBody = qs.parse(req.body, {depth: 900000, arrayLimit: 1000000});
  EmailConfig.create(reqBody, function (err, post) {
  if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;