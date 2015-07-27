app = angular.module("ModerationApp")

app.controller "communityDashboardCtrl", ["$scope", ($scope) ->
  $scope.labels = ["today", "yesterday", "yesterday"]
  $scope.data   = [
    [100,200,323,435,60,70,80,90,100],
    [100,20,323,435,60,70,8,90,100],
    [100,200,33,435,60,70,8,90,100],
  ]
  $scope.series = ['Series A', 'Series B']
  $scope.options =
    pointDot: true
    datasetStrokeWidth: 0.2
  $scope.onClick = (points, evt) ->
    console.log(points, evt)

  

]