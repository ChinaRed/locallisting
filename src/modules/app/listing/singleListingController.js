'use strict';

module.exports = /*@ngInject*/
  function singleListingController($scope, ListingService, $state) {
    $scope.welcome = 'This is the Listing';

    ListingService.get($state.params.id).then(function (data) {
      $scope.listing = data.data[0];
      console.log('$scope.listings',$scope.listing);
      
      $scope.listingImage = data.data[0].info.main_image;
      console.log('$scope.listingImage',$scope.listingImage);

      $scope.couponImage = data.data[0].coupon.coupon_image;
    });

    $scope.uberClick = function (event) {
        console.log('this._id',this.listing._id);
        localStorage.locationId = this.listing._id;
        window.location.href = 'http://localhost:2233/api/uberlogin';

    };
  };
