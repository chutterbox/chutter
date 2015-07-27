(function() {
  var app;

  app = angular.module("ModerationApp");

  app.controller("rulesCtrl", [
    "$scope", "communityRules", function($scope, communityRules) {
      return $scope.communityRules = communityRules;
    }
  ]);

}).call(this);
