(->
  app = undefined
  app = angular.module('Chutter')
  app.factory 'PostResource', [
    '$resource'
    'Page'
    'API'
    ($resource, Page, API) ->
      $resource API.makeURL('/posts/:id'), { id: '@id' },
        query:
          isArray: true
          interceptor: 'response': (response) ->
            Page.posts = response.data
        comments:
          transformRequest: []
          url: API.makeURL('/posts/:id/comments')
          isArray: true
        vote:
          method: 'PUT'
          url: API.makeURL('/posts/:id/vote')
  ]
  app.factory 'NotificationPoller', [
    'poller'
    (poller) ->
  ]
  return
).call this
