(function() {
  'use strict';
  var app;

  app = angular.module("Chutter");

  app.controller("commentsPageCtrl", [
    "$scope", "Comments", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", function($scope, Comments, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer) {
      $scope.fetchMoreComments = function() {};
      this.page = Page;
      this.post = Post;
      this.postService = PostService;
      this.comments = Comments;
      this.resource = CommentResource;
      this.mediaPlayer = MediaPlayer;
      return this;
    }
  ]);

  app.controller("commentListCtrl", [
    "$scope", "$mdBottomSheet", "CommentResource", "MediaPlayer", "$rootScope", function($scope, $mdBottomSheet, CommentResource, MediaPlayer, $rootScope) {
      this.post = $scope.ctrl.post;
      this.comments = $scope.ctrl.comments;
      this.user = $rootScope.user;
      this.resource = CommentResource;
      this.mediaPlayer = MediaPlayer;
      this.reply = function(parentComment) {
        console.log(parent);
        return $mdBottomSheet.show({
          templateUrl: '/partials/shared/comments/replyPanel.html',
          controller: "replyCtrl",
          disableParentScroll: true,
          locals: {
            post: this.post,
            parentComment: parentComment,
            comments: this.comments
          },
          preserveScope: true,
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };
      this.edit = function(comment) {
        return $mdBottomSheet.show({
          templateUrl: '/partials/shared/comments/editPanel.html',
          disableParentScroll: true,
          locals: {
            comment: comment
          },
          preserveScope: true,
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };
      this.updateVote = function(comment, vote) {
        if (comment.vote === vote) {
          vote = 0;
        }
        comment.vote = vote;
        return CommentResource.vote({
          id: comment.id,
          vote: vote
        });
      };
      return this;
    }
  ]);

}).call(this);
