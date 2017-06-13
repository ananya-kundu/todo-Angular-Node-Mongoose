var express = require('express');
var app = express(),
    router = express.Router();
var winston = require('winston');

var dashboard = require('../model/dashBoardSchema.js');

/* POST call to reminder set*/
  router.post('/:id', function(req,res){
      console.log("req"+req);
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
});

 module.exports = router;
