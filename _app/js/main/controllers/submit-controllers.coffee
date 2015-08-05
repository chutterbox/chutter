app = angular.module("MainApp")

app.controller "submitCtrl", ["$scope", "Community", "MediaResource", "Page", ($scope, Community, MediaResource, Page) ->


  $scope.permitted = (type) ->
    if $scope.page.community && $scope.page.community.permitted_formats_list.indexOf(type) > -1
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
    if query and query.length > 0 
      ExternalServicesResource.search({q: query})
     
  $scope.searchTextChange = (text) ->
    console.log text
    return

  $scope.submit = () ->
    $scope.newPost.community_id = $scope.page.community.id
    PostResource.save({post: $scope.newPost}).$promise.then (data) ->
      $state.transitionTo("home.community.comments", {id: data.slug, community: $scope.page.community.slug})

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

  $scope.loadAll = ->
    allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,              Wisconsin, Wyoming'
    allStates.split(/, +/g).map (state) ->
      {
        value: state.toLowerCase()
        display: state
      }

]

app.controller "imageSubmitCtrl", ["$scope", "MediaResource", "Page", "PostResource", "$state", ($scope, MediaResource, Page, PostResource, $state) ->
  $scope.page = Page
  #how rails wants it
  $scope.newPost = 
    title: ""
    media_attributes: [{format: "image"}]
  $scope.preview = 
    title: ""
    media: [{}]
  $scope.$watch('newPost.media_attributes[0].link', (newVal, oldVal) ->
    if newVal != oldVal
      $scope.scraping = true
      MediaResource.resolve({link: newVal, format: $scope.newPost.media_attributes[0].format}).$promise.then (data) ->
        $scope.updatePreview(data)
  )
  $scope.$watch("newPost.title", (newVal) ->
    $scope.preview.title = newVal
  )

  $scope.submit = () ->
    $scope.newPost.community_id = $scope.page.community.id
    PostResource.save({post: $scope.newPost}).$promise.then (data) ->
      $state.transitionTo("home.community.comments", {id: data.slug, community: $scope.page.community.slug})

  $scope.updatePreview = (data) ->
    $scope.scraping = false
    if data 
      $scope.data = true
      $scope.newPost.media_attributes[0] = data
      $scope.preview.media[0] = data

]

app.controller "webpageSubmitCtrl", ["$scope", "MediaResource", "Page", "PostResource", "$state", ($scope, MediaResource, Page, PostResource, $state) ->
  $scope.page = Page
  #how rails wants it
  $scope.newPost = 
    title: ""
    media_attributes: [{format: "webpage"}]
  $scope.preview = 
    title: ""
    media: [{}]
  $scope.$watch('newPost.media_attributes[0].link', (newVal, oldVal) ->
    if newVal != oldVal
      $scope.scraping = true
      MediaResource.resolve({link: newVal, format: $scope.newPost.media_attributes[0].format}).$promise.then (data) ->
        $scope.updatePreview(data)
  )
  $scope.$watch("newPost.title", (newVal) ->
    $scope.preview.title = newVal
  )

  $scope.submit = () ->
    $scope.newPost.community_id = $scope.page.community.id
    PostResource.save({post: $scope.newPost}).$promise.then (data) ->
      $state.transitionTo("home.community.comments", {id: data.slug, community: $scope.page.community.slug})

  $scope.updatePreview = (data) ->
    $scope.scraping = false
    if data 
      $scope.data = true
      $scope.newPost.media_attributes[0] = data
      $scope.preview.media[0] = data

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
      $state.transitionTo("home.community.comments", {id: data.slug, community: $scope.page.community.slug})

  $scope.updatePreview = (data) ->
    $scope.scraping = false
    if data 
      $scope.data = true
      $scope.newPost.media_attributes[0] = data
      $scope.preview.media[0] = data

]
app.controller "videoSubmitCtrl", ["$scope", "MediaResource", "Page", "PostResource", "$state", ($scope, MediaResource, Page, PostResource, $state) ->
  $scope.page = Page
  #how rails wants it
  $scope.newPost = 
    title: ""
    media_attributes: [{format: "video"}]
  $scope.preview = 
    title: ""
    media: [{}]
  $scope.$watch('newPost.media_attributes[0].link', (newVal, oldVal) ->
    if newVal != oldVal
      $scope.scraping = true
      MediaResource.resolve({link: newVal, format: $scope.newPost.media_attributes[0].format}).$promise.then (data) ->
        $scope.updatePreview(data)
  )
  $scope.$watch("newPost.title", (newVal) ->
    $scope.preview.title = newVal
  )

  $scope.submit = () ->
    $scope.newPost.community_id = $scope.page.community.id
    PostResource.save({post: $scope.newPost}).$promise.then (data) ->
      $state.transitionTo("home.community.comments", {id: data.slug, community: $scope.page.community.slug})

  $scope.updatePreview = (data) ->
    $scope.scraping = false
    if data 
      $scope.data = true
      $scope.newPost.media_attributes[0] = data
      $scope.preview.media[0] = data

]
