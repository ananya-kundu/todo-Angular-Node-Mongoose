
var express = require('express');
var app = express(),
    router = express.Router();
var fs = require("fs");
var winston = require('winston');
var userProfilePic = require('../model/userSchema.js');

/* POST call to get profile image */
  router.post('/', function(req,res){
      var base64Data = req.body.myCroppedImage.replace(/^data:image\/png.base64,/g,""); //its change to base64
        var image = req.body.name;

        //Save with a buffer as content from a base64 image
    fs.writeFile("public/profileImages/"+image+".png",base64Data, {
          encoding: 'base64'
        },function(err){
            if(!err){
                console.log(err);
                // res.send({"status":true,"message": "result"});
              }//if closing
            else {
              console.log("file created");
              }//else end
          });

          //image store into profileImage folder inside public with .png format
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

    });


 module.exports = router;
