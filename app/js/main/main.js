(function() {
  'use strict';
  var app;

  app = angular.module('MainApp', ["Chutter"]);

  $(document).ready(function() {
    return setTimeout(function() {
      return $("menu-toggle > a").on("click", function(event) {
        console.log(event);
        if (event.screenX < 53) {
          return event.preventDefault();
        }
      });
    }, 2000);
  });

  app.config([
    "$httpProvider", "$mdThemingProvider", function($httpProvider, $mdThemingProvider) {
      $mdThemingProvider.theme('default').primaryPalette('light-blue');
      $mdThemingProvider.theme('moderator').primaryPalette('indigo');
      return $httpProvider.interceptors.push([
        "$q", '$injector', '$rootScope', function($q, $injector, $rootScope) {
          return {
            responseError: function(rejection) {
              if (rejection.status === 401) {
                return $rootScope.$broadcast("auth:show-signin");
              }
            }
          };
        }
      ]);
    }
  ]);

}).call(this);
