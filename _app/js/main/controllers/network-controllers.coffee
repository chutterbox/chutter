app = angular.module("MainApp")

app.controller "networkCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "$timeout", "Page", "Network", "Posts",( $scope, $state, $rootScope, $stateParams, $timeout, Page, Network, Posts) ->
  $scope.page = Page
  $scope.page.posts = Posts
]

app.controller "networkEditCtrl", ["$scope", "$mdDialog", "List", "NetworkResource", "Page", ($scope, $mdDialog, List, NetworkResource, Page) ->
  $scope.page = Page
  $scope.networks = List
  $scope.hideDialog = () ->
    $mdDialog.hide()
  $scope.toggle = (network) ->
    if network.selected
      NetworkResource.subscribe({id: network.slug}).$promise.then (data) -> 
        $scope.page.networkSubscriptions.length = 0
        $scope.page.networkSubscriptions = data
    else
      NetworkResource.unsubscribe({id: network.slug}).$promise.then (data) ->
        $scope.page.networkSubscriptions.length = 0
        $scope.page.networkSubscriptions = data
]