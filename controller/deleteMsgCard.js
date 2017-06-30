/*
 * Card deletion
 * @path controller/deleteMsgCards.js
 * @file deleteMsgCards.js
 * @Scripted by Ananya Kundu
 */
'use strict';
/*
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var winston = require('winston');
var todocards = require('../model/dashBoardSchema.js');

/* POST call to delete todo */
router.post('/:userid', function(req, res) {
  try {
    var deleteddata = req.params.userid;
    // console.log("delet", req.body);


    /**
     * todocards - description
     *
     * @param  {string} deleteddata  card id
     * @param  {object} req.body     details of card
     * @param  {type} function(err error
     * @param  {type} result       is not error then deleted
     * @return {type}              all card except selected cards
     */
    todocards.deleteCardsData(deleteddata, req.body, function(err, result) {
      if (!err) {
        winston.info('Card deleted Successfully');
        res.send({
          "status": true,
          "message": result
        });
      } else {
        winston.error('Card not deleted ');
        res.send({
          "status": false,
          "message": err
        });
      }
    });
  } catch (e) {
    winston.systemError('Server error on Delete card');
    res.send({
      "status": false,
      "message": "server error"
    });
  }
});
module.exports = router;
