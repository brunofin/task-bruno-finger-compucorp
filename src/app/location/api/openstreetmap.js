(function(angular) {
  var app = angular.module('xyz.brunofinger.location');

  app.service('openstreetmapAPI', ['$http', function($http) {
    return {
      geocodeLocation: function(location) {
        return $http({
          method: 'GET',
          url: 'http://nominatim.openstreetmap.org/search',
          params: {
            q: location,
            format: 'json'
          }
        });
      }
    }
  }]);
})(window.angular);
