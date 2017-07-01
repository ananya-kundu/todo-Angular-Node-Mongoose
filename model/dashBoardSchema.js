/*
 * Card Schema
 * @path model/dashBoardSchema.js
 * @file dashBoardSchema.js
 */

/*
 * Module dependencies
 */
var mongoose = require("mongoose");
var express = require('express');

//set variable reffernce to mongoose schema
var Schema = mongoose.Schema;
var activityList = require('./activitySchema');

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
  reminder: {
    type: Date
  },
  color: {
    type: String
  },
  isArchive: {
    type: Boolean,
    default: false
  },
  isPinup: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  shareNote: {
    type: String,
    default: null
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
 * @param -reqData is details of Note and userid also
 */
Msg.statics.saveMsgData = function(reqData, cb) {
  console.log("reqdata", reqData);

  var userMsgSchemaObj = new userMsgSchema(reqData);
  userMsgSchemaObj.save(cb);
  var activityLog = new activityList({
    userid: reqData.userid,
    message: "New Note Added",
    title: reqData.title1

  });
  activityLog.save();
};

/**
 * collaborator --finfd by email id--called in logIn.js,if 'collaborator' String is get
 * @api For Card (api-logIn)
 * @param - email of owner
 */
Msg.statics.collaborator = function(email, cb) {
  console.log("col email::", email);
  this.find({
    email: email
  }, cb);
}

/**
 * shareCardData for collaborator--it share the same card of selected card
 * @api For createCards
 * @param - reqData contain Owner userid,card details i.e. title,content etc..full card details.
 */

Msg.statics.shareCardData = function(reqData, cb) {
  // console.log("share asdassafasfsaf",reqData);
  this.findById({
    _id: reqData.data._id
  }, function(err, result) { //here _id is note Id.
    console.log("error", err, "result", result);
    if (result) {
      result.shareNote = reqData.id;
      result.save(cb);
    }
  });
};




/**
 * get Card
 * find by userid
 * @api For Card
 */

Msg.statics.getMsgData = function(userid, cb) {
  this.find({
    $or: [{
      userid: userid
    }, {
      shareNote: userid
    }]
  }, cb);
};

/**
 * Delete Card
 * delete by userid
 * trash is used for going to trash,
 * restore is used to restore that card and delete is used for permanently delete
 * @api For Card
 * @param -userid and req(its contain isDeleted true or false)
 */
Msg.statics.deleteCardsData = function(userid, req, cb) {
  console.log("delete", userid);
  if (req.del == 'trash') {
    this.update({
      _id: userid
    }, {
      $set: {
        isDeleted: true
      }
    }, cb);
    var activityLog = new activityList({
      userid: req.userid,
      message: "Note Trashed",
      title: req.title

    });
    activityLog.save();
  } else if (req.del == 'restore') {
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
      userid: req.userid,
      message: "Note Restored",
      title: req.title

    });
    activityLog.save();
  } else if (req.del == 'delete') {
    this.remove({
      _id: userid
    }, cb);
    var activityLog = new activityList({
      userid: req.userid,
      message: "Note Deleted Permanently",
      title: req.title

    });
    activityLog.save();
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
Msg.statics.updateData = function(userid, req, cb) {
  console.log("jghjgjkgjklgglj");
  this.update({
    _id: userid
  }, {
    $set: {
      title1: req.title1,
      content: req.content
    }
  }, cb);
  var activityLog = new activityList({
    userid: req.userid,
    message: "Note updated ",
    title: req.title1
  });
  activityLog.save();
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
Msg.statics.remainderData = function(userid, req, cb) {
  this.update({
    _id: userid
  }, {
    $set: {

      reminder: req.reminder

    }
  }, cb);
  var activityLog = new activityList({
    userid: req.userid,
    message: "Reminder Added",
    title: req.title

  });
  activityLog.save();
};



/**
 * remainder delete for Card
 *
 * Update by userid
 * delete reminder
 * return after deletion of reminder
 * @api For Card
 */
Msg.statics.deleteReminderData = function(userid, req, cb) {
  console.log("del rem", req);
  this.update({
    _id: userid
  }, {
    $unset: {
      reminder: ""
    }
  }, cb);
  var activityLog = new activityList({
    userid: req.userid,
    message: "Reminder Deleted",
    title: req.title

  });
  activityLog.save();
};


/**
 * changeColor for Card
 *
 * Update by userid
 * set color
 * return card with color
 * @api For Card
 */
Msg.statics.changeColor = function(userid, req, cb) {
  this.update({
    _id: userid
  }, {
    $set: {
      color: req.color
    }
  }, cb);
  var activityLog = new activityList({
    userid: req.userid,
    message: "color Changed",
    title: req.title

  });
  activityLog.save();
};

/**
 * archive for Card
 *
 * Update by userid
 * if archive value true and pinup value true ||  archive value true and pinup value false ,then archived
 * if archive value false and pinup value true  ,then unarchive  and pinned that card
 * if archive value true and pinup value false ,then unarchived but unpinned that card
 * @api For Card
 */
Msg.statics.archive = function(userid, req, cb) {
  // if(req.archive == "true" && req.pin == "false" || req.archive == "true" && req.pin == "true" ){
  if (req.archive == "true") {
    message = "Note Archived"
  } else {
    message = "Note Unarchived"
  }
  this.update({
    _id: userid
  }, {
    $set: {
      isArchive: req.archive,
      isPinup: req.pin
    }
  }, cb);
  var activityLog = new activityList({
    userid: req.userid,
    message: message,
    title: req.title

  });
  activityLog.save();
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
Msg.statics.pinup = function(userid, req, cb) {
  // console.log(req,"hjgjkhgjhgjhkghjghj");
  if (req.pin == "true") {
    message = "Note Pinned"
  } else {
    message = "Note Unpinned"
  }
  this.update({
    _id: userid
  }, {
    $set: {
      //  pinup: req.value
      isPinup: req.pin,
      isArchive: req.archive

    }
  }, cb);
  var activityLog = new activityList({
    userid: req.userid,
    message: message,
    title: req.title

  });
  activityLog.save();
};

//model creation
var userMsgSchema = mongoose.model('userMsgSchema', Msg); //model name --userMsgSchema

module.exports = userMsgSchema;
