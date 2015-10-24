'use strict';

module.exports = /*@ngInject*/
  function listingController($scope, ListingService, $state) {
    $scope.welcome = 'This is the Listing';

    ListingService.all().then(function (data) {
      $scope.listings = data.data;
      console.log('data',data);
    });
  };


