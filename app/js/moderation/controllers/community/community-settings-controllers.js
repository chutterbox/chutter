(function() {
  var app;

  app = angular.module("ModerationApp");

  app.controller("communitySettingsCtrl", [
    "$scope", "Page", "CommunityResource", function($scope, Page, CommunityResource) {
      $scope.page = Page;
      return $scope.update = function() {
        return CommunityResource.update({
          id: $scope.page.community.id,
          community: $scope.page.community
        });
      };
    }
  ]);

}).call(this);
