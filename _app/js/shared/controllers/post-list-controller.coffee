'use strict'

app = angular.module("Chutter")

app.controller "postListCtrl", ["$scope", "Page", "Posts", "PostResource", "$stateParams", "NetworkResource", "CommunityResource", "MediaPlayer", "PostService", "$state", ($scope, Page, Posts, PostResource, $stateParams, NetworkResource, CommunityResource, MediaPlayer, PostService, $state) ->
  if $stateParams.network
    $scope.applicationSectionNamespace = "network_frontpage"
  else
    $scope.applicationSectionNamespace = "frontpage"
  if $state.current.data
    $scope.context = $state.current.data.context 
    $scope.sorting = $state.current.data.sorting
  # content = document.getElementById("content")
  
  y = 0
  prevScrollTop = 0
  toolbar = document.getElementById("toolbarShrink")
  content = document.getElementById("contentShrink")
  scrollElement = $(".md-virtual-repeat-scroller")
  throttledFn = () -> 
    scrollTop = scrollElement[0].scrollTop
    toolbarHeight = 80
    shrinkSpeedFactor = 0.5
    y = Math.min(toolbarHeight / shrinkSpeedFactor, Math.max(0, y + scrollTop - prevScrollTop))
    
    contentValue = (toolbarHeight - y) * shrinkSpeedFactor
    toolbarValue = -y * shrinkSpeedFactor
    
    if (contentValue is 0 or toolbarValue is 0)
      content.style.cssText = ""
      toolbar.style.cssText = ""
    else
      content.style.cssText = "transform: translateY(#{contentValue}px);-webkit-transform: translateY(#{contentValue}px);-moz-transform: translateY(#{contentValue}px)"
      toolbar.style.cssText = "transform: translateY(#{toolbarValue}px);-webkit-transform: translateY(#{toolbarValue}px);-moz-transform: translateY(#{toolbarValue}px)"

    prevScrollTop = scrollTop
   
  scrollElement.scroll _.throttle(throttledFn, 6)

  Page.posts = Posts.posts
  DynamicItems = ->

    ###*
    # @type {!Object<?Array>} Data pages, keyed by page number (0-index).
    ###

    @loadedPages = {}
    @loadedPages[0] = Posts.posts

    ###* @type {number} Total number of items. ###

    @numItems = Posts.count

    ###* @const {number} Number of items to fetch per request. ###

    @PAGE_SIZE = 15
    return

  # Required.

  DynamicItems::getItemAtIndex = (index) ->
    pageNumber = Math.floor(index / @PAGE_SIZE)
    page = @loadedPages[pageNumber]
    if page
      return page[index % @PAGE_SIZE]
    else if page != null
      @fetchPage_ pageNumber
    return

  # Required.

  DynamicItems::getLength = ->
    @numItems

  DynamicItems::fetchPage_ = (pageNumber) ->
    pageOffset = pageNumber * @PAGE_SIZE
    # Set the page to null so we know it is already being fetched.
    @loadedPages[pageNumber] = null
    # For demo purposes, we simulate loading more items with a timed
    # promise. In real code, this function would likely contain an
    # $http request.
    console.log $scope.context
    if $scope.context is "frontpage"
      PostResource.query({sort:  $scope.sorting, offset: pageOffset}).$promise.then angular.bind(this, (data) ->
        @loadedPages[pageNumber] = []
        @numItems = data.count
        i = pageOffset
        for item in data.posts
          @loadedPages[pageNumber].push item
        return
      )
    else if $scope.context is "network_frontpage"
      NetworkResource.posts({id: $stateParams.network, sort:  $scope.sorting, offset: pageOffset}).$promise.then angular.bind(this, (data) ->
        @loadedPages[pageNumber] = []
        @numItems = data.count
        i = pageOffset
        for item in data.posts
          @loadedPages[pageNumber].push item
        return
      )
    else if $scope.context is "frontpage_community" or $scope.context is "network_frontpage_community"
      CommunityResource.posts({id: $stateParams.community, sort: $scope.sorting, offset: pageOffset}).$promise.then angular.bind(this, (data) ->
        @loadedPages[pageNumber] = []
        @numItems = data.count
        i = pageOffset
        for item in data.posts
          @loadedPages[pageNumber].push item
        return
      )
    return
  #expose service objects/models
  @mediaPlayer = MediaPlayer
  @postService = PostService
  @dynamicItems = new DynamicItems
  return @
  # $scope.postObj = new postObj
]