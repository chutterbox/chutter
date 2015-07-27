app = angular.module("ModerationApp")

app.controller "communityCtrl", ["$scope", "$stateParams", ($scope, $stateParams) ->
  $scope.community_slug = $stateParams.id

  

]