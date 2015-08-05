(function() {
  var app;

  app = angular.module("ModerationApp", ["Chutter", "chart.js", "templates-moderation"]);

  app.config([
    "$mdThemingProvider", function($mdThemingProvider) {
      return $mdThemingProvider.theme('default').primaryPalette('indigo');
    }
  ]);

}).call(this);
