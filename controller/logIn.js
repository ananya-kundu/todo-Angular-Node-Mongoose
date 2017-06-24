
/*
//  * User logIn Data
//  * @path routes/api/logIn.js
//  * @file logIn.js
//  * @Scripted by Ananya Kundu
//  */
//
// /*
//  * Module dependencies
//  */
var cookieParser = require('cookie-parser');
var express = require('express'),
  router = express.Router(),
  login = require('../model/userSchema');
var app = express();

app.use(cookieParser());

var winston = require('winston');
var connDb = require("../config/config");
var connDb1 = require("../config/index");

var jwt = require('jsonwebtoken'); // used to create, sign and verify tokens

/* POST call for login*/
router.post('/login', function(req, res) {
  //if req.body get string collaborator then if condintion checking done otherwise else execute and login done
  if(req.body.col == 'collaborator')
  {
      login.collaborator(req.body,function(err,user){

        if(!err){
            winston.info('collaborator added');
            // console.log("within login collaborator if successfull",user.google.googleEmail);
            res.send({"status":true,"message": user.google});
        }else {
            winston.error('collaborator not created');
            // console.log("within login col if error");
            res.send({"status": false,"msg": err});
        }
      })
  }
  else{
    try {
      req.check(connDb1.validationSchema.login);
      req.getValidationResult().then(function(isValid) {
          try {
            if (!isValid.isEmpty()) {
              var errors = req.validationErrors();
              throw errors[0].msg
            }
            login.checkLoginData(req.body, function(err, user) {
              if (!err) {
                if (user != null) {
                  var loginPassword = req.body.password;
                  var newLoginPassword = user.local.password;

                  var encryptLoginPassword = login.encrypt(loginPassword);
                   // generate the token if the username and pasword is matched
                  if (newLoginPassword == encryptLoginPassword) {
                      var token = jwt.sign({ id: user._id }, connDb.TOKEN_SECRET, {
                          // expiresIn: 864000
                          expiresIn: 60*60*24
                        });
                          res.cookie("cookie",token);
                          winston.info('Login Successfull');
                          //send the response to the caller with the access token and data
                          res.send({
                              "status": true,
                              "message": "valid password...login Successfull",
                              "token": token
                            });
                  } else {
                          winston.error('Login UnSuccessfull');
                          res.send({
                              "status": false,
                              "message": "wrong password"
                            });
                  }
                } else {
                      res.send({
                          "status": false,
                          "message": "email does not exists"
                        });
                }
              } else {
                  res.send({
                          "status": false,
                          "message": "email errors"
                  });
                }
            });
          } catch (e) {
            console.log(e);
                res.send({
                    "status": false,
                    "message": "Validation error. "
                });
            }
        });
      }
      catch (e) {
        console.log("error",e);
        winston.systemError('Server error on Login');
        res.send({
          "status": false,
          "message": "Server error"
        });
      }


  }

      });

    module.exports = router;
