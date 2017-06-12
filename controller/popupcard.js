var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var winston = require('winston');
var todocards = require('../model/dashBoardSchema.js');

router.post('/:userid', function(req, res) {
    try {
            var popupdata =req.params.userid;
            // console.log("idddd",popupdata);
            todocards.popupCardsData(popupdata,function(err, result) {
              // console.log(popupdata);
              if (!err) {
                winston.info('Popup Successfully done');
                res.send({"status": true,"message": result});
              } else {
                winston.error('Popup not Successfull');
                res.send({"status": false,"message": err});
              }
            });
    } catch (e) {
        res.send({"status": false,"message": "server error"});
    }
});
module.exports = router;
