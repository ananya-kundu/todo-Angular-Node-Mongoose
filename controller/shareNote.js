/*
 * Session
 * @path controller/shareNote.js
 * @file shareNote.js
 * @Scripted by Ananya Kundu
 */
 'use strict';
/*
 * Module dependencies
 */
var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var winston   = require('winston');
var dashboard = require('../model/userSchema.js');

/* POST call to create card */
router.post('/', function(req, res) {
    try {
            console.log("jhgahsdhashg",req.body);
            dashboard.shareNoteCollaborator(req.body,function(err, result) {
              console.log("result",result);
              if (!err) {
                winston.info('Card Created Successfully');
                res.send({"status": true,"message": "Your cards data is saved","result":result});
              } else {
                winston.error('Card is not created');
                res.send({"status": false,"message": "Your cards data is not saved"});
              }
            });
    } catch (e) {
      winston.systemError('Server error on share note for collaborator');
        res.send({
            "status": false,
            "message": "server error"
        });
    }
});
module.exports = router;
