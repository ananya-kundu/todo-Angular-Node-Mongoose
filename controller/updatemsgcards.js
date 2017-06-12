var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var winston = require('winston');
var todocards = require('../model/dashBoardSchema.js');

router.post('/:userid', function(req, res) {
    try {
        var updatedata =req.params.userid;

        todocards.updateData(updatedata,req.body,function(err, result) {
        
              if (!err) {
                  winston.info('Card Updated Succesfully');
                  res.send({"status": true,"message": result});
                } else {
                    winston.error('Card Updation not Succesfull');
                    res.send({"status": false,"message": err});
                }
        });
    } catch (e) {
        res.send({"status": false,"message": "server error"});
    }
});
module.exports = router;
