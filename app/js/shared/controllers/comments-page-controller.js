(function() {
  'use strict';
  var app;

  app = angular.module("Chutter");

  app.controller("commentsPageCtrl", [
    "$scope", "Comments", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", "$stateParams", function($scope, Comments, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer, $stateParams) {
      this.page = Page;
      this.post = Post;
      if ($stateParams.network) {
        this.applicationSectionNamespace = "network_frontpage";
      } else {
        this.applicationSectionNamespace = "frontpage";
      }
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
      this.children = function(comment) {
        comment.loadingChildren = true;
        return CommentResource.children({
          id: comment.id
        }).$promise.then(function(data) {
          comment.loadingChildren = false;
          if (_.isEmpty(comment.children)) {
            comment.compileElementForFirstChild();
            return comment.children = data;
          } else {
            return comment.children = data.concat(comment.children);
          }
        });
      };
      this.reply = function(parentComment) {
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
        var delta;
        comment.vote = parseInt(comment.vote) || 0;
        comment.points = parseInt(comment.points) || 0;
        if (comment.vote === vote) {
          vote = 0;
        }
        delta = vote - comment.vote;
        comment.vote = vote;
        comment.points += delta;
        return CommentResource.vote({
          id: comment.id,
          vote: vote
        });
      };
      return this;
    }
  ]);

}).call(this);
