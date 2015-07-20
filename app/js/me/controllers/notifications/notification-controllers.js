(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("postsCtrl", ["$scope", function($scope) {}]);

  app.controller("notificationsCtrl", [
    "$scope", "Notifications", function($scope, Notifications) {
      return $scope.notifiable_entities = Notifications;
    }
  ]);

}).call(this);
