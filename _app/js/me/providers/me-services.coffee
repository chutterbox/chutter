(->
  app = undefined
  app = angular.module('MeApp')
  app.factory 'UserResource', [
    '$resource'
    'API'
    ($resource, API) ->
      $resource API.makeURL('/users/:id'), { id: '@id' },
        submissions:
          url: API.makeURL('/users/submissions')
          isArray: true
        notifications:
          url: API.makeURL('/users/notifications')
          isArray: true
  ]
  app.factory 'ConversationResource', [
    '$resource'
    'API'
    ($resource, API) ->
      $resource API.makeURL('/conversations/:id'), { id: '@id' },
        messages:
          url: API.makeURL('/conversations/:id/messages')
          isArray: true
        reply:
          method: 'POST'
          url: API.makeURL('/conversations/:id/reply')
  ]
  return
).call this
