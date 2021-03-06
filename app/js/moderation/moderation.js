(function() {
  var app;

  app = angular.module("ModerationApp", ["Chutter", "chart.js", "md.data.table", "templates-moderation"]);

  app.config([
    "$mdThemingProvider", function($mdThemingProvider) {
      return $mdThemingProvider.theme('default').primaryPalette('indigo');
    }
  ]);

}).call(this);
