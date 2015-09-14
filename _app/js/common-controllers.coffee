'use strict'

app = angular.module("Chutter")

app.controller "createCommunityRuleCtrl", ["$scope", "$mdDialog", ($scope, $mdDialog) -> 
  $scope.selectedAppliesTo = ""
  $scope.selectedSeverity  = ""

  #these functions ensures that only one checkbox gets set. 
  #we use this over radio buttons because the backend has bitfield flags (incase we want to add more rules later)
  #so we need to just individual properties to true/false rather than a single property to a dynamic string value
  $scope.setSelectedAppliesTo = (value) ->
    $scope.newRule[$scope.selectedAppliesTo] = false
    $scope.selectedAppliesTo = value
  
  $scope.setSelectedSeverity = (value) ->
    $scope.newRule[$scope.selectedSeverity] = false
    $scope.selectedSeverity = value
  $scope.submit

  $scope.saveRule = () ->
    $mdDialog.hide()

  $scope.cancelSave = () ->
    $scope.$emit "cancelSave"
    $mdDialog.hide()
]

app.controller "modSheetCtrl", ["$mdBottomSheet", "$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", ($mdBottomSheet, $scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) ->
  $scope.post             = entityable if entityableType is "post"
  $scope.comment          = entityable if entityableType is "comment"
  $scope.entityable       = entityable
  

  $scope.activityLogEntry = new ActivityLogEntry

  CommunityResource.reportableRules({id: $scope.entityable.community_slug}).$promise.then (data) ->
    $scope.communityRules = _.filter data, (rule) -> (rule.sitewide || rule.posts)

  #id here is assumed to be the id of the route we want to post to, i.e. /posts/12/remove
  $scope.activityLogEntry.id = $scope.entityable.id
  
  $scope.submitEntityableForm = () ->
    #this is the id for the entity being moderated, not the activity log entry id
    if entityableType is "post"
      PostResource.delete($scope.activityLogEntry).$promise.then (data) ->
        if data.status is 200
          $scope.closeSheet()
        else
          $scope.closeSheet()
  
  
  $scope.submitUserForm = () ->
    if entityableType is "post"
      PostResource.ban($scope.activityLogEntry)  

  $scope.closeModSheet = () ->
    $mdBottomSheet.hide()

]

app.controller "reportSheetCtrl", ["$mdBottomSheet", "$scope", "entityable", "entityableType", "CommunityResource", "PostResource", "ActivityLogEntry", ($mdBottomSheet, $scope, entityable, entityableType, CommunityResource, PostResource, ActivityLogEntry) ->
  $scope.post             = entityable if entityableType is "post"
  $scope.comment          = entityable if entityableType is "comment"
  $scope.entityable       = entityable
  


  CommunityResource.reportableRules({id: $scope.entityable.community_slug}).$promise.then (data) ->
    $scope.communityRules = _.filter data, (rule) -> (rule.sitewide || rule.posts)
  
  $scope.activityLogEntry = new ActivityLogEntry
  #id here is assumed to be the id of the route we want to post to, i.e. /posts/12/remove
  $scope.activityLogEntry.id = $scope.entityable.id

  $scope.submitEntityableForm = () ->
    #this is the id for the entity being moderated, not the activity log entry id
    if entityableType is "post"
      PostResource.report($scope.activityLogEntry).$promise.then (data) ->
        if data.status is 200
          $scope.closeSheet(true)
          entityable.reported = true
        else
          $scope.closeSheet(false)

  
  
  $scope.closeSheet = (reported) ->
    $mdBottomSheet.hide(reported)

]
app.controller "commentsCtrl", ["$scope", "Comments", "Post", "Page", "$mdBottomSheet", "CommentResource", ($scope, Comments, Post, Page, $mdBottomSheet, CommentResource) ->
  $scope.page = Page
  $scope.page.post = Post
  $scope.page.comments = Comments
  $scope.resource = CommentResource

  $scope.fetchMoreComments = () ->
  $scope.reply = () ->
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

]

app.controller "replyCtrl", ["$scope", "Page", "CommentResource", "$mdBottomSheet", ($scope, Page, CommentResource, $mdBottomSheet) ->
  $scope.page = Page
  $scope.newComment = 
    post_id: $scope.page.post.id
    parent_id: $scope.comment.id if $scope.comment && $scope.comment.id
    body: ""
  
  $scope.create = () -> 
    CommentResource.save({comment: $scope.newComment}).$promise.then (newCreatedComment) -> 
      $mdBottomSheet.hide()
      newCreatedComment.username = newCreatedComment.user.username
      if $scope.comment && $scope.comment.id       
        $scope.comment.children.unshift(newCreatedComment)     
      else
        $scope.page.comments.unshift(newCreatedComment)


]

app.controller "postsCtrl", ["$scope", "Page", "Posts", "PostResource", "$stateParams", "NetworkResource", "CommunityResource", "MediaPlayer", "$mdBottomSheet", "$mdToast", ($scope, Page, Posts, PostResource, $stateParams, NetworkResource, CommunityResource, MediaPlayer, $mdBottomSheet, $mdToast) ->

  $scope.page.posts = Posts.posts
  $scope.mediaPlayer = MediaPlayer
  # toolbar = document.getElementsByTagName("chutter-toolbar")[0]
  # content = document.getElementById("content")
  # i = 0
  # $(".md-virtual-repeat-scroller").scroll () ->
  #   i-=1
  #   if i >= -48
  #     toolbar.style.transform = "translateY(#{i}px)"
  #     content.style.transform = "translateY(#{i}px)"

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

  @dynamicItems = new DynamicItems
  
  @updateVote = (post, vote) ->
    if post.vote == vote 
      vote = 0
    post.vote = vote
    PostResource.vote({id: post.id, vote: vote}) 
    
  @moderate = (post) ->
    if $scope.user.moderator
      $mdBottomSheet.show({
        templateUrl: '../app/partials/shared/modSheet.html'
        parent: angular.element(document.body)
        disableParentScroll: true
        locals:
          entityable: post
          entityableType: "post"
        controller: "modSheetCtrl"
      })

  @report = (post) ->
    $mdBottomSheet.show({
      templateUrl: '../app/partials/shared/reportSheet.html'
      #has to have leading digit on id
      parent: angular.element(document.body)
      disableParentScroll: true
      locals:
        entityable: post
        entityableType: "post"
      controller: "reportSheetCtrl"
    }).then (reported) ->
      if reported
        $mdToast.show($mdToast.simple().content('Post Reported.'))



  @getBackgroundImage = (post) ->
    if post.media && post.media.length > 0 
      if post.media[0].thumbnail_link && post.media[0].thumbnail_link.length > 0
        "url(#{post.media[0].thumbnail_link})"
      else
        "url('/img/character.svg')"
    else
      "none"
  return @
  
  # $scope.postObj = new postObj
]

app.controller "subscriptionDialogCtrl", ["$scope", ($scope) ->

]