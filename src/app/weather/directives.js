(function(angular) {
  var app = angular.module('xyz.brunofinger.weather');

  app.directive('bfWeatherWidget', ['locationService', 'currentWeatherService',
    function(locationService, currentWeatherService) {
    return {
      templateUrl: '/partials/weather/weather-widget.tmpl.html',
      link: function($scope, el) {
        var getWeatherForUserLocation = function() {
          locationService.getCurrentLocation().then(function(location) {
            currentWeatherService.getCurrentWeather(location).then(function(weather) {
              $scope.weather = weather.data;
            });
          });
        };
        getWeatherForUserLocation();

        $scope.weather = null;
      }
    }
  }])
})(window.angular);
