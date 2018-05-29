var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Employee = require('../models/employee.js');
var Email = require('../services/sendemail.js');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  Employee.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
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
  Employee.create(req.body, function (err, post) {
    //Email.sendMail();
	if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BOOK */
router.post('/:id', function(req, res, next) {
  Employee.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
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