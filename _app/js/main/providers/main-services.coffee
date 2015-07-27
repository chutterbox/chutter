'use strict'
app = angular.module('MainApp')
app.factory 'NetworkSubscriptionResource', ['$resource','Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/network_subscriptions/:id'), { id: '@id' },
      query:
        isArray: true
        interceptor: 'response': (response) ->
          Page.networkSubscriptions = response.data
          Page.communitySubscriptions = []
          _.each Page.networkSubscriptions, (networkSubscription) ->
            if networkSubscription.community_subscriptions.length > 0
              return Page.communitySubscriptions = Page.communitySubscriptions.concat(networkSubscription.community_subscriptions)
            return
          console.log Page
]
# app.factory 'CommunitySubscriptionResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
#     $resource API.makeURL('/community_subscriptions/:id'), { id: '@id' },
#       'delete':
#         method: 'DELETE'
#         isArray: true
#       save:
#         method: 'POST'
#         isArray: true
# ]
app.factory 'UserResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/users/:id'), id: '@id'
]

app.factory 'ExternalServicesResource', ['$resource', 'Page', 'API'
  ($resource, Page, API) ->
    $resource API.makeURL('/external_services/:id'), { id: '@id' }, 'search':
      url: API.makeURL('/external_services/search_music')
      method: 'POST'
      isArray: true
]
app.factory 'MediaResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/media/:id'), { id: '@id' }, 'resolve':
      url: API.makeURL('/media/resolve')
      method: 'POST'
      isArray: false
]

app.factory 'CommentResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/comments/:id'), {id: '@id'},
      vote:
        method: 'PUT'
        url: API.makeURL('/comments/:id/vote')
]

app.factory 'NetworkResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/networks/:id'), { id: '@id' },
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
            sub = undefined
            sub = _.findWhere(Page.networkSubscriptions, network_id: item.id)
            if sub
              item.subscription_id = sub.id
              item.selected = true
            else
              item.selected = false
          data
      communities:
        method: 'get'
        url: API.makeURL('/networks/:id/communities')
        isArray: true
        transformResponse: (response) ->
          data = undefined
          data = angular.fromJson(response)
          _.each data, (item) ->
            sub = undefined
            sub = _.findWhere(Page.communitySubscriptions, community_id: item.id)
            if sub
              console.log sub
              item.subscription_id = sub.id
              item.selected = true
            else
              item.selected = false
          data
      subscribe:
        url: API.makeURL('/networks/:id/subscribe')
        method: 'PUT'
        isArray: true
      unsubscribe:
        url: API.makeURL('/networks/:id/unsubscribe')
        method: 'PUT'
        isArray: true
]
app.factory 'audio', [
  '$document'
  ($document) ->
    audio = undefined
    audio = undefined
    audio = $document[0].createElement('audio')
    audio
]
app.factory 'preview', [
  '$document'
  ($document) ->
    audio = undefined
    audio = undefined
    audio = $document[0].createElement('audio')
    audio
]
app.factory 'playerSvc', [
  '$http'
  '$rootScope'
  ($http, $rootScope) ->
    {
      incrPlays: (songId) ->
        $http.post '/incrPlays', songId: songId
      getSong: (track) ->
        $http.get '/getSong?track=' + track

    }
]
