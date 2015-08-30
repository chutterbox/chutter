app = angular.module("ManagementApp")

app.controller "homeCtrl", ["Page", "$rootScope", (Page, $rootScope) ->
  $scope.page = Page
]