app = angular.module("ModerationApp")

app.controller "communityCtrl", ["$scope", "Page", ($scope, Page) ->
  $scope.page = Page
  

]