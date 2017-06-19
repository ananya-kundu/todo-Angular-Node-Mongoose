/*
 * User signup Data
 * @path routes/api/signup.js
 * @file signup.js
 * @Scripted by Ananya Kundu
 */

/*
 * Module dependencies
 */
var express = require('express'),
    router = express.Router();
var signup = require('../model/userSchema.js');
var connDb1 = require("../config");
var winston = require('winston');
var validator = require('express-validator');
router.use(validator());

//create user
router.post('/signup', function(req, res) {
  var result = {};
 result.status = false;
try {
  req.check(connDb1.validationSchema.signup);
  req.getValidationResult().then(function(isValid) {

          try {
              if (!isValid.isEmpty()) {
                  var errors = req.validationErrors(); // isValid = isValid.useFirstErrorOnly();
                  throw errors[0].msg;
              }
              signup.saveUserData(req.body, function(err, result) {
                  if (!err) {
                      if (!result) {
                          res.send({"status": true,"msg": "user email id already exist!"});
                      } else {
                          res.send({"status": true,"msg": "data is saved!"});
                      }
                      winston.info('Signup successfull');
                  }
                   else {
                      winston.error('Signup Unsuccessfull');
                      if (err == undefined) {
                          res.send({"status": false,"msg": "data is not saved"});
                      } else {
                          var validationErrors = [];
                          var errormsg = JSON.stringify(err);
                          var convertmsg = JSON.parse(errormsg).errors;
                          for (var key in convertmsg) {
                              validationErrors.push(convertmsg[key].message);
                          }
                          res.send({"status": false,"msg": validationErrors});
                      }
                  }
              });
          }catch (e) {
                if (!error.checkSystemErrors(e)) {
                    result.status = false;
                    result.msg = e;
                }
                res.send(result);
                return;
}
      });
    } catch (e) {
      console.log(e);
          res.send({"status": false,"msg":"server error"});
      }
  });
module.exports = router;
