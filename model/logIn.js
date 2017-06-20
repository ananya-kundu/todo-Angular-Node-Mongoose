
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
      try {
        req.check(connDb1.validationSchema.login);
        req.getValidationResult().then(function(isValid) {
            try {
              if (!isValid.isEmpty()) {
                // winston.info('Validation Unsuccessfulls.Login Unsuccessfull');
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
          res.send({
            "status": false,
            "message": "server error"
          });
        }
      });

    module.exports = router;
