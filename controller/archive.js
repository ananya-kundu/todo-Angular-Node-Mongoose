/*
 * Card archive Data
 * @path routes/api/archive.js
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
});

module.exports = router;
