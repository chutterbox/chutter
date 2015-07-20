API_HOST = "https://chutter-api.herokuapp.com/api/v1"

app = angular.module("Chutter")
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

app.factory "NotificationPoller", ["poller", (poller) -> 

]