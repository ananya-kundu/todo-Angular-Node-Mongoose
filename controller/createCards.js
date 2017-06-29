

/*
 * Card creation
 * @path api--controller/createCards.js
 * @file createCards.js
 * @Scripted by Ananya Kundu
 */
'use strict';
/*
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var winston = require('winston');
var dashboard = require('../model/dashBoardSchema.js');

/* POST call to create card */
router.post('/', function(req, res) {

  try {
    //if req.body.share  not matched with String 'share' then if condition checking done otherwise else execute and login done
    if (req.body.share !== 'share') {
      try {
        console.log("create",req.body);
        var userid = req.decoded.id;
        var data = {                      //data object created with userid and card details
          userid: userid,
          title1: req.body.title1,
          content: req.body.content,
          color: req.body.color
        }

        /**
         * dashboard - card save
         *
         * @param  {type} data         description
         * @param  {type} function(err error
         * @param  {type} result       card details
         * @return {type}              if not error then card created otherwise card not created
         */
        dashboard.saveMsgData(data, function(err, result) {
          if (!err) {
            winston.info('Card Created Successfully');
            res.send({
              "status": true,
              "message": "Your cards data is saved"
            });
          } else {
            winston.error('Card is not created');
            res.send({
              "status": false,
              "message": "Your cards data is not saved"
            });
          }
        });
      } catch (e) {
        res.send({
          "status": false,
          "message": "server error"
        });
      }

    } else {

      /**
       * dashboard - card share
       *
       * @param  {type} req.body     card details
       * @param  {type} function(err error
       * @param  {type} result       result
       * @return {type}              if not error then Card Sent to Receiver Successfully otherwise Card sent is not possible
       */
      dashboard.shareCardData(req.body, function(err, result) {       //it is used for shared card,req.body contain all details of particular card
        console.log("share", req.body);
        if (!err) {
          winston.info('Card Send to Receiver Successfully');
          res.send({
            "status": true,
            "message": "Card Sent to Receiver Successfully"
          });
        } else {
          winston.error('Card sent is not possible');
          res.send({
            "status": false,
            "message": "Card sent is not possible"
          });
        }
      });
    }

  } catch (e) {
    winston.systemError('Server error on Create card or Share card');
    res.send({
      "status": false,
      "message": "server error"
    });
  }


});
module.exports = router;
