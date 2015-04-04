var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema ({
  info : { 
          name: String, 
          phone: String, 
          website: String,
          hours: {
                  mon: String,
                  tue: String,
                  wed: String,
                  thu: String,
                  fri: String,
                  sat: String,
                  sun: String
                },
          image: String
         },
  location: {
          street: String,
          unit: String,
          city: String,
          zip: String,
          geo: String
          },
  coupon: {
          offer: String,
          description: String,
          terms: String,
          expiration: Date,
          image: String
          }
  // reviews: {
  //         name: String,
  //         rating: String,
  //         review: String
  //         },
  // tags: Array 
});

module.exports = mongoose.model('listings', listingSchema);
