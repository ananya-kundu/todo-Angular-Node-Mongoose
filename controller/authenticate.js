 var express   = require('express');
 var  router   = express.Router();
 var jwt       = require('jsonwebtoken');
 var secretKey = require('../config/config.js');
 var winston   = require('winston');

router.use(function(req, res, next) {
      console.log("auth library....");
      var token = req.headers['x-access-token'] || req.headers.cookie ;
      token = token.substr(7);
        // console.log( req.headers.cookie);
      if (token) {
            jwt.verify(token, secretKey.TOKEN_SECRET, function(err, decoded) {
              if (err) {
                  winston.error('Authentication Failed');
                  res.send({"status": false,"message": "Failed to authenticate token."});
                } else {
                    req.decoded = decoded;
                    //  console.log( req.decoded.id+" my decoded id " );
                    next();
                  }
            });
        } else {
              winston.info('Authentication Successfully done');
              res.send({"status": false,"message": "No token provided."});
            }
});

module.exports = router;
