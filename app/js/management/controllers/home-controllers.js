(function() {
  var app;

  app = angular.module("ManagementApp");

  app.controller("homeCtrl", [
    "Page", "$rootScope", function(Page, $rootScope) {
      return $scope.page = Page;
    }
  ]);

}).call(this);
