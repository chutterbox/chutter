'use strict'

app = angular.module("Chutter")

app.controller "commentsPageCtrl", ["$scope", "Comments", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", ($scope, Comments, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer) ->
  $scope.fetchMoreComments = () ->
  @page = Page
  @post = Post
  @postService = PostService
  @comments = Comments
  @resource = CommentResource
  @mediaPlayer = MediaPlayer
  return @

]

app.controller "commentListCtrl", ["$scope", "$mdBottomSheet", "CommentResource", "MediaPlayer", "$rootScope", ($scope, $mdBottomSheet, CommentResource, MediaPlayer, $rootScope) ->
  @post = $scope.ctrl.post
  @comments = $scope.ctrl.comments
  @user = $rootScope.user
  @resource = CommentResource
  @mediaPlayer = MediaPlayer
  @reply = (parent) ->
    $mdBottomSheet.show({
      templateUrl: '/partials/shared/comments/replyPanel.html'
      #has to have leading digit on id
      controller: "replyCtrl"
      disableParentScroll: true
      locals:
        parent: parent
        post: @post
      #important, do not remove since we're passing in scope reference
      preserveScope: true
      parent: angular.element(document.body)
      clickOutsideToClose: true
    })
  @updateVote = (comment, vote) -> 
    if comment.vote == vote 
      vote = 0
    comment.vote = vote
    CommentResource.vote({id: comment.id, vote: vote}) 
    
  return @

] 