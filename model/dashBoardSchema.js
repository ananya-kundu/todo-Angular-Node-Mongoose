var mongoose = require("mongoose");
var express = require('express');
var Schema = mongoose.Schema;

var Msg = Schema({
  userid: {
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
  isArchive :{
      type: Boolean
  },
  isPinup :{
      type: Boolean
  }
}, {
  collection: "userMsgSchema"
});


Msg.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
      if (!this.created_at)
        this.created_at = currentDate;
      next();
});

Msg.statics.saveMsgData = function(reqData, cb) {
  // console.log("i'm inside save method");
    var userMsgSchemaObj = new userMsgSchema(reqData);
    userMsgSchemaObj.save(cb);
};

Msg.statics.getMsgData = function(userid, cb) {
  // console.log("userid.....in get......", userid);
  this.find({userid:userid}, cb);
};

Msg.statics.deleteCardsData = function(userid, cb) {
  // console.log("userid delete...", userid);
  // this.findOne({_id:userid._id},cb);
    this.remove({
          _id: userid
        }, cb);
};

Msg.statics.updateData = function(userid,req, cb) {
  this.update({
    _id: userid
  }, {
      $set: {
        title1: req.title1,
        content: req.content
      }
    }, cb);
};

Msg.statics.popupCardsData = function(userid, cb) {
  this.find({
    _id: userid
  }, cb);
};

Msg.statics.remainderData = function(userid,req,cb) {
    this.update({
        _id: userid
      }, {
        $set: {
          reminder: req.reminder
        }
      }, cb);
};

  Msg.statics.deleteReminderData = function(userid, cb) {
    // console.log("reminder delete...");
    this.update({
      _id: userid
    }, {
        $unset: {
          reminder: ""
        }
      }, cb);
  };

  Msg.statics.changeColor = function(userid,req,cb) {
      this.update({
        _id: userid
      }, {
        $set: {
        color: req.color
        }
      }, cb);
    };

    Msg.statics.archive = function(userid,req,cb) {
      this.update({
        _id: userid
      }, {
        $set: {
        isArchive: req.archive,
        isPinup: req.pin
        }
      }, cb);
    };

    Msg.statics.pinup = function(userid,req,cb) {
      console.log(req,"hjgjkhgjhgjhkghjghj");
      this.update({
        _id: userid
      }, {
        $set: {
          //  pinup: req.value
          isPinup: req.pin,
          isArchive: req.archive

        }
      }, cb);
    };

var userMsgSchema = mongoose.model('userMsgSchema', Msg);

module.exports = userMsgSchema;





// msg.statics.unarchive = function(userid,cb) {
//   this.update({
//     _id: userid
//   }, {
//     $set: {
//     archive: false
//     }
//   }, cb);
// };

// msg.statics.unpin = function(userid,cb) {
//   this.update({
//     _id: userid
//   }, {
//     $set: {
//     pinup: req.value
//     }
//   }, cb);
// };
