(function(angular) {
  var app = angular.module('xyz.brunofinger.location', []);

  app.service('locationService', ['$timeout', 'openstreetmapAPI', function($timeout, openstreetmapAPI) {
    return {
      geocode: function(location) {
        return openstreetmapAPI.geocodeLocation(location);
      },
      getCurrentLocation: function() {
        var _then = null;
        var _catch = null;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(geoposition) {
            if (_then) {
              _then({
                latitude: geoposition.coords.latitude,
                longitude: geoposition.coords.longitude
              });
            }
          }, function(error) {
            if(_catch) {
              _catch(error);
            }
          });
        } else {
          $timeout(function() {
            if(_catch) {
              _catch({});
            }
          }, 100);
        }

        return {
          then: function(resolveFn) {
            if (resolveFn) {
              _then = resolveFn;
            }
            return this;
          },
          catch: function(resolveFn) {
            if (resolveFn) {
              _catch = resolveFn;
            }
            return this;
          }
        };
      },
    }
  }]);
})(window.angular);
