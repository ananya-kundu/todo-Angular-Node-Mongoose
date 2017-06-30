/*
 * findCollaborator -- it is used for add a new collaborator
 * @path controller/findCollaborator.js
 * @file findCollaborator.js
 * @Scripted by Ananya Kundu
 */
'use strict';
/*
 * Module dependencies
 */
var express = require('express'),
  router = express.Router(),
  profileinfo = require('../model/userSchema');
var winston = require('winston');

/* POST call to get find collaborator emailid(receiver) */
router.post('/', function(req, res) {
  try {
    var uid = req.decoded.id;

    /**
     * profileinfo - description
     *
     * @param  {string} uid         user id
     * @param  {type} function(err error
     * @param  {type} result       object having email     
     * @return {type}              description
     */
    profileinfo.findCollaborator(uid, function(err, result) {
      try {
        if (err) {
          winston.error('Receiver mailid is found');
          res.send({
            "status": true,
            "message": "user profile is not available"
          });
        } else {
          winston.info('Receiver is available');
          res.send({
            "status": false,
            "message": "user profile available",
            "userinfo": result
          });
        }
      } catch (e) {
        res.send({
          "status": false,
          "message": "server error"
        });
      }
    });
  } catch (e) {
    winston.systemError('Server error on find receiver emailid for collaborator');
    res.send({
      "status": false,
      "message": "Server Error"
    });
  }

});
module.exports = router;
