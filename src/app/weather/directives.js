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
          }).catch(function(error) {
            console.error(error);
          });
        };
        getWeatherForUserLocation();

        $scope.getWeatherforEntry = function(location) {
          locationService.geocode(location).then(function(location) {
            var coords = {
              latitude: location.data[0].lat,
              longitude: location.data[0].lon
            };
            currentWeatherService.getCurrentWeather(coords).then(function(weather) {
              $scope.weather = weather.data;
            });
          }).catch(function(error) {
            console.error(error);
          });
        }

        $scope.weather = null;
      }
    }
  }])
})(window.angular);
