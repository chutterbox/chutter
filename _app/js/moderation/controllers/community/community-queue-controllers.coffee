app = angular.module("ModerationApp")

app.controller "queueListCtrl", ["$scope", "ReportedItems", ($scope, ReportedItems) ->
  $scope.reportedItems = ReportedItems

]