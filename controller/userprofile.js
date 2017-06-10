var express = require('express'),
    router = express.Router(),
    profileinfo = require('../model/userSchema');

router.post('/', function(req,res){
    var uid = req.decoded.id;

    profileinfo.getUserProfile(uid,function(err,result){
    // console.log("i'm userprofile api",result);
      try {
        if(err)  {
            res.send({ "status": true, "message": "user profile not is available"});
          }
        else {
            res.send({"status": false,"message": "user profile available","userinfo":result});
          }
        }
        catch (e){
            res.send({"status": false,"message": "server error"});
          }
        });
});
module.exports = router;
