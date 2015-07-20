(function() {
  var API_HOST, app;

  app = angular.module("MeApp");

  API_HOST = "https://chutter-api.herokuapp.com/api/v1";

  app.factory("UserResource", [
    "$resource", function($resource) {
      return $resource(API_HOST + "/users/:id", {
        id: "@id"
      }, {
        submissions: {
          url: API_HOST + "/users/submissions",
          isArray: true
        },
        notifications: {
          url: API_HOST + "/users/notifications",
          isArray: true
        }
      });
    }
  ]);

  app.factory("ConversationResource", [
    "$resource", function($resource) {
      return $resource(API_HOST + "/conversations/:id", {
        id: "@id"
      }, {
        messages: {
          url: API_HOST + "/conversations/:id/messages",
          isArray: true
        },
        reply: {
          method: "POST",
          url: API_HOST + "/conversations/:id/reply"
        }
      });
    }
  ]);

}).call(this);
