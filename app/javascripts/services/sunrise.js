(function () {
  'use strict';

  angular.module('sunrise.SunriseService', [])
    .factory('SunriseService', ['$http',
      function ($http) {
        return {
          get: function (latitude, longitude, callback) {
            $http.get('/api/sunrise?latitude=' + latitude + '&longitude=' + longitude).success(function (data) {
              callback(data);
            });
          }
        };
      }
    ]);
})();