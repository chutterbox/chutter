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

  app.controller("communityPanelCtrl", [
    "$scope", "$mdBottomSheet", "Page", function($scope, $mdBottomSheet, Page) {
      return $scope.close = function() {
        return $mdBottomSheet.hide();
      };
    }
  ]);

}).call(this);
