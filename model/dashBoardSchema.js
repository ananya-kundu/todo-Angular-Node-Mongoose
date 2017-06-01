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
    // type: ObjectId,
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
    },
    archive :{
      type: Boolean
    },
    pinup :{
      type: Boolean
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
  console.log("i'm inside save method");
  var userMsgSchemaObj = new userMsgSchema(reqData);
  userMsgSchemaObj.save(cb);
};

msg.statics.getMsgData = function(userid, cb) {

  console.log("userid.....in get......", userid);
  this.find({userid:userid}, cb);
};

msg.statics.deleteCardsData = function(userid, cb) {
  console.log("userid delete...", userid);
  console.log(userid);
  // this.findOne({_id:userid._id},cb);
  this.remove({
    _id: userid
  }, cb);
};

msg.statics.updateData = function(userid,req, cb) {
  this.update({
    _id: userid
  }, {
    $set: {
      title1: req.title1,
      content: req.content
    }
  }, cb);
};

msg.statics.popupCardsData = function(userid, cb) {
  this.find({
    _id: userid
  }, cb);
};

msg.statics.remainderData = function(userid,req,cb) {
  this.update({
    _id: userid
  }, {
    $set: {
    reminder: req.reminder
    }
  }, cb);
};

  msg.statics.deleteReminderData = function(userid, cb) {
    console.log("reminder delete...");
    this.update({
      _id: userid
    }, {
      $unset: {
      reminder: ""
      }
    }, cb);
  };

    msg.statics.changeColor = function(userid,req,cb) {
      this.update({
        _id: userid
      }, {
        $set: {
        color: req.color
        }
      }, cb);
    };

    msg.statics.archive = function(userid,cb) {
      this.update({
        _id: userid
      }, {
        $set: {
        archive: true
        }
      }, cb);
    };

    msg.statics.pinup = function(userid,cb) {
      this.update({
        _id: userid
      }, {
        $set: {
        pinup: true
        }
      }, cb);
    };

    msg.statics.unpin = function(userid,cb) {
      this.update({
        _id: userid
      }, {
        $set: {
        pinup: false
        }
      }, cb);
    };


var userMsgSchema = mongoose.model('userMsgSchema', msg);

module.exports = userMsgSchema;
