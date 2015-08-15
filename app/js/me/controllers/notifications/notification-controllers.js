(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("notificationListCtrl", [
    "$scope", "Notifications", function($scope, Notifications) {
      return $scope.subscribedNotifications = Notifications;
    }
  ]);

}).call(this);
