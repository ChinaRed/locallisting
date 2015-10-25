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

var oauth2 = new OAuth2(
  uberClientID,
  uberClientSecret,
  'https://login.uber.com/',
  'oauth/authorize',
  'oauth/token',
  null);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function ensureAuthenticated (req, res, next){
  if (req.user && req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
  console.log('failed login');
}

router.get('/admin', ensureAuthenticated, function (req,res){
  Listing.find(function (err, listings){
    res.render('auth/admin', { listings : listings });
  });
});

router.get('/uberlogin', function(req, res){
  res.redirect('https://login.uber.com/oauth/v2/authorize?client_id=' + uberClientID + '&response_type=code&scope=request');
});

passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({ username : username }, function (err, user){
      if (err) {return done(err);}
      if (!user) {
        return done(null, false, { message : 'Incorrect Username'});
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message : 'Incorrect Password'});
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done){
  done(null, user.id);
});

passport.deserializeUser(function (id, done){
  User.findById(id, function (err, user){
    done(err, user);
  });
});

//renders edit page
router.get('/admin/edit/:id', ensureAuthenticated, function (req, res){
  Listing.findOne({_id:req.params.id},
    function (err, listings) {
    res.render('edit', {
      listings : listings
    });
  });
});

// //edits listing
// router.put('edit/:id', ensureAuthenticated, function (req, res) {Listing.findOnAndUpdate({_id:req.params.id}, { $set:
//   {
//     name : req.params.name
//   }}, function (err, listings){
//     if (err) throw err;
//     res.redirect('/admin');
//   });
// });

//renders add new listing page
router.get('/admin/new_listing', function (req, res){
  res.render('new_listing');
});

// renders login page
router.get('/login', function (req, res){
  res.render('auth/login');
});

router.authenticate = passport.authenticate('local',{
  successRedirect : '/admin',
  failureREdirect : '/login'
});

router.post('/login', router.authenticate);

router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

router.post('/new_user', function (req, res){
  var user = new User(
  {
    username : req.body.username,
    password : req.body.password
  });
  user.save(function (err){
    if (err) throw err;
    res.redirect('/');
  });
});

router.get('/oauth/cb', function(req, res){
  var code = req.query.code;

  console.log(code);

  oauth2.getOAuthAccessToken(
    code,
    { // NOT IN THE UBER DOCS
      grant_type: 'authorization_code',
      redirect_uri: serverUrl+'/oauth/cb'
    },
    function (err, access_token, refresh_token, results){
      if(err){
        console.log(err);
        if(err.data){
          res.end(err.data);
        }else{
          res.json(err);
        }
      } else if(results.error) {
        console.log(results.error);
        res.json(results.error);
      } else {
        // got token, send back to client
        // POPUP Blocker must be disabled, or find workaround, or use redirect instead
        console.log(access_token);
        res.send(serverUrl+'#store-auth-token/'+access_token);
      }
    });
});

module.exports = router;
