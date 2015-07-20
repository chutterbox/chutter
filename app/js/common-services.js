(function() {
  var API_HOST, app;

  API_HOST = "https://chutter-api.herokuapp.com/api/v1";

  app = angular.module("Chutter");

  app.factory("PostResource", [
    "$resource", "Page", function($resource, Page) {
      return $resource(API_HOST + "/posts/:id", {
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
          url: API_HOST + "/posts/:id/comments",
          isArray: true
        },
        vote: {
          method: "PUT",
          url: API_HOST + "/posts/:id/vote"
        }
      });
    }
  ]);

  app.factory("NotificationPoller", ["poller", function(poller) {}]);

}).call(this);
