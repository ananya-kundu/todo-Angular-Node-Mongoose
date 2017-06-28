/*
 * User authentication Data
 * @path controller/authenticate.js
 * @file authenticate.js
 * @Scripted by Ananya Kundu
 */
 'use strict';

/*
 * Module dependencies
 */
 var express   = require('express');
 var  router   = express.Router();
 var jwt       = require('jsonwebtoken');
 var secretKey = require('../config/config.js');
 var winston   = require('winston');

router.use(function(req, res, next) {
      console.log("auth library....");
      var token = req.headers['x-access-token'] || req.headers.cookie ;
      token = token.substr(7);                //substr(7) bcz 7 counts key name i.e. cookie+space =7
        // console.log( req.headers.cookie);
      if (token) {
          console.log("token in auth",token);
            jwt.verify(token, secretKey.TOKEN_SECRET, function(err, decoded) {
              if (err) {
                  winston.error('Authentication Failed');
                  res.send({"status": false,"message": "Failed to authenticate token."});
                } else {
                    req.decoded = decoded;
                    next();
                  }
            });
        } else {
              winston.info('Authentication Successfully done');
              res.send({"status": false,"message": "No token provided."});
            }
});

module.exports = router;
