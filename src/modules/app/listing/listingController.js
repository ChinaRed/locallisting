'use strict';

module.exports = /*@ngInject*/
  function listingController($scope) {
    $scope.welcome = 'This is the Listing';

    $scope.info = {
      title : "this is title",
      description : "this is description"
    };
  };
