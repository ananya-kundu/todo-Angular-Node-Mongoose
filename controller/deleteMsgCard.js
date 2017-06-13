var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var winston = require('winston');
var todocards = require('../model/dashBoardSchema.js');

/* POST call to delete todo */
router.post('/:userid', function(req, res) {
    try {
        var deleteddata =req.params.userid;

        todocards.deleteCardsData(deleteddata,function(err, result) {
              if (!err) {
                winston.info('Card deleted Successfully');
                res.send({"status": true,"message": result});
              } else {
                winston.error('Card not deleted ');
                res.send({"status": false,"message": err});
              }
            });
    } catch (e) {
        res.send({"status": false,"message": "server error"});
    }
});
module.exports = router;
