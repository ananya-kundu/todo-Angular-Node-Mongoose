var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var winston   = require('winston');
var dashboard = require('../model/dashBoardSchema.js');

/* POST call to create card */
router.post('/', function(req, res) {
    try {
        var userid = req.decoded.id;
            var data = {
              userid:userid,
              title1:req.body.title1,
              content:req.body.content,
              color:req.body.color
            }

            dashboard.saveMsgData(data,function(err, result) {
              if (!err) {
                winston.info('Card Created Successfully');
                res.send({"status": true,"message": "Your cards data is saved"});
              } else {
                winston.error('Card is not created');
                res.send({"status": false,"message": "Your cards data is not saved"});
              }
            });
    } catch (e) {
        res.send({
            "status": false,
            "message": "server error"
        });
    }
});
module.exports = router;
