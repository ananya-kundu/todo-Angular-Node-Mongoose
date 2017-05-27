var mongoose = require("mongoose");
var express = require('express');
// var validators = require("mongoose-validators");
// var jwt    = require('jsonwebtoken');
// var secretKey = require('../config/config.js');
// app.set('superSecret', secret);
var Schema = mongoose.Schema;

var msg = Schema({
  userid: {
    // ref:"user",
    // type: ObjectId
    type: String
  },
  title1: {
    type: String,
    minlength: 0
  },
  content: {
    type: String,
    minlength: 0
  },
  created_at: {
       type: Date,
        default: Date.now
      },
    updated_at: {
        type: Date,
        default: Date.now
    },
    reminder :{
      type: Date
    },
    color :{
      type: String
    }

}, {
  collection: "userMsgSchema"
});



msg.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

msg.statics.saveMsgData = function(reqData, cb) {
  var userMsgSchemaObj = new userMsgSchema(reqData);
  // console.log(userMsgSchemaObj);
  userMsgSchemaObj.save(cb);
}
msg.statics.getMsgData = function(userid, cb) {
  // this.find({},cb);
  console.log("userid...........", userid);
  this.find(userid, cb);
}
msg.statics.deleteCardsData = function(userid, cb) {
  console.log("userid delete...", userid);
  console.log(userid);
  // this.findOne({_id:userid._id},cb);
  this.remove({
    _id: userid
  }, cb);
}
msg.statics.updateData = function(userid,req, cb) {
  // console.log("userid updated...", userid);
  this.update({
    _id: userid
  }, {
    $set: {
      title1: req.title1,
      content: req.content
    }
  }, cb);
}

msg.statics.popupCardsData = function(userid, cb) {
  this.find({
    _id: userid
  }, cb);
}
msg.statics.remainderData = function(userid,req,cb) {
  this.update({
    _id: userid
  }, {
    $set: {
    reminder: req.reminder
    }
  }, cb);
  }

  msg.statics.deleteReminderData = function(userid, cb) {
    console.log("reminder delete...");
    this.update({
      _id: userid
    }, {
      $unset: {
      reminder: ""
      }
    }, cb);
    }
    msg.statics.changeColor = function(userid,req,cb) {
      this.update({
        _id: userid
      }, {
        $set: {
        color: req.color
        }
      }, cb);
      }

var userMsgSchema = mongoose.model('userMsgSchema', msg);

module.exports = userMsgSchema;
