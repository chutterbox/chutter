app = angular.module("MainApp")

app.controller "communityEditCtrl", ["$scope", "$mdDialog", "List", "Page", "CommunitySubscriptionResource", ($scope, $mdDialog, List,  Page, CommunitySubscriptionResource) ->
  $scope.communities = List
  $scope.hideDialog = () ->
    $mdDialog.hide()
  $scope.toggle = (community) ->
    if community.selected
      CommunitySubscriptionResource.save({community_id: community.id}).$promise.then (data) -> 
        # $scope.page.communitySubscriptions.length = 0
        # $scope.page.communitySubscriptions = data
    else
      CommunitySubscriptionResource.delete({id: community.subscription_id}).$promise.then (data) ->
        # $scope.page.networkSubscriptions.length = 0
        # $scope.page.networkSubscriptions = data

]

app.controller "communityCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "Page", "Posts",( $scope, $state, $rootScope, $stateParams, Page, Posts) ->
  $scope.page = Page
  $scope.page.posts = Posts

]

app.controller "communityPanelCtrl", ["$scope", "$mdBottomSheet", "Page", ($scope, $mdBottomSheet, Page) ->
  $scope.page = Page 
  $scope.close = () ->
    $mdBottomSheet.hide();
]