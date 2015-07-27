app = angular.module('Chutter')
app.factory 'PostResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
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
    ban:
      url: API.makeURL('/posts/:id/ban')
      method: 'POST'
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
      activityLog:
        url: API.makeURL('/communities/:id/activity_log')
      moderators:
        url: API.makeURL('/communities/:id/moderators')
        isArray: true
]