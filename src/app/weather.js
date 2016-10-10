(function(angular) {
    var app = angular.module('xyz.brunofinger.weather', ['ngMaterial', 'ngRoute', 'pascalprecht.translate']);

    app.config(['$routeProvider', function($routeProvider) {
      // $routeProvider.otherwise({
      //   redirectTo: '/login'
      // });
    }]);

    app.config(['$translateProvider', function($translateProvider) {
      $translateProvider.preferredLanguage('en');
      $translateProvider.useSanitizeValueStrategy('escape');
      $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '/partials/{part}/translation/{lang}/strings.json'
      });
    }]);

})(window.angular);
