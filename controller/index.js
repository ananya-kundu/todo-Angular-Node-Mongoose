var express = require('express'),
		router = express.Router();
var auth=require("./authenticate");
// console.log("I'm in index.js");

router.use(require("./session"));
router.use(require('./signUp'));
router.use(require('./logIn'));
router.use(require('./logOut'));

router.use("/userprofile",auth,require("./userprofile"));
router.use("/createCards",auth,require("./createCards"));

router.use("/getMsgCard",auth,require("./getMsgCard"));
router.use("/deleteMsgCard",auth,require("./deleteMsgCard"));
router.use("/updateMsgCards",auth,require("./updateMsgCards"));
router.use("/reminder",auth,require("./reminder"));
router.use("/reminderDelete",auth,require("./reminderDelete"));
router.use("/color",auth,require("./color"));
router.use("/archive",auth,require("./archive"));
router.use("/pinUp",auth,require("./pinUp"));
router.use("/uploadProfileImage",auth,require("./uploadProfileImage"));
router.use("/auth/facebook",require("./facebook"));
router.use("/auth/google",require("./google"));
router.use("/shareNote",auth,require("./shareNote"));
router.use("/findCollaborator",auth,require("./findCollaborator"));
router.use("/activityLogger",auth,require("./activityLogger"));


module.exports = router;
