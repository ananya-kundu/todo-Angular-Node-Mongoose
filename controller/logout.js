var express = require('express'),
  router = express.Router();

router.post('/logout', function(req, res) {
  res.clearCookie('cookie');
  res.send({
    "status": false,
    "message": "logged out"
  });
});
module.exports = router;
