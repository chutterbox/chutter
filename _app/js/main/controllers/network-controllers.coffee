app = angular.module("MainApp")

app.controller "networkCtrl", ["$scope", "$state", "$rootScope", "$stateParams", "$timeout", "Page", ( $scope, $state, $rootScope, $stateParams, $timeout, Page) ->
  $scope.page = Page
]

app.controller "networkEditCtrl", ["$scope", "$mdDialog", "List", "NetworkResource", "Page", ($scope, $mdDialog, List, NetworkResource, Page) ->
  $scope.page = Page
  $scope.allNetworks = List
  $scope.hideDialog = () ->
    $mdDialog.hide()
  $scope.toggle = (network) ->
    if network.subscribed
      NetworkResource.subscribe({id: network.slug}).$promise.then (data) -> 
        $scope.networks = data
    else
      NetworkResource.unsubscribe({id: network.slug}).$promise.then (data) ->
        $scope.networks = data
]