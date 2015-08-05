(function() {
  var app;

  app = angular.module("ModerationApp");

  app.controller("homeCtrl", [
    "$scope", "Communities", "Page", function($scope, Communities, Page) {
      $scope.communities = Communities;
      return $scope.page = Page;
    }
  ]);

}).call(this);
