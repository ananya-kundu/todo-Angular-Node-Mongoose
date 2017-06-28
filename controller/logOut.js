/*
 * User logOut Data
 * @path controller/logOut.js
 * @file logOut.js
 * @Scripted by Ananya Kundu
 */
 'use strict';
/*
 * Module dependencies
 */

var express = require('express'),
  router = express.Router();

/* POST call for logout */
router.post('/logout', function(req, res) {
  try {
    res.clearCookie('cookie');
    res.send({
      "status": false,
      "message": "logged out"
    });
  } catch (e) {
    winston.systemError('Server error on logout');
      res.send({
          "status": false,
          "message": "Error"
      });
  }
});

module.exports = router;
