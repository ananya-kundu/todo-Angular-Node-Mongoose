var express = require('express'),
    router = express.Router(),
    profileinfo = require('../model/userSchema');
var winston = require('winston');

router.post('/', function(req,res){
    var uid = req.decoded.id;

    profileinfo.getUserProfile(uid,function(err,result){
    // console.log("i'm userprofile api",result);
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
