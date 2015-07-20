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
    "$scope", "List", "NetworkSubscriptionResource", "Page", function($scope, List, NetworkSubscriptionResource, Page) {
      $scope.page = Page;
      $scope.networks = List;
      return $scope.toggle = function(network) {
        if (network.selected) {
          return NetworkSubscriptionResource.save({
            network_id: network.id
          }).$promise.then(function(data) {
            $scope.page.networkSubscriptions.length = 0;
            return $scope.page.networkSubscriptions = data;
          });
        } else {
          return NetworkSubscriptionResource["delete"]({
            id: network.subscription_id
          }).$promise.then(function(data) {
            $scope.page.networkSubscriptions.length = 0;
            return $scope.page.networkSubscriptions = data;
          });
        }
      };
    }
  ]);

}).call(this);
