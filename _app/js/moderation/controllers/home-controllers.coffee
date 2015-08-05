app = angular.module("ModerationApp")

app.controller "homeCtrl", ["$scope", "Communities", "Page", ($scope, Communities, Page) ->
  $scope.communities = Communities
  $scope.page = Page
]  
