var express = require('express');
var app = express(),
 router = express.Router();

var dashboard = require('../model/dashBoardSchema.js');

  router.post('/:id', function(req,res){
    // console.log("req"+req);
      var userid = req.params.id;
    dashboard.changeColor(userid,req.body,function(err,result){
      if(!err){
        // console.log("i'm change color");
          res.send({"status":true,"message": result});
      }
      else {
          res.send({"status": false,"msg": err});
      }

  });
});

 module.exports = router;
