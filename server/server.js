var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var mongoose = require ('mongoose');
var listings = require('./controllers/listing');

mongoose.connect('mongodb://chinared:'+process.env.DBPASS+'@ds061371.mongolab.com:61371/locallistings');

app.use(function (req, res, next){
  res.set("Access-Control-Allow-Origin","*");
  next();
});

app.use('/api/listings', listings);

var server = app.listen(PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});