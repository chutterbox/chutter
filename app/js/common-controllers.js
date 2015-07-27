(function() {
  'use strict';
  var app;

  app = angular.module("Chutter");

  app.controller("createCommunityRuleCtrl", [
    "$scope", "$mdDialog", function($scope, $mdDialog) {
      $scope.selectedAppliesTo = "";
      $scope.selectedSeverity = "";
      $scope.setSelectedAppliesTo = function(value) {
        $scope.newRule[$scope.selectedAppliesTo] = false;
        return $scope.selectedAppliesTo = value;
      };
      $scope.setSelectedSeverity = function(value) {
        $scope.newRule[$scope.selectedSeverity] = false;
        return $scope.selectedSeverity = value;
      };
      $scope.submit;
      $scope.saveRule = function() {
        return $mdDialog.hide();
      };
      return $scope.cancelSave = function() {
        $scope.$emit("cancelSave");
        return $mdDialog.hide();
      };
    }
  ]);

  app.controller("modSheetCtrl", [
    "$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", function($scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) {
      if (entityableType === "post") {
        $scope.entityable_post = entityable;
      }
      if (entityableType === "comment") {
        $scope.entityable_comment = entityable;
      }
      $scope.entityable = entityable;
      $scope.activityLogEntry = new ActivityLogEntry;
      $scope.post = $scope.entityable_post;
      CommunityResource.rules({
        id: $scope.entityable.community_slug
      }).$promise.then(function(data) {
        return $scope.community_rules = data;
      });
      $scope.activityLogEntry.id = $scope.entityable.id;
      $scope.submitEntityableForm = function() {
        if (entityableType === "post") {
          return PostResource["delete"]($scope.activityLogEntry);
        }
      };
      return $scope.submitUserForm = function() {
        if (entityableType === "post") {
          return PostResource.ban($scope.activityLogEntry);
        }
      };
    }
  ]);

}).call(this);
