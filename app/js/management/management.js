(function() {
  var app;

  app = angular.module("ManagementApp", ["Chutter", "chart.js"]);

  app.config([
    "$mdThemingProvider", function($mdThemingProvider) {
      return $mdThemingProvider.theme('default').primaryPalette('red');
    }
  ]);

}).call(this);
