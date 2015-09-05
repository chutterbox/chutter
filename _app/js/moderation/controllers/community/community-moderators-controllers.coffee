app = angular.module("ModerationApp")

app.controller "moderatorListCtrl", ["$scope", "Moderators", ($scope, Moderators) ->
  $scope.moderators = Moderators

]
app.controller "moderationRequestListCtrl", ["$scope", "ModerationRequests", ($scope, ModerationRequests) ->
  $scope.moderationRequests = ModerationRequests

]

app.controller "editModeratorCtrl", ["$scope", "Moderator", "CommunityResource", "$stateParams", ($scope, Moderator, CommunityResource, $stateParams) ->
  $scope.moderator = Moderator
  $scope.updateModerator = () ->
    CommunityResource.updateModerator({id: $stateParams.id, community_subscription: $scope.moderator.community_subscription})
]

app.controller "editModerationRequestCtrl", ["$scope", "CommunityResource", "$stateParams", "UserStats", "$state", ($scope, CommunityResource, $stateParams, UserStats, $state) ->
  $scope.addModerator = () ->
    CommunityResource.addModerator({id: $stateParams.id, user_id: $stateParams.user_id}).$promise.then (data) ->
      console.log data.status
      $state.transitionTo("home.community.moderators.edit", {id: $stateParams.id, user_id: $stateParams.user_id})
  
  $scope.dismissModerationPositionRequest = () ->
    CommunityResource.dismissModerationPositionRequest({id: $stateParams.id, user_id: $stateParams.user_id}).$promise.then (data) ->
      $state.transitionTo("^")

]