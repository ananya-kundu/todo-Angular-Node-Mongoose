var cookieParser = require('cookie-parser');
var express = require('express'),
  router = express.Router(),
  login = require('../model/userSchema');
var app = express();

app.use(cookieParser());

var winston = require('winston');
var connDb = require("../config/config");
var connDb1 = require("../config/index");

var jwt = require('jsonwebtoken');

router.post('/login', function(req, res) {
      try {
        req.check(connDb1.validationSchema.login);
        req.getValidationResult().then(function(isValid) {
            try {
              if (!isValid.isEmpty()) {
                // winston.info('Validation Unsuccessfulls.Login Unsuccessfull');
                var errors = request.validationErrors();
                throw errors[0].msg
              }
              login.checkLoginData(req.body, function(err, user) {
                if (!err) {
                  if (user != null) {
                    var loginPassword = req.body.password;
                    var newLoginPassword = user.password;

                    var encryptLoginPassword = login.encrypt(loginPassword);

                    if (newLoginPassword == encryptLoginPassword) {
                        var token = jwt.sign({ id: user._id }, connDb.secret, {
                            // expiresIn: 864000
                            expiresIn: 60*60*24
                          });
                            res.cookie("cookie",token);
                            winston.info('Login Successfull');
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
