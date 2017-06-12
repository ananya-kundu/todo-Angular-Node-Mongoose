var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var winston = require('winston');

var todocards = require('../model/dashBoardSchema.js');

router.post('/:id', function(req, res) {
    try {
        console.log("reminder delete");
          var deleteddata =req.params.id;

          todocards.deleteReminderData(deleteddata,function(err, result) {
              if (!err) {
                winston.info('Reminder deleted successfully');
                res.send({"status": true,"message": result});
              } else {
                  winston.error('Reminder not deleted ');
                  res.send({"status": false,"message": err});
              }
            });
    } catch (e) {
        res.send({"status": false,"message": "server error"});
    }
});
module.exports = router;
