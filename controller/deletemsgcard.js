var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todocards = require('../model/dashBoardSchema.js');
router.post('/:userid', function(req, res) {
    try {
console.log("delete");
            var deleteddata =req.params.userid;

            todocards.deleteCardsData(deleteddata,function(err, result) {
              if (!err) {
                res.send({"status": true,"message": result});
              } else {
                res.send({"status": false,"message": err});
              }
            });
    } catch (e) {
        res.send({"status": false,"message": "server error"});
    }
});
module.exports = router;
