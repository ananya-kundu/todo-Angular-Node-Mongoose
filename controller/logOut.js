var express = require('express'),
  router = express.Router();

/* POST call for logout */
router.post('/logout', function(req, res) {
  res.clearCookie('cookie');
  res.send({
    "status": false,
    "message": "logged out"
  });
});
module.exports = router;
