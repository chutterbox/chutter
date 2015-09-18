app = angular.module("MainApp")

app.controller "registrationCtrl", ["$scope", ($scope) ->
  $scope.user =
    username: ""
    email: ""
]