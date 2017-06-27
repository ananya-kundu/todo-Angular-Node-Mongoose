/*
 * Card updation
 * @path collaborator/updateMsgCards.js
 * @file updateMsgCards.js
 * @Scripted by Ananya Kundu
 */

/*
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var winston = require('winston');
var todocards = require('../model/dashBoardSchema.js');

/* POST call to update card */
router.post('/:userid', function(req, res) {
    try {
        var updatedata =req.params.userid;

        todocards.updateData(updatedata,req.body,function(err, result) {
          // console.log("");
              if (!err) {
                  winston.info('Card Updated Succesfully');
                  res.send({"status": true,"message": result});
                } else {
                    winston.error('Card Updation not Succesfull');
                    res.send({"status": false,"message": err});
                }
        });
    } catch (e) {
        winston.systemError('Server error on update card');
        res.send({"status": false,"message": "server error"});
    }
});
module.exports = router;
