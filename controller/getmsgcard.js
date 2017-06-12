var express = require('express');
var app = express(),
    router = express.Router();
var winston = require('winston');
var dashboard = require('../model/dashBoardSchema.js');

  router.post('/', function(req,res){
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
});

 module.exports = router;
