(function() {
  'use strict';
  var app;

  app = angular.module('MainApp', ["Chutter", "templates-main"]);

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
      return $mdThemingProvider.theme('moderator').primaryPalette('indigo');
    }
  ]);

}).call(this);
