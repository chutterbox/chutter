(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("communityEditCtrl", [
    "$scope", "List", "Page", "CommunitySubscriptionResource", function($scope, List, Page, CommunitySubscriptionResource) {
      $scope.communities = List;
      return $scope.toggle = function(community) {
        if (community.selected) {
          return CommunitySubscriptionResource.save({
            community_id: community.id
          }).$promise.then(function(data) {});
        } else {
          return CommunitySubscriptionResource["delete"]({
            id: community.subscription_id
          }).$promise.then(function(data) {});
        }
      };
    }
  ]);

  app.controller("communityCtrl", [
    "$scope", "$state", "$rootScope", "$stateParams", "Page", "Posts", function($scope, $state, $rootScope, $stateParams, Page, Posts) {
      $scope.page = Page;
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
