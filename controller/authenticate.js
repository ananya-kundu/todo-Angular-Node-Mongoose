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
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secretKey = require('../config/config.js');
var winston = require('winston');


/**
 * router - authentication
 *
 * @param  {type} function(req request
 * @param  {type} res           contains object with status and message
 * @param  {type} next         after token verification its go to next api
 * @return {type}              description
 */
router.use(function(req, res, next) {
  console.log("auth library....");
  var token = req.headers['x-access-token'] || req.headers.cookie;
  token = token.substr(7);                         //substr(7) bcz 7 counts key name i.e. cookie+space =7
  // console.log( req.headers.cookie);
  if (token) {

    /**
     * jwt - description
     *
     * @param  {type} token                  token
     * @param  {type} secretKey.TOKEN_SECRET secret key
     * @param  {type} function(err           error
     * @param  {type} decoded                decoded token
     * @return {type}                        none
     */
    jwt.verify(token, secretKey.TOKEN_SECRET, function(err, decoded) {
      if (err) {
        winston.error('Authentication Failed');
        res.send({
          "status": false,
          "message": "Failed to authenticate token."
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    winston.info('Authentication Successfully done');
    res.send({
      "status": false,
      "message": "No token provided."
    });
  }
});

module.exports = router;
