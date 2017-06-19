/*
 * User login by google
 * @path routes/api/google.js
 * @file google.js
 * @Scripted by Ananya Kundu
 */

/*
 * Module dependencies
 */
var path      = require('path');
var async     = require('async');
var express   = require('express');
var jwt       = require('jsonwebtoken');
var moment    = require('moment');
var mongoose  = require('mongoose');
var request   = require('request');

var  router = express.Router(),
      User  = require('../model/userSchema');
var app     = express();

var winston = require('winston');
var connDb  = require("../config/config");
var connDb1 = require("../config/index");


function createJWT(user) {
  return  token = jwt.sign({ id: user._id }, connDb.TOKEN_SECRET, {
      expiresIn: 60*60*24
    });

}

router.post('/', function(req, res) {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: connDb.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  //  Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };

    // Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({message: profile.error.message});
      }
      //  Link user accounts.
      if (req.header('Authorization')) {
        User.findOne({ 'google.google': profile.sub }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, connDb.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.google.google = profile.sub;
            user.google.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
            user.google.displayName = user.displayName || profile.name;
            user.google.googleEmail = profile.email;
            var token = createJWT(user);
            res.cookie("cookie",token);

            user.save(function() {

              res.send({ token: token });
            });
          });
        });
      } else {
        console.log("else part");
        // Create a new user account or return an existing one.
        User.findOne({ 'google.google': profile.sub }, function(err, existingUser) {

          if (existingUser) {
            var token = createJWT(existingUser);
            res.cookie("cookie",token);
            return res.send({ token: token });
          }
          var user = new User();
          user.google.google = profile.sub;
          user.google.picture = profile.picture.replace('sz=50', 'sz=200');
          user.google.displayName = profile.name;
          user.google.googleEmail = profile.email;

          console.log("userrrrr",user);
          user.save(function(err) {
            var token = createJWT(user);
            res.cookie("cookie",token);

            res.send({ token: token });
          });
        });
      }
    });
  });
});
module.exports = router;
