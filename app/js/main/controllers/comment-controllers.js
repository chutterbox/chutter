(function() {
  var app;

  app = angular.module("MainApp");

  app.controller("commentsCtrl", [
    "$scope", "Comments", "Post", "Page", "$mdBottomSheet", "CommentResource", function($scope, Comments, Post, Page, $mdBottomSheet, CommentResource) {
      $scope.page = Page;
      $scope.page.post = Post;
      $scope.page.comments = Comments;
      $scope.resource = CommentResource;
      return $scope.reply = function() {
        return $mdBottomSheet.show({
          templateUrl: '/partials/main/comments/replyPanel.html',
          controller: "replyCtrl",
          disableParentScroll: true,
          preserveScope: true,
          parent: "#content",
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

}).call(this);
