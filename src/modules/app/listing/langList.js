'use strict';

module.exports = /*@ngInject*/
  function langList($scope, ListingService, $state) {
    $scope.welcome = 'This is the lang listing';

    ListingService.allLang($state.params.lang).then(function (data) {
      $scope.listings = data.data;
      console.log('data',data);
    });
  };


