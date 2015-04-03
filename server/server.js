var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var mongoose = require ('mongoose');
var listings = require('./controllers/listing');

mongoose.connect('mongodb://chinared:'+process.env.DBPASS+'@ds061371.mongolab.com:61371/locallistings');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api/listings', listings);

var server = app.listen(PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});