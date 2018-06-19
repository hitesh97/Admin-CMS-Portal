var express = require('express');
var qs = require('qs');
var router = express.Router();
var mongoose = require('mongoose');
var commonConfig = require('../models/commonSetting.js');

/* create/update common setting */
router.post('/', function(req, res, next) {
	var reqBody = qs.parse(req.body, {depth: 900000, arrayLimit: 1000000});
	var type = reqBody.type;
	delete reqBody.type;	
	var emailSettingJson = {
		type: type,
		req_json: JSON.stringify(reqBody)
	};

	commonConfig.findOneAndUpdate({type: type}, emailSettingJson, function (err, post) {
		if (err) return next(err);
		
		if(post) {
			res.json(post);
		}
		else {
			commonConfig.create(emailSettingJson, function (err, post) {
				if (err) return next(err);
				res.json(post);
			});
		}		
	});
});

/* get common setting by type */
router.get('/:type', function(req, res, next) {
	var reqBody = qs.parse(req.body, {depth: 900000, arrayLimit: 1000000});
	var emailSettingJson = {
		type: req.params.type
	};

	commonConfig.findOne(emailSettingJson, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;