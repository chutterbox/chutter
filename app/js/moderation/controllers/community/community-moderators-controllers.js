(function() {
  var app;

  app = angular.module("ModerationApp");

  app.controller("moderatorListCtrl", [
    "$scope", "Moderators", function($scope, Moderators) {
      return $scope.moderators = Moderators;
    }
  ]);

  app.controller("moderationRequestListCtrl", [
    "$scope", "ModerationRequests", function($scope, ModerationRequests) {
      return $scope.moderationRequests = ModerationRequests;
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

  app.controller("editModerationRequestCtrl", [
    "$scope", "CommunityResource", "$stateParams", "UserStats", "$state", function($scope, CommunityResource, $stateParams, UserStats, $state) {
      $scope.addModerator = function() {
        return CommunityResource.addModerator({
          id: $stateParams.id,
          user_id: $stateParams.user_id
        }).$promise.then(function(data) {
          console.log(data.status);
          return $state.transitionTo("home.community.moderators.edit", {
            id: $stateParams.id,
            user_id: $stateParams.user_id
          });
        });
      };
      return $scope.dismissModerationPositionRequest = function() {
        return CommunityResource.dismissModerationPositionRequest({
          id: $stateParams.id,
          user_id: $stateParams.user_id
        }).$promise.then(function(data) {
          return $state.transitionTo("^");
        });
      };
    }
  ]);

}).call(this);
