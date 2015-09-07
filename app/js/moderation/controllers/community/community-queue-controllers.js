(function() {
  var app;

  app = angular.module("ModerationApp");

  app.controller("queueListCtrl", [
    "$scope", "ReportedItems", function($scope, ReportedItems) {
      return $scope.reportedItems = ReportedItems;
    }
  ]);

}).call(this);
