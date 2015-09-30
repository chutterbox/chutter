app = angular.module("MeApp")


app.controller "notificationListCtrl", ["$scope", "Page", ($scope, Page) ->
  #when a user creates a notifyable object (e.g. a post, a comment) they are subscribed to notifications
  #from that object. The response from /users/notifications is the authenticated user's notification subscriptions
  #each object has a property called "notifications" wich contians a list of the actual resource that the user is 
  #supposed to be notified about, e.g. a post notification may look like 
  #<post>: {...post attributes.., notifications: [<comment>, <comment>, <mention>, <media notice>]}
  $scope.page = Page
]

app.controller "postNotificationsPageCtrl", ["$scope", "Notifications", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", ($scope, Notifications, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer) ->
  $scope.fetchMoreComments = () ->
  @page = Page
  @post = Post
  @postService = PostService
  @notifications = Notifications
  @resource = CommentResource
  @mediaPlayer = MediaPlayer
  return @

]

app.controller "commentNotificationsPageCtrl", ["$scope", "Notifications", "Page", "$mdBottomSheet", "CommentResource", "MediaPlayer", "Comment", ($scope, Notifications, Page, $mdBottomSheet, CommentResource, MediaPlayer, Comment) ->
  $scope.fetchMoreComments = () ->
  @page = Page
  @comment = Comment
  @notifications = Notifications
  @resource = CommentResource
  @mediaPlayer = MediaPlayer
  return @

]