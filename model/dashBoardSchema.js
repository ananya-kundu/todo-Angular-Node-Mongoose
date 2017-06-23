/*
 * Card Schema
 * @path model/user/dashBoardSchema.js
 * @file dashBoardSchema.js
 */

 /*
  * Module dependencies
  */
var mongoose = require("mongoose");
var express = require('express');

//set variable reffernce to mongoose schema
var Schema = mongoose.Schema;
/**
 * @schema dashBoardSchema
 * @description Card details
 */

//create the schema for dashboard(cards)
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

/**
 * edited date set for card
 * @api For Card
 */
//hooks-here 'pre' is Serial middleware are executed one after another, when each middleware calls next
Msg.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
      if (!this.created_at)
        this.created_at = currentDate;
      next();
});

/**
 * Save Card
 * @api For Card
 */
Msg.statics.saveMsgData = function(reqData, cb) {
  // console.log("i'm inside save method");
    var userMsgSchemaObj = new userMsgSchema(reqData);
    userMsgSchemaObj.save(cb);
};

/**
 * collaborator --finfd by email id--called in logIn.js,if 'collaborator' String is get
 * @api For Card
 */
Msg.statics.collaborator = function(email, cb) {
  this.find({
    email: email
  }, cb);
}

/**
 * shareCardData for collaborator--it share the same card of selected card
 * @api For Card
 */

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
};




/**
 * get Card
 *
 * find by userid
 * @api For Card
 */

Msg.statics.getMsgData = function(userid, cb) {
  // console.log("userid.....in get......", userid);
  this.find({userid:userid}, cb);
};

/**
 * Delete Card
 * delete by userid
 *  trash is used for going to trash,
 *  restore is used to restore that card and delete is used for permanently delete
 * @api For Card
 */
Msg.statics.deleteCardsData = function(userid,req, cb) {
  if(req.del == 'trash'){
      this.update({
            _id: userid
        },{
          $set:{
          isDeleted:true
          }
        }, cb);
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
    }
    else if(req.del == 'delete'){
          this.remove({
                _id: userid
              }, cb);
            }

};


/**
 * Update Card
 *
 * Update by userid
 * set title and content
 * return updated card
 * @api For Card
 */
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

/**
 * Popup Card
 *
 * find by userid
 * @api For Card
 */
Msg.statics.popupCardsData = function(userid, cb) {
  this.find({
    _id: userid
  }, cb);
};





/**
 * remainder set for Card
 *
 * Update by userid
 * set reminder by date
 * return reminder card
 * @api For Card
 */
Msg.statics.remainderData = function(userid,req,cb) {
    this.update({
        _id: userid
      }, {
        $set: {
          // reminder: req.reminder.sort('date')
          reminder: req.reminder

        }
      }, cb);
};



/**
 * remainder delete for Card
 *
 * Update by userid
 * delete reminder
 * return after deletion of reminder
 * @api For Card
 */
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


  /**
   * changeColor for Card
   *
   * Update by userid
   * set color
   * return card with color
   * @api For Card
   */
  Msg.statics.changeColor = function(userid,req,cb) {
      this.update({
        _id: userid
      }, {
        $set: {
        color: req.color
        }
      }, cb);
    };

    /**
     * archive for Card
     *
     * Update by userid
     * if archive value true and pinup value true ||  archive value true and pinup value true ,then archived
     * if archive value false and pinup value true  ,then unarchive  and pinned that card
     * if archive value true and pinup value false ,then unarchived but unpinned that card
     * @api For Card
     */
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

    /**
     * pinup for Card
     *
     * Update by userid
     * if pinup value true ,then pinned and pinup value true and archive value true|| pinup value true and archive value true,then pinned
     * if pinup value true and  archive value false  ,then pinned  and unarchive   that card
     * if pinup value false and archive value true  ,then unpinned  but unarchived that card
     * @api For Card
     */
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

//model creation
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
// Msg.statics.deleteCardsData = function(userid, cb) {
//   // this.findOne({_id:userid._id},cb);
//     this.remove({
//           _id: userid
//         }, cb);
// };
