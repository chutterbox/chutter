app = angular.module("ModerationApp")

app.controller "moderatorListCtrl", ["$scope", "Moderators", "ModerationRequests", ($scope, Moderators, ModerationRequests) ->
  $scope.moderators = Moderators
  $scope.moderationRequests = ModerationRequests

]


app.controller "editModeratorCtrl", ["$scope", "Moderator", "CommunityResource", "$stateParams", ($scope, Moderator, CommunityResource, $stateParams) ->
  $scope.moderator = Moderator
  

  $scope.updateModerator = () ->
    CommunityResource.updateModerator({id: $stateParams.id, community_subscription: $scope.moderator.community_subscription})
]

