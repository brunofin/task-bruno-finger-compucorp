(function(angular) {
    var app = angular.module('xyz.brunofinger.weather', [
      'ngMaterial',
      'ngRoute',
      'pascalprecht.translate',
      'xyz.brunofinger.location'
    ]);

    app.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/weather', {
        templateUrl: 'partials/weather/weather.html'
      }).otherwise({
        redirectTo: '/weather'
      });
    }]);

    app.config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
      $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    }]);

    app.config(['$translateProvider', function($translateProvider) {
      $translateProvider.preferredLanguage('en');
      $translateProvider.useSanitizeValueStrategy('escape');
      $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '/translation/{part}/{lang}/strings.json'
      });
    }]);

})(window.angular);
