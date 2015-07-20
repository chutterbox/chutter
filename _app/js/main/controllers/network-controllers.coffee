app = angular.module("MainApp")

app.controller "networkCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "$timeout", "Page", "Network", "Posts",( $scope, $state, $rootScope, $stateParams, $timeout, Page, Network, Posts) ->
  $scope.page = Page
  $scope.page.posts = Posts
]

app.controller "networkEditCtrl", ["$scope", "List", "NetworkSubscriptionResource", "Page", ($scope, List, NetworkSubscriptionResource, Page) ->
  $scope.page = Page
  $scope.networks = List
  $scope.toggle = (network) ->
    if network.selected
      NetworkSubscriptionResource.save({network_id: network.id}).$promise.then (data) -> 
        $scope.page.networkSubscriptions.length = 0
        $scope.page.networkSubscriptions = data
    else
      NetworkSubscriptionResource.delete({id: network.subscription_id}).$promise.then (data) ->
        $scope.page.networkSubscriptions.length = 0
        $scope.page.networkSubscriptions = data
]