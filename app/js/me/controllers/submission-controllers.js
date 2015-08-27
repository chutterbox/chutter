(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("submissionsCtrl", [
    "$scope", "Page", function($scope, Page) {
      return $scope.page = Page;
    }
  ]);

}).call(this);
