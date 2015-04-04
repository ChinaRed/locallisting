var Listing = require('../models/listing');
var express = require('express');
var router = express.Router();

router.get("/",function (req,res){
  Listing.find(function (err, listings) {
    if(err) throw err;
    res.json(listings);
  });
});

router.get('/:id', function (req,res){
  Listing.find({_id:req.params.id},
    function (err, listing){
      if(err) throw err;
      res.json(listing);
  });
});

router.post('/', function (req,res){
  var listing = new Listing(
  { 
    info : { 
          name: req.body.name, 
          phone: req.body.phone, 
          website: req.body.URL,
          hours: {
                  mon: req.body.mon,
                  tue: req.body.tue,
                  wed: req.body.wed,
                  thu: req.body.thu,
                  fri: req.body.fri,
                  sat: req.body.sat,
                  sun: req.body.sun
                },
          image: req.body.photoURL
         },
  location: {
          street: req.body.street,
          unit: req.body.unit,
          city: req.body.city,
          zip: req.body.zip,
          geo: req.body.geo
          },
  coupon: {
          offer: req.body.offer,
          description: req.body.description,
          terms: req.body.terms,
          expiration: req.body.Date,
          image: req.body.photoURL
          },
  reviews: {
          name: req.body.name,
          rating: req.body.rating,
          review: req.body.review
          },
  tags: req.body.string 
  });
  listing.save(function (err){
    if (err) throw err;
    res.redirect("/");
  });
  
});

module.exports = router;



