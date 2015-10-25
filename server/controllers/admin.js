var Listing = require('../models/listing');
var express = require('express');
var session = require('express-session');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

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

function ensureAuthenticated (req, res, next){
  if (req.user && req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
  console.log('failed login');
}

router.authenticate = passport.authenticate('local',{
  successRedirect : '/admin',
  failureREdirect : '/login'
});

// renders login page
router.get('/login', function (req, res){
  res.render('auth/login');
});

router.get('/', ensureAuthenticated, function (req,res){
  Listing.find(function (err, listings){
    res.render('auth/admin', { listings : listings });
  });
});

router.post('/login', router.authenticate);

router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/admin/login');
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

passport.serializeUser(function (user, done){
  done(null, user.id);
});

passport.deserializeUser(function (id, done){
  User.findById(id, function (err, user){
    done(err, user);
  });
});

//renders edit page
router.get('/edit/:id', ensureAuthenticated, function (req, res){
  Listing.findOne({_id:req.params.id},
    function (err, listings) {
    res.render('edit', {
      listings : listings
    });
  });
});

//edits listing
router.put('edit/:id', ensureAuthenticated, function (req, res) {Listing.findOnAndUpdate({_id:req.params.id}, { $set:
  {
    name : req.params.name
  }}, function (err, listings){
    if (err) throw err;
    res.redirect('/admin');
  });
});

//renders add new listing page
router.get('/new_listing', function (req, res){
  res.render('new_listing');
});

module.exports = router;
