(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("submissionsCtrl", [
    "$scope", "Page", function($scope, Page) {
      $scope.page = Page;
      return console.log($scope.page.posts);
    }
  ]);

}).call(this);
