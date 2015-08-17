(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("savedCtrl", [
    "$scope", "PostResource", "Page", function($scope, PostResource, Page) {
      return $scope.page = Page;
    }
  ]);

}).call(this);
