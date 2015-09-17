(function() {
  'use strict';
  var app;

  app = angular.module("Chutter");

  app.controller("commentsPageCtrl", [
    "$scope", "Comments", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", function($scope, Comments, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer) {
      $scope.fetchMoreComments = function() {};
      this.reply = function() {
        return $mdBottomSheet.show({
          templateUrl: '/partials/shared/comments/replyPanel.html',
          controller: "replyCtrl",
          disableParentScroll: true,
          preserveScope: true,
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };
      this.page = Page;
      this.post = Post;
      this.postService = PostService;
      this.comments = Comments;
      this.resource = CommentResource;
      this.mediaPlayer = MediaPlayer;
      return this;
    }
  ]);

}).call(this);
