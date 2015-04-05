var Listing = require('../models/listing');
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport'), 
LocalStrategy = require('passport-local').Strategy;

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

module.exports = router; 