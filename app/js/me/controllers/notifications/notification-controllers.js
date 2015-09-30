(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("notificationListCtrl", [
    "$scope", "Page", function($scope, Page) {
      return $scope.page = Page;
    }
  ]);

  app.controller("postNotificationsPageCtrl", [
    "$scope", "Notifications", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", function($scope, Notifications, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer) {
      $scope.fetchMoreComments = function() {};
      this.page = Page;
      this.post = Post;
      this.postService = PostService;
      this.notifications = Notifications;
      this.resource = CommentResource;
      this.mediaPlayer = MediaPlayer;
      return this;
    }
  ]);

  app.controller("commentNotificationsPageCtrl", [
    "$scope", "Notifications", "Page", "$mdBottomSheet", "CommentResource", "MediaPlayer", "Comment", function($scope, Notifications, Page, $mdBottomSheet, CommentResource, MediaPlayer, Comment) {
      $scope.fetchMoreComments = function() {};
      this.page = Page;
      this.comment = Comment;
      this.notifications = Notifications;
      this.resource = CommentResource;
      this.mediaPlayer = MediaPlayer;
      return this;
    }
  ]);

}).call(this);
