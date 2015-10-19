'use strict';

module.exports = /*@ngInject*/
  function singleListingController($scope, ListingService, $state) {
    $scope.welcome = 'This is the Listing';

    ListingService.get($state.params.id).then(function (data) {
      $scope.listing = data.data[0];
      console.log('$scope.listings',$scope.listing);
    });
  };
