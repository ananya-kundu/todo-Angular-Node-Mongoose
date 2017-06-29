/*
 * Card archive and unarchive Data
 * @path controller/archive.js
 * @file archive.js
 * @Scripted by Ananya Kundu
 */

'use strict';
/*
 * Module dependencies
 */
var express = require('express');
var app = express(),
  router = express.Router();
var winston = require('winston');

var dashboard = require('../model/dashBoardSchema.js');

/**
 * router - description
 *
 * @param  {params} '/:id'       id contain card id
 * @param  {type} function(req object having archive and pin
 * @param  {type} res          object having status and message
 */
router.post('/:id', function(req, res) {
  var userid = req.params.id;
  try {

    /**
     * dashboard - description
     *
     * @param  {string} userid      userid
     * @param  {object} req.body     pin and archive value in boolean,card id and title of the card
     * @param  {type} function(err error
     * @param  {string} result       card id
     * @return {type}              if archive value true then archived. otherwise unarchived
     */
    dashboard.archive(userid, req.body, function(err, result) {
      console.log("req body",req.body);
      if (!err) {
        winston.info('Archived Successfully');
        res.send({
          "status": true,
          "message": result
        });
      } else {
        winston.error('Archive not Suceesfull');
        res.send({
          "status": false,
          "msg": err
        });
      }
    });
  } catch (e) {
    console.log(e);
    winston.systemError('Server error on Archive');
    res.send({
      "status": false,
      "message": "Server Error"
    });
  }
});

module.exports = router;
