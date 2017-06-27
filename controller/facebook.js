/*
 * User login by facebook
 * @path controller/facebook.js
 * @file facebook.js
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
  var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: connDb.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: accessToken.error.message });
    }

    //  Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message });
      }
      if (req.header('Authorization')) {
        User.findOne({ 'facebook.facebook': profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, connDb.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            console.log("FGASDGHASGdAS11111 ",profile);
            user.facebook.facebook = profile.id;
            user.facebook.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
            user.facebook.displayName = user.displayName || profile.name;
            user.facebook.facebookEmail = profile.email;
            user.save(function() {
              var token = createJWT(user);
              res.cookie("cookie",token);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Create a new user account or return an existing one.
        User.findOne({ 'facebook.facebook': profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = createJWT(existingUser);
            res.cookie("cookie",token);

              return res.send({ token: token });
          }
          var user = new User();
          console.log("FGASDGHASGdAS ",profile);

          user.facebook.facebook = profile.id;
          user.facebook.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.facebook.displayName = profile.name;
          user.facebook.facebookEmail = profile.email;
          user.save(function() {
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
