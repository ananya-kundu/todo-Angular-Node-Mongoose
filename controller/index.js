var express = require('express'),
		router = express.Router();
var auth=require("./authenticate");
// console.log("I'm in index.js");

router.use(require("./session"));
router.use(require('./signup'));
router.use(require('./login'));
router.use(require('./logout'));

router.use("/readuserprofile",auth,require("./userprofile"));
router.use("/createcards",auth,require("./createcards"));

router.use("/getmsgcard",auth,require("./getmsgcard"));
router.use("/deletemsgcard",auth,require("./deletemsgcard"));
router.use("/popupcard",auth,require("./popupcard"));
router.use("/updatemsgcards",auth,require("./updatemsgcards"));
router.use("/reminder",auth,require("./reminder"));
router.use("/reminderdelete",auth,require("./reminderdelete"));
router.use("/color",auth,require("./color"));
router.use("/archive",auth,require("./archive"));
router.use("/pinup",auth,require("./pinup"));
router.use("/uploadprofileimage",auth,require("./uploadprofileimage"));


module.exports = router;
