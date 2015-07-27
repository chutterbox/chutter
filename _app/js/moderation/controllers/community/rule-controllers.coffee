app = angular.module("ModerationApp")

app.controller "rulesCtrl", ["$scope", "communityRules", ($scope, communityRules) ->
  $scope.communityRules = communityRules  

]