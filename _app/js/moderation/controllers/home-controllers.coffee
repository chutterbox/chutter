app = angular.module("ModerationApp")

app.controller "homeCtrl", ["$scope", "Communities", ($scope, Communities) ->
  $scope.communities = Communities
]  
