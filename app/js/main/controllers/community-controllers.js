(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("communityEditCtrl", [
    "$scope", "$mdDialog", "List", "Page", "CommunityResource", function($scope, $mdDialog, List, Page, CommunityResource) {
      $scope.communities = List;
      $scope.hideDialog = function() {
        return $mdDialog.hide();
      };
      return $scope.toggle = function(community) {
        if (community.subscribed) {
          return CommunityResource.subscribe({
            id: community.slug
          }).$promise.then(function(data) {});
        } else {
          return CommunityResource.unsubscribe({
            id: community.slug
          }).$promise.then(function(data) {});
        }
      };
    }
  ]);

  app.controller("communityCtrl", [
    "$scope", "$state", "$rootScope", "$stateParams", "Page", "Posts", function($scope, $state, $rootScope, $stateParams, Page, Posts) {
      $scope.page = Page;
      $scope.page.posts.length = 0;
      return $scope.page.posts = Posts;
    }
  ]);

  app.controller("communityPanelCtrl", [
    "$scope", "$mdBottomSheet", "Page", function($scope, $mdBottomSheet, Page) {
      $scope.page = Page;
      return $scope.close = function() {
        return $mdBottomSheet.hide();
      };
    }
  ]);

}).call(this);
