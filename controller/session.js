/*
 * Session
 * @path controller/session.js
 * @file session.js
 * @Scripted by Ananya Kundu
 */
 'use strict';
/*
 * Module dependencies
 */
var express = require('express'),
	router = express.Router();

/* POST call to get session */
router.post('/session',function(req,res){
				console.log("ananya session",req.session);
				if (req.headers.cookie) {
							res.send({"status":true,"message":"user exist","session":true})
					} else {
							res.send({"status":false,"message":"no user","session":false})
						}
});

module.exports = router;
