/*
 * Card reminder
 * @path controller/reminder.js
 * @file reminder.js
 * @Scripted by Ananya Kundu
 */

/*
 * Module dependencies
 */
var express = require('express');
var app = express(),
    router = express.Router();
var winston = require('winston');

var dashboard = require('../model/dashBoardSchema.js');

/* POST call to reminder set*/
  router.post('/:id', function(req,res){
    // console.log("req"+req);
    try {
          var userid = req.params.id;

          dashboard.remainderData(userid,req.body,function(err,result){
                if(!err){
                    winston.info('Reminder created');
                    res.send({"status":true,"message": result});
                }else {
                    winston.error('Reminder not created');
                    res.send({"status": false,"msg": err});
                }
          });

    } catch (e) {
      winston.systemError('Server error on reminder');
        res.send({
            "status": false,
            "message": "Server Error"
        });
    }


});

 module.exports = router;
