(function() {
  var app;

  app = angular.module('MainApp');

  app.controller('themeCtrl', [
    '$scope', function($scope) {
      $scope.theme = "chutter";
      return $scope.switchTheme = function(themeName) {
        return $scope.theme = themeName;
      };
    }
  ]);

}).call(this);
