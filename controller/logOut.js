/*
 * User logOut Data
 * @path routes/api/logOut.js
 * @file logOut.js
 * @Scripted by Ananya Kundu
 */

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
