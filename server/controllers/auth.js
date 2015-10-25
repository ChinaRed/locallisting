var Listing = require('../models/listing');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

var uberServerToken = process.env.UBER_SERVER_TOKEN;
var uberClientID = process.env.UBER_CLIENT_ID;
var uberClientSecret = process.env.UBER_CLIENT_SECRET;
var serverUrl = 'http://localhost:2233';

var OAuth2 = require('oauth').OAuth2;

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});

var oauth2 = new OAuth2(
  uberClientID,
  uberClientSecret,
  'https://login.uber.com/',
  'oauth/authorize',
  'oauth/token',
  null);


router.get('/uberlogin', function(req, res){
  res.redirect('https://login.uber.com/oauth/v2/authorize?client_id=' + uberClientID + '&response_type=code&scope=request');
});

router.get('/oauth/cb', function(req, res){
  var code = req.query.code;

  console.log(code);

  oauth2.getOAuthAccessToken(
    code,
    { // NOT IN THE UBER DOCS
      grant_type: 'authorization_code',
      redirect_uri: serverUrl+'/api/oauth/cb'
    },
    function (err, access_token, refresh_token, results){
      if(err){
        console.log('err1',err);
        if(err.data){
          res.end(err.data);
        }else{
          console.log('err2');
          res.json(err);
        }
      } else if(results.error) {
        console.log(results.error);
        console.log('err3');

        res.json(results.error);
      } else {
        // got token, send back to client
        // POPUP Blocker must be disabled, or find workaround, or use redirect instead
        console.log('access token', access_token);
        res.redirect(serverUrl+'#/store-auth-token/'+access_token);
      }
    });
});

module.exports = router;
