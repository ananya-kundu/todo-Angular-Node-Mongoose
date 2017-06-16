var mongoose = require("mongoose");
var express = require('express');

var validators = require("mongoose-validators");
var  crypto = require('crypto');
var jwt    = require('jsonwebtoken');
var secretKey = require('../config/config.js');
//set variable reffernce to mongoose schema
var Schema = mongoose.Schema;

//create the schema for user
var userData = Schema({
  local:{
        userName: {
          type: String,
          // required: true,
          minlength: 2,
          maxlength: 50,
          validate : validators.isAlpha()
        },
        mobileNo :{
          type: Number,
          // required: true,
          min : 10
        },
        email: {
          type: String,
          // required: true,
          unique: true,
          validate : validators.isEmail()
        },
        password: {
          type: String,
          // required: true,
          minlength: 4,
          maxlength: 100
        },
        profileImage : {
          type: String
        }
  },
  facebook:{
        displayName: String,
        picture: String,
        facebook: String
  }

}, {collection: "userRegisterSchema"});

//password encryption at signup
userData.statics.encrypt = function encrypt(text) {
  var cipher = crypto.createCipher(secretKey.algorithm,secretKey.password);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

//save user data at signup
userData.statics.saveUserData = function(reqData, cb) {
  console.log("i'm reqdata",reqData);
  var ref = this ;
  this.findOne({ 'local.email': reqData.email }, function(err, exist) {
    if (exist) {
      cb(null,false);
    } else {
      var encryptPassword = userData.encrypt(reqData.password);

      var userObj = new userData({
         'local.userName': reqData.userName,
         'local.email': reqData.email,
         'local.password': encryptPassword
     });

        userObj.save(cb);

        }
  });
}

//upload the profile image
userData.statics.uploadProfileImage = function(req,url, cb) {
  this.update({
    'local.userName': req.name
  }, {
    $set: {
        'local.profileImage': url
    }
  }, cb);
};

//check login data
userData.statics.checkLoginData = function(loginData, cb) {
    this.findOne({'local.email': loginData.email }, cb);
}

//get user profile
  userData.statics.getUserProfile = function(userid, cb) {
    var ref = this ;
    console.log("model",userid);
    this.findById(userid,cb);
}

//model creation
var userData = mongoose.model('userRegisterSchema', userData);
module.exports = userData;
