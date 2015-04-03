'use strict';

module.exports =
  angular.module('locallisting.listing', [
    //load your foo submodules here, e.g.:
    //require('./bar').name
  ])
  .config(function ($stateProvider) {
    $stateProvider
    .state('listing', {
      url: '',
      templateUrl: 'app/listing/layout.html',
      controller: 'listingController'
    });
  })
  .controller('listingController', require('./listingController'));
