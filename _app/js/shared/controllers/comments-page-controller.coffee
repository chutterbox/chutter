'use strict'

app = angular.module("Chutter")

app.controller "commentsPageCtrl", ["$scope", "Comments", "Post", "Page", "PostService", "$mdBottomSheet", "CommentResource", "MediaPlayer", "$stateParams", ($scope, Comments, Post, Page, PostService, $mdBottomSheet, CommentResource, MediaPlayer, $stateParams) ->
  $scope.fetchMoreComments = () ->
  y = 0
  prevScrollTop = 0
  toolbar = document.getElementById("toolbarShrink")
  content = document.getElementById("contentShrink")
  scrollElement = $(content)
  throttledFn = () -> 
    scrollTop = scrollElement[0].scrollTop
    toolbarHeight = 80
    shrinkSpeedFactor = 0.5
    y = Math.min(toolbarHeight / shrinkSpeedFactor, Math.max(0, y + scrollTop - prevScrollTop))
    
    contentValue = (toolbarHeight - y) * shrinkSpeedFactor
    toolbarValue = -y * shrinkSpeedFactor
    
    if scrollTop is 0
      content.style.cssText = ""
      toolbar.style.cssText = ""
    else
      content.style.cssText = "transform: translateY(#{contentValue}px);-webkit-transform: translateY(#{contentValue}px);-moz-transform: translateY(#{contentValue}px)"
      toolbar.style.cssText = "transform: translateY(#{toolbarValue}px);-webkit-transform: translateY(#{toolbarValue}px);-moz-transform: translateY(#{toolbarValue}px)"

    prevScrollTop = scrollTop
   
  scrollElement.scroll _.throttle(throttledFn, 6)  



  @page = Page
  @post = Post
  if $stateParams.network
    @applicationSectionNamespace = "network_frontpage"
  else
    @applicationSectionNamespace = "frontpage"

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

  @children = (comment) ->
    comment.loadingChildren = true
    CommentResource.children({id: comment.id}).$promise.then (data) ->
      comment.loadingChildren = false
      if _.isEmpty(comment.children)
        comment.compileElementForFirstChild() 
        comment.children = data
      else
        comment.children = data.concat(comment.children)

  @reply = (parentComment) ->
    $mdBottomSheet.show({
      templateUrl: '/partials/shared/comments/replyPanel.html'
      #has to have leading digit on id
      controller: "replyCtrl"
      disableParentScroll: true
      locals:
        post: @post
        parentComment: parentComment
        comments: @comments
      #important, do not remove since we're passing in scope reference
      preserveScope: true
      parent: angular.element(document.body)
      clickOutsideToClose: true
    })
  @edit = (comment) ->
    $mdBottomSheet.show({
      templateUrl: '/partials/shared/comments/editPanel.html'
      #has to have leading digit on id
      disableParentScroll: true
      locals:
        comment: comment
      #important, do not remove since we're passing in scope reference
      preserveScope: true
      parent: angular.element(document.body)
      clickOutsideToClose: true
    })
  @updateVote = (comment, vote) -> 
    comment.vote = parseInt(comment.vote) || 0
    comment.points = parseInt(comment.points) || 0
    if comment.vote is vote
      vote = 0
    delta = vote - comment.vote
    comment.vote = vote
    comment.points += delta
    CommentResource.vote({id: comment.id, vote: vote}) 
    
  return @

] 