(function(angular) {
  var app = angular.module('xyz.brunofinger.weather');

  app.service('openweathermapAPI', ['$http', function($http) {
    var apiKey = 'd1d39a1b13ec648f6c19bff9412b54ff';

    return {
      getCurrentWeather: function(location) {
        return $http({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather',
          params: {
            lat: location.latitude,
            lon: location.longitude,
            units: 'metric',
            APPID: apiKey
          }
        });
      }
    }
  }]);
})(window.angular);
