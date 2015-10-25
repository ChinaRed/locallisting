var Listing = require('../models/listing');
var express = require('express');
var router = express.Router();

// function ensureAuthenticated (req, res, next){
//   if (req.user && req.isAuthenticated()){
//     return next();
//   }
//   res.redirect("/login");
//   console.log('failed login');
// }

// router.get('/admin', ensureAuthenticated, function (req,res){
//   Listing.find(function (err, listings){
//     res.render('auth/admin', { listings : listings });
//   });
// });

// gets listing page
router.get("/",function (req,res){
  Listing.find(function (err, listings) {
    if(err) throw err;
    res.json(listings);
  });
});

router.get("/lang/:lang", function (req,res){
  Listing.find({ language: req.params.lang }, function (err, listings) {
    if(err) throw err;
    res.json(listings);
  });
});

// creates new listing
router.get('/new_listing',function (req,res){
  res.render('new_listing');
});

// gets single listing
router.get('/:id', function (req,res){
  Listing.find({_id:req.params.id},
    function (err, listing){
      if(err) throw err;
      res.json(listing);
  });
});

// gets single lang listing
router.get('/:language/:id', function (req,res){
  Listing.find({ language: req.params.language, _id:req.params.id},
    function (err, listing){
      if(err) throw err;
      res.json(listing);
  });
});

// posts new listing to db
router.post('/', function (req,res){
  var listing = new Listing(
  { 
    language : req.body.language,
    category : req.body.category,
    region : req.body.category,
    info : { 
          name: req.body.name, 
          summary: req.body.summary,
          phone: req.body.phone, 
          website: req.body.website,
          hours: req.body.hours,
          main_image: req.body.main_image
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
          expiration: req.body.date,
          coupon_image: req.body.coupon_image
          }
  // reviews: {
  //         author: req.body.name,
  //         rating: req.body.rating,
  //         review: req.body.review
  //         },
  // tags: req.body.string 
  });
  listing.save(function (err){
    if (err) throw err;
    res.redirect("/admin");
  });
});

// edits Listing
router.put('/:id', function (req,res){
  Listing.update({_id:req.params.id},
    {
      language : req.body.language,
      category : req.body.category,
      region : req.body.region,
      info : { 
            name: req.body.name, 
            summary: req.body.summary,
            phone: req.body.phone, 
            website: req.body.website,
            hours: req.body.hours,
            main_image: req.body.main_image
           },
    location: {
            street: req.body.street,
            unit: req.body.unit,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            },
    coupon: {
            offer: req.body.offer,
            description: req.body.description,
            terms: req.body.terms,
            expiration: req.body.date,
            coupon_image: req.body.coupon_image
            }
    // reviews: {
    //         author: req.body.name,
    //         rating: req.body.rating,
    //         review: req.body.review
    //         },
    // tags: req.body.string 
            },
            function (err, listing){
              res.redirect('/admin');  
  });
});

// delete listing
router.delete('/:id', function ( req, res ){
  Listing.remove({ _id:req.params.id }, function ( err, item ){
    if (err) return handleError( err );
    res.redirect('/admin');
  });
});

module.exports = router;
