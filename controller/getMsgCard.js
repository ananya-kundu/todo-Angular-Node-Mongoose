/*
 * Card get or read
 * @path controller/getMsgCards.js
 * @file getMsgCards.js
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

/* POST call to get todo */
  router.post('/', function(req,res){
    try{
            var userid = req.decoded.id;
            dashboard.getMsgData(userid,function(err,result){
                  if(!err){
                      winston.info('Card displayed');
                      res.send({"status":true,"message": result});
                  }
                  else {
                      winston.error('Card display not possible');
                      res.send({"status": false,"msg": err});
                  }
          });
    }catch (e) {
      winston.systemError('Server error on get card');
        res.send({
            "status": false,
            "message": "Error"
        });
    }

});

 module.exports = router;
