(function() {
  var app;

  app = angular.module("ModerationApp");

  app.controller("communityCtrl", [
    "$scope", "$stateParams", function($scope, $stateParams) {
      return $scope.community_slug = $stateParams.id;
    }
  ]);

}).call(this);
