(function() {
  var app;

  app = angular.module("Chutter");

  app.factory("PostResource", [
    "$resource", "Page", "API", function($resource, Page, API) {
      return $resource(API.makeURL("/posts/:id"), {
        id: "@id"
      }, {
        query: {
          isArray: true,
          interceptor: {
            "response": function(response) {
              return Page.posts = response.data;
            }
          }
        },
        comments: {
          transformRequest: [],
          url: API.makeURL("/posts/:id/comments"),
          isArray: true
        },
        vote: {
          method: "PUT",
          url: API.makeURL("/posts/:id/vote")
        }
      });
    }
  ]);

  app.factory("NotificationPoller", ["poller", function(poller) {}]);

}).call(this);
