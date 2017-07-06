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

/**
 * logout
 *
 * @param  {type} '/logout'    description
 * @param  {type} function(req request
 * @param  {type} res          response
 * @return {type}              none
 */
router.post('/logout', function(req, res) {
  try {
    res.clearCookie('cookie');
    req.headers.cookie = undefined;
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
