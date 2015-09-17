'use strict'

app = angular.module("Chutter")

app.controller "postListCtrl", ["$scope", "Page", "Posts", "PostResource", "$stateParams", "NetworkResource", "CommunityResource", "MediaPlayer", "PostService", ($scope, Page, Posts, PostResource, $stateParams, NetworkResource, CommunityResource, MediaPlayer, PostService) ->
  # toolbar = document.getElementsByTagName("chutter-toolbar")[0]
  # content = document.getElementById("content")
  # i = 0
  # $(".md-virtual-repeat-scroller").scroll () ->
  #   i-=1
  #   if i >= -48
  #     toolbar.style.transform = "translateY(#{i}px)"
  #     content.style.transform = "translateY(#{i}px)"
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

    @PAGE_SIZE = 50
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
    $scope.page.paginator.start_fetch()
    if Page.scope is "all"
      PostResource.query({sort: Page.paginator.current_sort, offset: pageOffset}).$promise.then angular.bind(this, (data) ->
        @loadedPages[pageNumber] = []
        @numItems = data.count
        i = pageOffset
        for item in data.posts
          @loadedPages[pageNumber].push item
        return
      )
        # Page.paginator.finish_fetch(data.length)
    else if Page.scope is "network"
      NetworkResource.posts({id: $stateParams.network, sort: Page.paginator.current_sort, offset: pageOffset}).$promise.then angular.bind(this, (data) ->
        @loadedPages[pageNumber] = []
        @numItems = data.count
        i = pageOffset
        for item in data.posts
          @loadedPages[pageNumber].push item
        return
      )
    else if Page.scope is "community"
      CommunityResource.posts({id: $stateParams.community, sort: Page.paginator.current_sort, offset: pageOffset}).$promise.then angular.bind(this, (data) ->
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