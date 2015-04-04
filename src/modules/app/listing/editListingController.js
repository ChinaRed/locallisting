'use strict';

module.exports = /*@ngInject*/
  function listingController($scope, EditListing, $state) {
    $scope.welcome = 'This is the Listing';

    EditListing.post().then(function (data) {
      $scope.listings = data.data;
    });
  };
