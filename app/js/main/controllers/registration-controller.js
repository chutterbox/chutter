(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("registrationCtrl", [
    "$scope", function($scope) {
      return $scope.user = {
        username: "",
        email: ""
      };
    }
  ]);

}).call(this);
