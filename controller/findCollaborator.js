/*
 * Find collaborator
 * @path routes/api/collaborator.js
 * @file collaborator.js
 * @Scripted by Ananya Kundu
 */

/*
 * Module dependencies
 */
var express = require('express'),
    router = express.Router(),
    profileinfo = require('../model/userSchema');
var winston = require('winston');

/* POST call to get profile is available  or not */
router.post('/', function(req,res){
    var uid = req.decoded.id;

    profileinfo.findCollaborator(uid,function(err,result){
      try {
        if(err)  {
            winston.error('User profile is not available');
            res.send({ "status": true, "message": "user profile is not available"});
          }
        else {
            winston.info('User profile is available');
            res.send({"status": false,"message": "user profile available","userinfo":result});
          }
        }
        catch (e){
            res.send({"status": false,"message": "server error"});
          }
        });
});
module.exports = router;
