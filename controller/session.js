var express = require('express'),
	router = express.Router();

router.post('/session',function(req,res){
console.log("ananya session",req.session);
// console.log("I m response in session",res);
if (req.headers.cookie) {
	res.send({"status":true,"message":"user exist","session":true})
} else {
	res.send({"status":false,"message":"no user","session":false})
}
});

module.exports = router;
