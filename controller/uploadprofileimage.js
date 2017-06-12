

var express = require('express');
var app = express(),
 router = express.Router();
 var fs = require("fs");
var winston = require('winston');
var userProfilePic = require('../model/userSchema.js');

  router.post('/', function(req,res){
      var base64Data = req.body.myCroppedImage.replace(/^data:image\/png.base64,/g,"");
        var image = req.body.name;

        var check = fs.writeFile("public/profileImages/"+image+".png",base64Data, {
          encoding: 'base64'
        },function(err){
            if(!err){

                res.send({"status":true,"message": "result"});
              }//if closing
            else {
                var url = "profileImages/"+image+".png";
                userProfilePic.uploadProfileImage(req.body,url,function(err, result) {
                      if (!err) {
                          winston.info('User profile image suceesfully uploaded');
                          res.send({"status": true,"message": result});
                        } else {
                            winston.error('User profile image not uploaded');
                            res.send({"status": false,"message": err});
                          }
                        });
              }//else end
          });

    });




 module.exports = router;
