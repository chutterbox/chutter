app = angular.module('ModerationApp')
app.factory 'UserResource', ['$resource', 'API', ($resource, API) ->
    $resource API.makeURL('/users/'), { id: '@id' },
      moderatedCommunities:
        url: API.makeURL('/users/moderated_communities')
        method: "GET"
        isArray: true
]
