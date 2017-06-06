var express = require('express');
var app = express(),
 router = express.Router();
 var fs = require("fs");

var dashboard = require('../model/userSchema.js');

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
});

 module.exports = router;
