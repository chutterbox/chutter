(function() {
  var app;

  app = angular.module("MeApp");

  app.controller("notificationListCtrl", [
    "$scope", "Page", function($scope, Page) {
      $scope.page = Page;
      return $scope.notificationCountText = function(subscription) {
        var replyText;
        replyText = subscription.notification_count === 1 ? "reply" : "replies";
        if (subscription.entityable === "post") {
          return subscription.notification_count + " post " + replyText;
        } else if (subscription.entityable === "comment") {
          return subscription.notification_count + " comment " + replyText;
        }
      };
    }
  ]);

  app.controller("postNotificationsPageCtrl", [
    "$scope", "Notifications", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", function($scope, Notifications, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer) {
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
      this.page = Page;
      this.comment = Comment;
      this.notifications = Notifications;
      this.resource = CommentResource;
      this.mediaPlayer = MediaPlayer;
      this.post = {
        id: this.comment.post_id
      };
      return this;
    }
  ]);

}).call(this);
