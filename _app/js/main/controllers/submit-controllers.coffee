app = angular.module("MainApp")

app.controller "submitCtrl", ["$scope", "CommunityResource", "Page", ($scope, CommunityResource, Page) ->

  $scope.communitySearch = (query) ->
    console.log query
    if query and query.length > 0 
      CommunityResource.search({q: query}).$promise


  $scope.selectedCommunityChange = ->
    Page.community = $scope.selectedCommunity


  $scope.permitted = (type) ->
    if $scope.selectedCommunity && $scope.selectedCommunity.permitted_formats_list.indexOf(type) > -1
      true
    else
      false

  $scope.selectPostType = (type) ->
    $scope.newPost.type = type 

]

app.controller "musicSubmitCtrl", ["$scope", "MediaResource", "ExternalServicesResource", "Page", "PostResource", "$state", ($scope, MediaResource, ExternalServicesResource, Page, PostResource, $state) ->
  $scope.page = Page
  $scope.newPost = 
    title: ""
    media_attributes: [{format: "music"}]
  $scope.preview = 
    title: ""
    media: [{}]
  $scope.querySearch = (query) ->
    console.log query
    if query and query.length > 0 
      ExternalServicesResource.search({q: query}).$promise

  $scope.submit = () ->
    $scope.newPost.community_id = $scope.page.community.id
    PostResource.save({post: $scope.newPost}).$promise.then (data) ->
      $state.transitionTo("frontpage.community.comments", {id: data.slug, community: $scope.page.community.slug})

  $scope.selectedItemChange = ->
    MediaResource.resolve({link: $scope.selectedItem.link, format: "music"}).$promise.then (data) ->
      $scope.updatePreview(data)
  
  $scope.updatePreview = (data) ->
    $scope.newPost.media_attributes[0] = data
    $scope.newPost.title = $scope.selectedItem.title
    $scope.preview.title = $scope.selectedItem.title
    $scope.scraping = false
    if data 
      $scope.data = true
      $scope.preview.media[0] = data

]


app.controller "linkSubmitCtrl", ["$scope", "MediaResource", "Page", "PostResource", "$state", ($scope, MediaResource, Page, PostResource, $state) ->
  $scope.page = Page
  #how rails wants it
  $scope.newPost = 
    title: ""
    link: ""
  $scope.preview = 
    title: ""
    link: ""
  $scope.submit = () ->
    $scope.newPost.community_id = $scope.page.community.id
    PostResource.save({post: $scope.newPost}).$promise.then (data) ->
      $state.transitionTo("frontpage.community.comments", {id: data.slug, community: $scope.page.community.slug})

]

app.controller "discussionSubmitCtrl", ["$scope", "Page", "PostResource", "$state", ($scope, Page, PostResource, $state) ->
  $scope.page = Page
  #how rails wants it
  $scope.newPost = 
    title: ""

  $scope.preview = 
    title: ""

  $scope.$watch("newPost.title", (newVal) ->
    $scope.preview.title = newVal
  )
  $scope.submit = () ->
    $scope.newPost.community_id = $scope.page.community.id
    PostResource.save({post: $scope.newPost}).$promise.then (data) ->
      $state.transitionTo("frontpage.community.comments", {id: data.slug, community: $scope.page.community.slug})

  $scope.updatePreview = (data) ->
    $scope.scraping = false
    if data 
      $scope.data = true
      $scope.newPost.media_attributes[0] = data
      $scope.preview.media[0] = data

]

