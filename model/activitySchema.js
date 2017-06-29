/*
 * Activity Schema
 * @path model/activitySchema.js
 * @file activity.js
 */

/*
 * Module dependencies
 */
var mongoose = require("mongoose");
var express = require('express');

//set variable reffernce to mongoose schema
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * @schema activitySchema
 * @description Activity details
 */
var Activity = Schema({
  userid: {
    type: ObjectId, //type is defined by ObjectId
    ref: "userRegisterSchema" //userid -- foreign key of activitySchema and primary key of userRegisterSchema(Model Name)
  },
  activity: {
    type: String
  },
  created_at: {
    type: Date
    //  default: Date.now
  },
  message: {
    type: String
  },
  title: {
    type: String
  }

}, {
  collection: "activitySchema"
});


Activity.pre('save', function(next) {
  var currentDate = new Date();
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});


/**
 * getActivity
 * find by userid
 * @api For Activity(api --activityLogger)
 * @param - userid(collaborator owner id)
 */

Activity.statics.getActivity = function(userid, cb) {
  console.log("userid", userid);
  this.find({
    userid: userid
  }, cb);
};



var activitySchema = mongoose.model('activitySchema', Activity); //creating model,model name --activitySchema

module.exports = activitySchema;
