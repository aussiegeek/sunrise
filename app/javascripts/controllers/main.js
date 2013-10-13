(function () {

  'use strict';

  angular.module('sunrise.MainCtrl', ['sunrise.SunriseService'])
    .controller('MainCtrl', function ($scope, SunriseService) {

      $scope.$watch("coords", function (coords) {
        if (coords) {
          SunriseService.get(coords.latitude, coords.longitude, function (sunrise) {
            $scope.sunrise = sunrise;
            console.log(sunrise);
          });
        }
      });

      $scope.coords = {latitude: 43.7000, longitude: 79.4000};

      navigator.geolocation.getCurrentPosition(function (position) {
        $scope.coords = position.coords;
        $scope.$apply();
      }, function (code, message) {
        console.log("failure");
        console.log(code);
        console.log(message);
      }, {timeout: 10000});
    }
  );
}());