app = angular.module("ModerationApp")

app.controller "communitySettingsCtrl", ["$scope", "Page", "CommunityResource", ($scope, Page, CommunityResource) ->
  $scope.page = Page

  $scope.update = () ->
    CommunityResource.update({id: $scope.page.community.id, community: $scope.page.community})
]