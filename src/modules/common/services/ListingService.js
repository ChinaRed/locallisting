'use strict';

module.exports = /*@ngInject*/
  function ListingService($http) {
    return { 
      all : function(){
        return $http.get('http://localhost:2233/api/listings');
      },
      allLang: function(lang){
        return $http.get('http://localhost:2233/api/listings/lang/' + lang);
      },
      allCategory: function(category){
        return $http.get('http://localhost:2233/api/listings/category/' + category);
      },
      get : function(listing_id){
        return $http.get('http://localhost:2233/api/listings/' + listing_id);
      }
    };
  };
