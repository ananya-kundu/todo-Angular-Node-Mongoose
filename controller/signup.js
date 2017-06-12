var express = require('express'),
    router = express.Router();
var signup = require('../model/userSchema.js');
var connDb1 = require("../config");
var winston = require('winston');
var validator = require('express-validator');
router.use(validator());

  router.post('/signup', function(req,res){
    try {
      // console.log(connDb1.validationSchema.signup);
      req.check(connDb1.validationSchema.signup);
      req.getValidationResult().then(function(isValid) {
          try {
            if (!isValid.isEmpty()) {
              // console.log("error");
              var errors = request.validationErrors();
              throw errors[0].msg
            }

            try{

               var userData = req.body;
              //  console.log("I am user data",userData);

               signup.saveUserData(userData,function(err,result){
                 if(!err){
                   if(!result){
                          res.send({"status":true,"message": "already exists.."});
                        }else{
                            res.send({"status":true,"message": "Registration Successfull"});
                          }
                    winston.info('Signup successfull');

                  }else {
                    winston.error('Signup not successfull');
                        if (err == undefined) {
                            res.send({"status": false,"msg": "data is not saved"});
                        } else {
                          res.send({"status":false,"message": "validation error"});
                        }

                      }
                  });
                }catch (e) {
                  res.send({"status": false,"message": "server error"});
                }

          }catch (e) {
            res.send({
              "status": false,
              "message": "mongoDB error"
            });
          }

    });

  }
  catch (e) {
    res.send({
      "status": false,
      "message": "server error"
    });
  }
      });

 module.exports = router;
