(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("networkCtrl", [
    "$scope", "$state", "$rootScope", "$stateParams", "$timeout", "Page", "Network", "Posts", function($scope, $state, $rootScope, $stateParams, $timeout, Page, Network, Posts) {
      $scope.page = Page;
      return $scope.page.posts = Posts;
    }
  ]);

  app.controller("networkEditCtrl", [
    "$scope", "$mdDialog", "List", "NetworkResource", "Page", function($scope, $mdDialog, List, NetworkResource, Page) {
      $scope.page = Page;
      $scope.networks = List;
      $scope.hideDialog = function() {
        return $mdDialog.hide();
      };
      return $scope.toggle = function(network) {
        if (network.subscribed) {
          return NetworkResource.subscribe({
            id: network.slug
          }).$promise.then(function(data) {
            return $scope.page.networks = data;
          });
        } else {
          return NetworkResource.unsubscribe({
            id: network.slug
          }).$promise.then(function(data) {
            return $scope.page.networks = data;
          });
        }
      };
    }
  ]);

}).call(this);
