'use strict'

app = angular.module("Chutter")

app.controller "commentsPageCtrl", ["$scope", "Comments", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", ($scope, Comments, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer) ->
  $scope.fetchMoreComments = () ->
  
  @reply = () ->
    $mdBottomSheet.show({
      templateUrl: '/partials/shared/comments/replyPanel.html'
      #has to have leading digit on id
      controller: "replyCtrl"
      disableParentScroll: true
      #important, do not remove since we're passing in scope reference
      preserveScope: true
      parent: angular.element(document.body)
      clickOutsideToClose: true
    })
  
  @page = Page
  @post = Post
  @postService = PostService
  @comments = Comments
  @resource = CommentResource
  @mediaPlayer = MediaPlayer
  return @

]