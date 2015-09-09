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
              $scope.closeSheet();
              return entityable.reported = true;
            } else {
              return $scope.closeSheet();
            }
          });
        }
      };
      return $scope.closeSheet = function() {
        return $mdBottomSheet.hide();
      };
    }
  ]);

  app.controller("commentsCtrl", [
    "$scope", "Comments", "Post", "Page", "$mdBottomSheet", "CommentResource", function($scope, Comments, Post, Page, $mdBottomSheet, CommentResource) {
      $scope.page = Page;
      $scope.page.post = Post;
      $scope.page.comments = Comments;
      $scope.resource = CommentResource;
      $scope.fetchMoreComments = function() {
        return console.log("hello");
      };
      return $scope.reply = function() {
        return $mdBottomSheet.show({
          templateUrl: '/partials/shared/comments/replyPanel.html',
          controller: "replyCtrl",
          disableParentScroll: true,
          preserveScope: true,
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };
    }
  ]);

  app.controller("replyCtrl", [
    "$scope", "Page", "CommentResource", "$mdBottomSheet", function($scope, Page, CommentResource, $mdBottomSheet) {
      $scope.page = Page;
      $scope.newComment = {
        post_id: $scope.page.post.id,
        parent_id: $scope.comment && $scope.comment.id ? $scope.comment.id : void 0,
        body: ""
      };
      return $scope.create = function() {
        return CommentResource.save({
          comment: $scope.newComment
        }).$promise.then(function(newCreatedComment) {
          $mdBottomSheet.hide();
          newCreatedComment.username = newCreatedComment.user.username;
          if ($scope.comment && $scope.comment.id) {
            return $scope.comment.children.unshift(newCreatedComment);
          } else {
            return $scope.page.comments.unshift(newCreatedComment);
          }
        });
      };
    }
  ]);

  app.controller("postsCtrl", [
    "$scope", "Page", "Posts", function($scope, Page, Posts) {
      $scope.page = Page;
      $scope.page.posts = Posts;
      return $scope.fetchMorePosts = function() {};
    }
  ]);

  app.controller("subscriptionDialogCtrl", ["$scope", function($scope) {}]);

}).call(this);
