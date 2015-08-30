(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("homeCtrl", [
    "$scope", "$state", "Page", "$rootScope", function($scope, $state, Page, $rootScope) {
      $scope.page = Page;
      return $rootScope.$state = $state;
    }
  ]);

}).call(this);
