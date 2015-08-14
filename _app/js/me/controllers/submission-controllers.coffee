app = angular.module("MeApp")
app.controller "submissionsCtrl", ["$scope", "Page", ($scope, Page) ->
  $scope.page = Page
  console.log $scope.page.posts


]
