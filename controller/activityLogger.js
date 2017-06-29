/*
 * Card get or read
 * @path controller/activityLogger.js
 * @file activityLogger.js
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
var activity = require('../model/activitySchema.js');

/* POST call to get todo */


router.post('/', function(req, res) {
  // console.log("request",req);
  try {

    var userid = req.decoded.id;
    console.log("userid:::", userid);

    /**
     * activity - get activity details
     *
     * @param  {string} userid       user id
     * @param  {type} function(err error
     * @param  {type} result       card details
     */
    activity.getActivity(userid, function(err, result) {
      if (!err) {
        winston.info('Activity displayed');
        res.send({
          "status": true,
          "message": result
        });
      } else {
        winston.error('Activity display not possible');
        res.send({
          "status": false,
          "msg": err
        });
      }
    });
  } catch (e) {
    winston.systemError('Server error on get card');
    res.send({
      "status": false,
      "message": "Error"
    });
  }

});

module.exports = router;
