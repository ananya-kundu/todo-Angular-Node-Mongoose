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
// var Activity = require('/')
/**
 * @schema activitySchema
 * @description Activity details
 */
 var Activity = Schema({
       userid: {
         type: String
       },
       activity:{
         type: String
       },
       created_at: {
           type: Date
          //  default: Date.now
       },
       message: {
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

     Activity.statics.getActivity = function(userid, cb) {
       this.find({userid:userid}, cb);
     };



     var activitySchema = mongoose.model('activitySchema', Activity);

     module.exports = activitySchema;
