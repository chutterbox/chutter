app = angular.module("MeApp")
app.controller "savedCtrl", ["$scope", "PostResource", "Page", ($scope, PostResource, Page) ->
  $scope.page = Page
]