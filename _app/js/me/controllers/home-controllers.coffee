app = angular.module("MeApp")
app.controller "homeCtrl", ["$scope", "$state", "Page", "$rootScope", ($scope, $state, Page, $rootScope) ->
  $scope.page  = Page
  $rootScope.$state = $state
]
