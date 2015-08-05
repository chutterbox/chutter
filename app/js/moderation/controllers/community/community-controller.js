(function() {
  var app;

  app = angular.module("ModerationApp");

  app.controller("communityCtrl", [
    "$scope", "Page", function($scope, Page) {
      return $scope.page = Page;
    }
  ]);

}).call(this);
