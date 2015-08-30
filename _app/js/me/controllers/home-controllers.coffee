app = angular.module("MeApp")
app.controller "homeCtrl", ["$scope", "$state", ($scope, $state) ->
  $scope.state = $state

]
