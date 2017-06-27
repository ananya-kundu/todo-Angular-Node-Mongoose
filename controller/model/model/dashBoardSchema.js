
var mongoose = require("mongoose");
var express = require('express');
var Schema = mongoose.Schema;
var activityList = require('./activitySchema');
console.log("activity ....");


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
          type: Boolean,
          default: false
      },
      isPinup :{
          type: Boolean,
          default: false
      },
      isDeleted:{
        type: Boolean,
        default: false
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
    var userMsgSchemaObj = new userMsgSchema(reqData);
    userMsgSchemaObj.save(cb);
    var activityLog = new activityList({
      userid : reqData.userid,
      message : "New Note added"

    });
    activityLog.save();
};

Msg.statics.collaborator = function(email, cb) {
  this.find({
    email: email
  }, cb);
}


Msg.statics.shareCardData = function(reqData, cb) {
  var userObj = new this({
    userid  : reqData.id,
    title1 : reqData.title,
    content : reqData.content,
    color : reqData.color,
    reminder : reqData.reminder,
    isPinup : reqData.isPinup,
    isDeleted: reqData.isDeleted
  });
  userObj.save().then(function(result){
    console.log("result",result);
  }).catch(function(err){
    console.log("error",err);
  });
  var activityLog = new activityList({
    userid : reqData.userid,
    message : "Note Shared"

  });
  activityLog.save();
};


Msg.statics.getMsgData = function(userid, cb) {
  this.find({userid:userid}, cb);
};

Msg.statics.deleteCardsData = function(userid,req, cb) {
  console.log("delete",userid);
  if(req.del == 'trash'){
      this.update({
            _id: userid
        },{
          $set:{
          isDeleted: true
          }
        }, cb);
        var activityLog = new activityList({
          userid : userid,
          message : "Note Trashed"

        });
        activityLog.save();
    }
    else if(req.del == 'restore'){
        this.update({
            _id: userid
          }, {
            $unset: {
                isDeleted: false,
                reminder: false,
                isPinup: false

              }
            }, cb);
            var activityLog = new activityList({
              userid : userid,
              message : "Note Restore"

            });
            activityLog.save();
    }
    else if(req.del == 'delete'){
          this.remove({
                _id: userid
              }, cb);
              var activityLog = new activityList({
                userid : userid,
                message : "Note Deleted"

              });
              activityLog.save();
            }

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
    var activityLog = new activityList({
      userid : reqData.userid,
      message : "Note updated "

    });
    activityLog.save();
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
      // var activityLog = new activityList({
      //   userid : userid,
      //   message : "Reminder Selected"
      //
      // });
      // activityLog.save();
};


  Msg.statics.deleteReminderData = function(userid, cb) {
    this.update({
      _id: userid
    }, {
        $unset: {
          reminder: ""
        }
      }, cb);
      var activityLog = new activityList({
        userid : userid,
        message : "Reminder deleted"

      });
      activityLog.save();
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
