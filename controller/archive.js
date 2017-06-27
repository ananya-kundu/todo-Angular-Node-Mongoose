/*
 * Card archive and unarchive Data
 * @path controller/archive.js
 * @file archive.js
 * @Scripted by Ananya Kundu
 */

/*
 * Module dependencies
 */
var express = require('express');
var app     = express(),
    router  = express.Router();
var winston = require('winston');

var dashboard = require('../model/dashBoardSchema.js');

  router.post('/:id', function(req,res){
    // console.log("req"+req);
      var userid = req.params.id;
      try{
      dashboard.archive(userid,req.body,function(err,result){
          if(!err){
              winston.info('Archived Successfully');
              res.send({"status":true,"message": result});
            }
          else {
              winston.error('Archive not Suceesfull');
              res.send({"status": false,"msg": err});
            }
        });
      }catch (e) {
        console.log(e);
        winston.systemError('Server error on Archive');
            res.send({
                "status": false,
                "message": "Server Error"
            });
        }
});

module.exports = router;
