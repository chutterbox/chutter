(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("notificationListCtrl", [
    "$scope", "Page", function($scope, Page) {
      return $scope.page = Page;
    }
  ]);

  app.controller("notificationsCtrl", [
    "Page", "$scope", "Notifications", function(Page, $scope, Notifications) {
      $scope.notifications = Notifications;
      return $scope.page = Page;
    }
  ]);

}).call(this);
