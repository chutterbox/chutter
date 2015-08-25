app = angular.module("MeApp")
app.controller "statsCtrl", ["$scope", "Stats", ($scope, Stats) ->
  $scope.stats = Stats
  console.log typeof $scope.stats
  # $scope.labels = ["today", "yesterday", "yesterday"]
  _.map $scope.stats, (obj) ->
    console.log obj
    _.mapObject obj, (value, key) ->
      $scope[key] = {}
      $scope[key].labels = _.keys(value)
      $scope[key].data = _.values(value)
  
    # $scope[stat] = stat

  # console.log $scope.submission_distribution



  $scope.onClick = (points, evt) ->
    console.log(points, evt)




]
