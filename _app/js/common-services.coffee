app = angular.module('Chutter')
app.factory 'PostResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
  $resource API.makeURL('/posts/:id'), { id: '@id' },
    get:
      isArray: false
      url: API.makeURL('/posts/:id')
    query:
      isArray: true
    comments:
      transformRequest: []
      url: API.makeURL('/posts/:id/comments')
      isArray: true
    vote:
      method: 'PUT'
      url: API.makeURL('/posts/:id/vote')
    ban:
      url: API.makeURL('/posts/:id/ban')
      method: 'POST'
    #regular save is reserved for #create
    save_post: 
      url: API.makeURL('/posts/:id/save')
      method: 'POST'     
    unsave_post: 
      url: API.makeURL('/posts/:id/unsave')
      method: 'POST'  
    notifications:
      url: API.makeURL('/posts/:id/notifications')
      method: 'GET'
      isArray: true
    saved:
      url: API.makeURL('/posts/saved')
      isArray: true
      interceptor: 'response': (response) ->
        console.log "here"
        Page.posts = response.data
]

app.factory 'CommentResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/comments/:id'), {id: '@id'},
      vote:
        method: 'PUT'
        url: API.makeURL('/comments/:id/vote')
      notifications:
        url: API.makeURL('/comments/:id/notifications')
        method: 'GET'
        isArray: true
        interceptor: 'response': (response) ->
          Page.comments = response.data
]

app.factory 'NetworkResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
  $resource API.makeURL('/networks/:id'), { id: '@id' },
    query:
      isArray: true
      interceptor: 'response': (response) ->
        Page.networks = response.data
    show:
      method: 'GET'
      url: API.makeURL('/networks/:id')
      interceptor: 'response': (response) ->
        Page.network = response.data
        Page.title   = 
          text: Page.network.name
          slug: Page.network.slug
        Page.secondary_title = undefined
    posts:
      method: 'GET'
      isArray: true
      url: API.makeURL('/networks/:id/posts')
    list:
      method: 'GET'
      url: API.makeURL('/networks/list')
      isArray: true
      transformResponse: (response) ->
        data = undefined
        data = angular.fromJson(response)
        _.each data, (item) ->
          if item.network_subscription_id
            item.subscribed = true
    communities:
      method: 'get'
      url: API.makeURL('/networks/:id/communities')
      isArray: true
      transformResponse: (response) ->
        data = undefined
        data = angular.fromJson(response)
        _.each data, (item) ->
          if item.community_subscription_id
            item.subscribed = true
    subscribe:
      url: API.makeURL('/networks/:id/subscribe')
      method: 'PUT'
      isArray: true
    unsubscribe:
      url: API.makeURL('/networks/:id/unsubscribe')
      method: 'PUT'
      isArray: true
]
app.factory 'CommunityResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/communities/:id'), { id: '@id' },
      show:
        method: 'GET'
        url: API.makeURL('/communities/:id')
        interceptor: 'response': (response) ->
          Page.community = response.data
          Page.title = 
            text: Page.community.network.name
            slug: Page.community.network.slug
          Page.secondary_title = 
            text: Page.community.name
            slug: Page.community.slug
      posts:
        method: 'GET'
        isArray: true
        url: API.makeURL('/communities/:id/posts')
      subscribe:
        url: API.makeURL('/communities/:id/subscribe')
        method: 'PUT'
        isArray: true
      unsubscribe:
        url: API.makeURL('/communities/:id/unsubscribe')
        method: 'PUT'
        isArray: true
      rules:
        url: API.makeURL('/communities/:id/rules')
        isArray: true  
      reportableRules:
        url: API.makeURL('/communities/:id/reportable_rules')
        isArray: true  
      activityLog:
        url: API.makeURL('/communities/:id/activity_log')
      moderators:
        url: API.makeURL('/communities/:id/moderators')
        isArray: true
      moderator:
        url: API.makeURL('/communities/:id/moderator')
      updateModerator:
        method: "PUT"
        url: API.makeURL('/communities/:id/update_moderator')
      banList:
        url: API.makeURL('/communities/:id/ban_list')
        isArray: true
      modwatch:
        url: API.makeURL('/communities/:id/modwatch')
        isArray: true   
      update:
        url: API.makeURL('/communities/:id')
        method: "PUT"
]
class AudioInterface
  constructor: (src, $document) ->
    @audioElement  = $document[0].createElement('audio')
    @audioElement.src = src 
  
  play: () ->
    @audioElement.play()
  toggle: () ->
    if @audioElement.paused
      @audioElement.play()
    else
      @audioElement.pause()
  pause: () ->
    @audioElement.pause()
  updateTime: () => 
    @currentTime = @audioElement.currentTime

app.factory 'audio', ($document) ->
  (src) -> 
    new AudioInterface(src, $document)

