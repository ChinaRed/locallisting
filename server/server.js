var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var app = express();
var PORT = process.env.PORT || 2233;
app.use(express.static('www'));

var uberServerToken = process.env.UBER_SERVER_TOKEN;
var uberClientID = process.env.UBER_CLIENT_ID;
var uberClientSecret = process.env.UBER_CLIENT_SECRET;

var mongoose = require ('mongoose');
var listings = require('./controllers/listing');
var auth = require('./controllers/auth');
var admin = require('./controllers/admin');

mongoose.connect('mongodb://chinared:'+ process.env.DBPASS +'@ds061371.mongolab.com:61371/locallistings');

// middleware
app.use(function (req, res, next){
  res.set("Access-Control-Allow-Origin","*");
  next();
});
app.use('/api/',auth);

app.use(bodyParser.urlencoded({extend:true}));
app.use(session({ secret : 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.set('view engine','jade');
app.set('views',process.cwd() + '/server/views');
app.use('/api/listings', listings);
app.use('/admin/',admin);

var server = app.listen(PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});