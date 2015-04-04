'use strict';

module.exports = /*@ngInject*/
  function ListingService($http) {
    return { 
      all : function(){
        return $http.get('http://localhost:2233/api/listings');
      }};
  };
