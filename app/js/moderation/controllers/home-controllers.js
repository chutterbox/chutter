(function() {
  var app;

  app = angular.module("ModerationApp");

  app.controller("homeCtrl", [
    "$scope", "Communities", function($scope, Communities) {
      return $scope.communities = Communities;
    }
  ]);

}).call(this);
