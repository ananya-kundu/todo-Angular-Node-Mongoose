var express = require('express');
var app = express(),
 router = express.Router();
 var fs = require("fs");

var userProfilePic = require('../model/userSchema.js');

  router.post('/', function(req,res){
    console.log("req",req);
      var base64Data = req.body.myCroppedImage.replace(/^data:image\/png.base64,/g,"");
        var image = req.body.name;
      var check = fs.writeFile("public/profileImages/"+image+".png",base64Data, {
          encoding: 'base64'
        },function(err){
            if(!err){
                console.log("i'm upload image");
                res.send({"status":true,"message": "result"});
              }
            else {
                res.send({"status": false,"msg": err});
              }

          });
          var url = "profileImages/"+image+".png";

          // router.post('/:userid', function(req, res) {
              // try {
          console.log("upload image");
                      // var imageddata =req.params.userid;
                      userProfilePic.uploadProfileImage(req.body,url,function(err, result) {
                        if (!err) {
                          res.send({"status": true,"message": result});
                        } else {
                          res.send({"status": false,"message": err});
                        }
                      });
              // } catch (e) {
              //     res.send({"status": false,"message": "server error"});
              // }
          });


 module.exports = router;
