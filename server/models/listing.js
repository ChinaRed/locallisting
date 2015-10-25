var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema ({
  language : String,
  category : String,
  region: String,
  info : { 
          name: String,
          summary: String, 
          phone: String, 
          hours: String,
          website: String,
          main_image: String
         },
  location: {
          street: String,
          unit: String,
          city: String,
          state: String,
          zip: String,
          latitude: String,
          longitude: String
          },
  coupon: {
          offer: String,
          description: String,
          terms: String,
          expiration: Date,
          coupon_image: String
          }
  // reviews: {
  //         name: String,
  //         rating: String,
  //         review: String
  //         },
  // tags: Array 
});

module.exports = mongoose.model('listings', listingSchema);
