(function () {
  'use strict';

  angular.module('sunrise', ['sunrise.MainCtrl'])
    .config(['$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
        $locationProvider.html5Mode(true);
      }]);
}());