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
  Listing.findOne({_id:req.params.id},
    function (err, listing){
      if(err) throw err;
      res.json('single', {
        listing : listing
      });
  });
});

module.exports = router;



