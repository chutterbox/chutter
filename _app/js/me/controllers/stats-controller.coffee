app = angular.module("MeApp")
app.controller "statsCtrl", ["$scope", "Stats", ($scope, Stats) ->
  $scope.stats = Stats
  console.log typeof $scope.stats
  # $scope.labels = ["today", "yesterday", "yesterday"]
  _.map $scope.stats, (obj) ->
    _.mapObject obj, (value, key) ->
      $scope[key] = {}
      $scope[key].labels = _.keys(value)
      $scope[key].data = _.values(value)

  $scope.point_distribution.data = [$scope.point_distribution.data]

  $scope.chartOptions = {
    responsive: true,
    maintainAspectRatio: true
  }

  $scope.onClick = (points, evt) ->
    console.log(points, evt)




]
