/*
 * Card color Data
 * @path controller/color.js
 * @file color.js
 * @Scripted by Ananya Kundu
 */
'use strict';

/*
 * Module dependencies
 */
var express = require('express');
var app = express(),
  router = express.Router();
var winston = require('winston');

var dashboard = require('../model/dashBoardSchema.js');

/* POST call to change color of card */
router.post('/:id', function(req, res) {
  var userid = req.params.id;
  try {
    dashboard.changeColor(userid, req.body, function(err, result) {
      if (!err) {
        winston.info('Color changed');
        res.send({
          "status": true,
          "message": result
        });
      } else {
        winston.error('Color not changed');
        res.send({
          "status": false,
          "msg": err
        });
      }
    });
  } catch (e) {
    console.log(e);
    winston.systemError('Server error on Card color change');
    res.send({
      "status": false,
      "message": "Server Error"
    });
  }

});

module.exports = router;
