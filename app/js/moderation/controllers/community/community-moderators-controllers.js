(function() {
  var app;

  app = angular.module("ModerationApp");

  app.controller("moderatorListCtrl", [
    "$scope", "Moderators", function($scope, Moderators) {
      return $scope.moderators = Moderators;
    }
  ]);

  app.controller("editModeratorCtrl", [
    "$scope", "Moderator", "CommunityResource", "$stateParams", function($scope, Moderator, CommunityResource, $stateParams) {
      $scope.moderator = Moderator;
      return $scope.updateModerator = function() {
        return CommunityResource.updateModerator({
          id: $stateParams.id,
          community_subscription: $scope.moderator.community_subscription
        });
      };
    }
  ]);

}).call(this);
