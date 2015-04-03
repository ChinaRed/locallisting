'use strict';

module.exports = /*@ngInject*/
  function ListingService($http) {
    return $http.get('http://localhost:2233/api/listings');
  };
