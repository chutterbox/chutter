(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("networkCtrl", [
    "$scope", "$state", "$rootScope", "$stateParams", "$timeout", "Page", function($scope, $state, $rootScope, $stateParams, $timeout, Page) {
      return $scope.page = Page;
    }
  ]);

  app.controller("networkEditCtrl", [
    "$scope", "$mdDialog", "List", "NetworkResource", "Page", function($scope, $mdDialog, List, NetworkResource, Page) {
      $scope.page = Page;
      $scope.allNetworks = List;
      $scope.hideDialog = function() {
        return $mdDialog.hide();
      };
      return $scope.toggle = function(network) {
        if (network.subscribed) {
          return NetworkResource.subscribe({
            id: network.slug
          }).$promise.then(function(data) {
            return $scope.networks = data;
          });
        } else {
          return NetworkResource.unsubscribe({
            id: network.slug
          }).$promise.then(function(data) {
            return $scope.networks = data;
          });
        }
      };
    }
  ]);

}).call(this);
