/*
 * collaborator added or not
 * @path routes/api/collaborator.js
 * @file collaborator.js
 * @Scripted by Ananya Kundu
 */

/*
 * Module dependencies
 */


var express = require('express'),
    router = express.Router(),
    login = require('../model/userSchema');
var app = express();

var winston = require('winston');


/* POST call to Collaborator  */
  router.post('/:id', function(req,res){
      var userid = req.params.id;
      dashboard.Collaborator(userid,req.body,function(err,result){
      if(!err){
          winston.info('Collaborator Successfully added');
          res.send({"status":true,"message": result});
      }
      else {
          winston.error('Collaborator not added');
          res.send({"status": false,"msg": err});
      }

  });
});

 module.exports = router;
