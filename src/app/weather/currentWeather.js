(function(angular) {
  var app = angular.module('xyz.brunofinger.weather');

  app.service('currentWeatherService', ['openweathermapAPI', function(openweathermapAPI) {
    return {
      getCurrentWeather: function(location) {
        return openweathermapAPI.getCurrentWeather(location);
      }
    };
  }]);

})(window.angular);
