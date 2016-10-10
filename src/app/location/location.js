(function(angular) {
  var app = angular.module('xyz.brunofinger.location', []);

  app.service('locationService', [function() {
    return {
      getCurrentLocation: function() {
        var _then = null;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(geoposition) {
            if (_then) {
              _then({
                latitude: geoposition.coords.latitude,
                longitude: geoposition.coords.longitude
              });
            }
          });
        }

        return {
          then: function(resolveFn) {
            if (resolveFn) {
              _then = resolveFn;
            }
          }
        };
      },
    }
  }]);
})(window.angular);
