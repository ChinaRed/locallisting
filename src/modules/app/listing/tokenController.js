'use strict';

module.exports =
 function tokenController ($scope, $stateParams, $state, $http){
    localStorage.auth_token = $stateParams.token;
    $http({
      method: 'POST',
      // url: 'https://sandbox-api.uber.com/v1/requests',
      url: 'http://localhost:2233/api/calluber',
      // headers: {
      //   'Authorization' : 'Bearer ' + localStorage.auth_token
      // },
      data: {
        auth_token: localStorage.auth_token,
        locationId: localStorage.locationId
        // start_latitude : 21.292384,
        // start_longitude : -157.8528565,
        // end_latitude : 21.2935356,
        // end_longitude : -157.8451808,
        // product_id : '18c45a2d-a7bc-44b3-900d-ccf1f6b77729'
      }
    })
    .then(function successCallback (res) {
      console.log('success', res);
      $scope.data = res.data;
    });
  };

 