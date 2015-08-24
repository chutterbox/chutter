app = angular.module("ModerationApp")

app.controller "moderatorListCtrl", ["$scope", "Moderators", ($scope, Moderators) ->
  $scope.moderators = Moderators

]


app.controller "editModeratorCtrl", ["$scope", "Moderator", "CommunityResource", "$stateParams", ($scope, Moderator, CommunityResource, $stateParams) ->
  $scope.moderator = Moderator
  

  $scope.updateModerator = () ->
    CommunityResource.updateModerator({id: $stateParams.id, community_subscription: $scope.moderator.community_subscription})
]

