'use strict'

app = angular.module("MainApp")
# API_HOST = "https://chutter-api.herokuapp.com/api/v1"
API_HOST = "http://localhost:3000/api/v1"


app.factory "NetworkSubscriptionResource", ["$resource", "Page", ($resource, Page) -> 
  return $resource("#{API_HOST}/network_subscriptions/:id", {id: "@id"}, {
      "delete":
        method: "DELETE" 
        isArray: true
      save:
        method: "POST" 
        isArray: true
      query:
        isArray: true
        interceptor:
          "response": (response) ->
            Page.networkSubscriptions = response.data
            Page.communitySubscriptions = []
            _.each Page.networkSubscriptions, (networkSubscription) ->
              if networkSubscription.community_subscriptions.length > 0
                Page.communitySubscriptions = Page.communitySubscriptions.concat networkSubscription.community_subscriptions
            console.log Page
    }) 
]


app.factory "CommunitySubscriptionResource", ["$resource" , "Page", ($resource, Page) -> 
  $resource(API_HOST+"/community_subscriptions/:id", {id: "@id"}, {
      "delete":
        method: "DELETE" 
        isArray: true
      save:
        method: "POST" 
        isArray: true
  })
]
app.factory "UserResource", ["$resource" , "Page", ($resource, Page) -> 
  $resource(API_HOST+"/users/:id", {id: "@id"})
]
app.factory "ExternalServicesResource", ["$resource" , "Page", ($resource, Page) -> 
  $resource(API_HOST+"/external_services/:id", {id: "@id"}, {
    "search":
      url: API_HOST+"/external_services/search_music" 
      method: "POST"
      isArray: true
  })
]

app.factory "MediaResource", ["$resource" , "Page", ($resource, Page) -> 
  $resource(API_HOST+"/media/:id", {id: "@id"}, {
    "resolve": 
      url: API_HOST+"/media/resolve"
      method: "POST"
      isArray: false

  })
]
app.factory "CommunityResource", ["$resource" , "Page", ($resource, Page) -> 
  $resource(API_HOST+"/communities/:id", {id: "@id"}, {
      show:
        method: "GET"
        url: API_HOST+"/communities/:id"
        interceptor:
          "response": (response) ->
            Page.community = response.data
      posts:
        method: "GET"
        isArray: true
        url: API_HOST+"/communities/:id/posts"

    }) 
]

app.factory "CommentResource", ["$resource" , "Page", ($resource, Page) -> 
  $resource(API_HOST+"/comments/:id", {id: "@id"}) 
]


app.factory "PostResource", ["$resource" , "Page", ($resource, Page) -> 
  $resource(API_HOST+"/posts/:id", {id: "@id"}, {
      query:
        isArray: true
        interceptor: { 
          "response": (response) ->
            Page.posts = response.data
        }
      comments:
        transformRequest: []
        url: API_HOST+"/posts/:id/comments"
        isArray: true
        # interceptor: { 
        #   "response": (response) ->
        #     Page.posts = response.data
        # }
      vote:
        method: "PUT"
        url: API_HOST+"/posts/:id/vote"
    }) 

]
app.factory "NetworkResource", ["$resource", "Page", ($resource, Page) ->
  $resource(API_HOST+"/networks/:id", {id: "@id"}, {
      show:
        method: "GET"
        url: API_HOST+"/networks/:id"
        interceptor: 
          "response": (response) ->
            Page.network = response.data
      posts:
        method: "GET"
        isArray: true
        url: API_HOST+"/networks/:id/posts"

      list:
        method: "GET"
        url: API_HOST+"/networks/list"
        isArray: true
        transformResponse: (response) ->
          data = angular.fromJson(response)
          _.each data, (item) ->
            sub = _.findWhere(Page.networkSubscriptions, {network_id: item.id})
            if sub
              item.subscription_id = sub.id
              item.selected = true
            else
              item.selected = false 
          data
      communities: 
        method: "get"
        url: API_HOST+"/networks/:id/communities"
        isArray: true
        transformResponse: (response) ->
          data = angular.fromJson(response)
          _.each data, (item) ->
            sub = _.findWhere(Page.communitySubscriptions, {community_id: item.id})
            if sub
              console.log sub
              item.subscription_id = sub.id
              item.selected = true
            else
              item.selected = false 
          data
    }) 
]


app.factory "audio", ["$document", ($document) ->
  audio = undefined
  audio = $document[0].createElement("audio")
  audio
]

app.factory "preview", ["$document", ($document) ->
  audio = undefined
  audio = $document[0].createElement("audio")
  audio
]

app.factory "playerSvc", ["$http", "$rootScope", ($http, $rootScope) ->
  incrPlays: (songId) ->
    $http.post("/incrPlays", {songId: songId})
  getSong: (track) ->
    $http.get("/getSong?track=#{track}")

]



