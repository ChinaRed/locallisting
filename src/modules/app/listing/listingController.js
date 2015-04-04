'use strict';

module.exports = /*@ngInject*/
  function listingController($scope, ListingService) {
    $scope.welcome = 'This is the Listing';

    ListingService.all().then(function (data) {
      $scope.listings = data.data;
    });
  };
