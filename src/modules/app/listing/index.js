'use strict';

module.exports =
  angular.module('locallisting.listing', [
    //load your foo submodules here, e.g.:
    //require('./bar').name
  ])
  .config(function ($stateProvider) {
    $stateProvider
    .state('listings', {
      url: '',
      templateUrl: 'app/listing/layout.html',
      controller: 'listingController'
    })
    .state('listing', {
      url: '/listing/:id',
      templateUrl: 'app/listing/listing.html',
      controller: 'singleListingController'
    });
  })
  .controller('listingController', require('./listingController'))
  .controller('singleListingController', require('./singleListingController'));
    
  
