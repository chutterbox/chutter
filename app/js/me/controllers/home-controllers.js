(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("homeCtrl", [
    "$scope", "$state", function($scope, $state) {
      return $scope.state = $state;
    }
  ]);

}).call(this);
