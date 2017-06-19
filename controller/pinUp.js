/*
 * Card pinned or unpinned
 * @path routes/api/pinUp.js
 * @file pinUp.js
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

/* POST call to pinup the cards */
  router.post('/:id', function(req,res){
      var userid = req.params.id;
      // console.log(req.body,"i'm pinup api");
      dashboard.pinup(userid,req.body,function(err,result){
      if(!err){
          winston.info('Pinup Successfully done');
          res.send({"status":true,"message": result});
      }
      else {
          winston.error('Pinup not Successfull');
          res.send({"status": false,"msg": err});
      }

  });
});

 module.exports = router;
