(function () {
  'use strict';

  angular.module('sunrise').filter('moment', function () {
    return function (dateString, format) {
      return moment(dateString).format(format);
    };
  });
}());