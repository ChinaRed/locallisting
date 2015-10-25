'use strict';

module.exports = /*@ngInject*/
  function categoryList($scope, ListingService, $state) {
    $scope.welcome = 'This is the category listing';

    ListingService.allCategory($state.params.category).then(function (data) {
      $scope.listings = data.data;
      console.log('data',data);
    });
  };

