/*
 * User Schema
 * @path model/user/UserSchema.js
 * @file userSchema.js
 */


 /*
  * Module dependencies
  */
var mongoose = require("mongoose");
var express = require('express');

var validators = require("mongoose-validators");
var  crypto = require('crypto');
var jwt    = require('jsonwebtoken');
var secretKey = require('../config/config.js');
//set variable reffernce to mongoose schema
var Schema = mongoose.Schema;


/**
 * @schema UserSchema
 * @description User details
 * create the schema for user
 */
var userData = Schema({
  local:{
        userName: {
          type: String,
          minlength: 2,
          maxlength: 50,
          validate : validators.isAlpha()
        },
        mobileNo :{
          type: Number,
          min : 10
        },
        email: {
          type: String,
          validate : validators.isEmail()
        },
        password: {
          type: String,
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
        facebook: String,
        facebookEmail: String
  },
  google:{
        displayName: String,
        picture: String,
        google: String,
        googleEmail: String
  }

}, {collection: "userRegisterSchema"});


/**
 * password encryption
 *
 * use crypto algorithm
 * @return {cryted} password
 * @api For User
 */
//password encryption at signup
userData.statics.encrypt = function encrypt(text) {
  var cipher = crypto.createCipher(secretKey.algorithm,secretKey.password);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}


/**
 * Save User
 *
 * @return {Exist} already exist
 * @return {User} user
 * @api For User
 */
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

        userObj.save(cb); //save user data at signup

        }
  });
}

/**
 * uploadProfileImage User
 *
 * update image by username
 * @api uploadProfileImage For User
 */
 //upload the profile image
userData.statics.uploadProfileImage = function(req,url, cb) {

  this.update({
    'local.userName': req.name //update image by username
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


/**
 * Find `User` by its id
 * @api userProfile
 */
//get user profile
  userData.statics.getUserProfile = function(userid, cb) {
    var ref = this ;
    console.log("model",userid);
    this.findById(userid,cb);
}


/**
 * Find `User` by its id
 * @api logIn
 */

userData.statics.collaborator = function(req, cb) {
  this.findOne({_id:req.id},cb);
}


userData.statics.findCollaborator = function(req, cb) {
   this.find({userid:req.id}, cb);
}



userData.statics.shareNoteCollaborator = function(req, cb) {
    this.findOne({$or:[{'local.email': req.emailid },{'google.googleEmail': req.emailid}]}, cb);
}


//model creation
var userData = mongoose.model('userRegisterSchema', userData);
module.exports = userData;
