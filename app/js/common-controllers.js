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
    "$mdBottomSheet", "$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", function($mdBottomSheet, $scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) {
      if (entityableType === "post") {
        $scope.post = entityable;
      }
      if (entityableType === "comment") {
        $scope.comment = entityable;
      }
      $scope.entityable = entityable;
      $scope.activityLogEntry = new ActivityLogEntry;
      CommunityResource.reportableRules({
        id: $scope.entityable.community_slug
      }).$promise.then(function(data) {
        return $scope.communityRules = _.filter(data, function(rule) {
          return rule.sitewide || rule.posts;
        });
      });
      $scope.activityLogEntry.id = $scope.entityable.id;
      $scope.submitEntityableForm = function() {
        if (entityableType === "post") {
          return PostResource["delete"]($scope.activityLogEntry).$promise.then(function(data) {
            if (data.status === 200) {
              return $scope.closeSheet();
            } else {
              return $scope.closeSheet();
            }
          });
        }
      };
      $scope.submitUserForm = function() {
        if (entityableType === "post") {
          return PostResource.ban($scope.activityLogEntry);
        }
      };
      return $scope.closeModSheet = function() {
        return $mdBottomSheet.hide();
      };
    }
  ]);

  app.controller("reportSheetCtrl", [
    "$mdBottomSheet", "$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", function($mdBottomSheet, $scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) {
      if (entityableType === "post") {
        $scope.post = entityable;
      }
      if (entityableType === "comment") {
        $scope.comment = entityable;
      }
      $scope.entityable = entityable;
      CommunityResource.reportableRules({
        id: $scope.entityable.community_slug
      }).$promise.then(function(data) {
        return $scope.communityRules = _.filter(data, function(rule) {
          return rule.sitewide || rule.posts;
        });
      });
      $scope.activityLogEntry = new ActivityLogEntry;
      $scope.activityLogEntry.id = $scope.entityable.id;
      $scope.submitEntityableForm = function() {
        if (entityableType === "post") {
          return PostResource.report($scope.activityLogEntry).$promise.then(function(data) {
            if (data.status === 200) {
              $scope.closeSheet(true);
              return entityable.reported = true;
            } else {
              return $scope.closeSheet(false);
            }
          });
        }
      };
      return $scope.closeSheet = function(reported) {
        return $mdBottomSheet.hide(reported);
      };
    }
  ]);

  app.controller("replyCtrl", [
    "$scope", "CommentResource", "$mdBottomSheet", "parent", "post", function($scope, CommentResource, $mdBottomSheet, parent, post) {
      $scope.newComment = {
        post_id: post.id,
        parent_id: parent && parent.id ? parent.id : void 0,
        body: ""
      };
      return $scope.create = function() {
        return CommentResource.save({
          comment: $scope.newComment
        }).$promise.then(function(newCreatedComment) {
          $mdBottomSheet.hide();
          newCreatedComment.username = newCreatedComment.user.username;
          if (parent && parent.id) {
            return parent.children.unshift(newCreatedComment);
          } else {
            return post.comments.unshift(newCreatedComment);
          }
        });
      };
    }
  ]);

  app.controller("subscriptionDialogCtrl", ["$scope", function($scope) {}]);

}).call(this);
