app = angular.module("MainApp")

app.controller "communityEditCtrl", ["$scope", "$mdDialog", "List", "Page", "CommunityResource", ($scope, $mdDialog, List,  Page, CommunityResource) ->
  $scope.communities = List
  $scope.hideDialog = () ->
    $mdDialog.hide()
  $scope.toggle = (community) ->
    if community.subscribed
      CommunityResource.subscribe({id: community.slug}).$promise.then (data) -> 
        # $scope.page.communitySubscriptions.length = 0
        # $scope.page.communitySubscriptions = data
    else
      CommunityResource.unsubscribe({id: community.slug}).$promise.then (data) ->
        # $scope.page.networkSubscriptions.length = 0
        # $scope.page.networkSubscriptions = data

]

app.controller "communityPanelCtrl", ["$scope", "$mdBottomSheet", "Page", ($scope, $mdBottomSheet, Page) ->
  $scope.close = () ->
    $mdBottomSheet.hide();
]