'use strict';

module.exports =
  angular.module('locallisting.listing', [
    //load your foo submodules here, e.g.:
    //require('./bar').name
  ])
  .config(function ($stateProvider) {
    $stateProvider
    .state('listings', {
      url: '/',
      templateUrl: 'app/listing/views/layout.html',
      controller: 'listingController'
    })
    .state('langList', {
      url: '/lang/:lang',
      templateUrl: 'app/listing/views/layout.html',
      controller: 'langList'
    })
    .state('listing', {
      url: '/listings/:id',
      templateUrl: 'app/listing/views/listing.html',
      controller: 'singleListingController'
    })
    .state('storeAuthToken', {
      url: '/store-auth-token/:token',
      controller: function($stateParams){
        localStorage.auth_token = $stateParams.token;
      }
    });
  })
  .controller('listingController', require('./listingController'))
  .controller('langList', require('./langList'))
  .controller('singleListingController', require('./singleListingController'));
    
  
