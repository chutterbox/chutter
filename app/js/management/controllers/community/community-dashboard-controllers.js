(function() {
  var app;

  app = angular.module("ManagementApp");

  app.controller("communityDashboardCtrl", [
    "$scope", function($scope) {
      $scope.labels = ["today", "yesterday", "yesterday"];
      $scope.data = [[100, 200, 323, 435, 60, 70, 80, 90, 100], [100, 20, 323, 435, 60, 70, 8, 90, 100], [100, 200, 33, 435, 60, 70, 8, 90, 100]];
      $scope.series = ['Series A', 'Series B'];
      $scope.options = {
        pointDot: true,
        datasetStrokeWidth: 0.2
      };
      return $scope.onClick = function(points, evt) {
        return console.log(points, evt);
      };
    }
  ]);

}).call(this);
