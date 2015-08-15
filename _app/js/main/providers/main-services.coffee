'use strict'
app = angular.module('MainApp')
app.factory 'NetworkSubscriptionResource', ['$resource','Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/network_subscriptions/:id'), { id: '@id' }
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
