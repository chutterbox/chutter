(function() {
  'use strict';
  var API_HOST, app;

  app = angular.module("MainApp");

  API_HOST = "http://localhost:3000/api/v1";

  app.factory("NetworkSubscriptionResource", [
    "$resource", "Page", function($resource, Page) {
      return $resource(API_HOST + "/network_subscriptions/:id", {
        id: "@id"
      }, {
        "delete": {
          method: "DELETE",
          isArray: true
        },
        save: {
          method: "POST",
          isArray: true
        },
        query: {
          isArray: true,
          interceptor: {
            "response": function(response) {
              Page.networkSubscriptions = response.data;
              Page.communitySubscriptions = [];
              _.each(Page.networkSubscriptions, function(networkSubscription) {
                if (networkSubscription.community_subscriptions.length > 0) {
                  return Page.communitySubscriptions = Page.communitySubscriptions.concat(networkSubscription.community_subscriptions);
                }
              });
              return console.log(Page);
            }
          }
        }
      });
    }
  ]);

  app.factory("CommunitySubscriptionResource", [
    "$resource", "Page", function($resource, Page) {
      return $resource(API_HOST + "/community_subscriptions/:id", {
        id: "@id"
      }, {
        "delete": {
          method: "DELETE",
          isArray: true
        },
        save: {
          method: "POST",
          isArray: true
        }
      });
    }
  ]);

  app.factory("UserResource", [
    "$resource", "Page", function($resource, Page) {
      return $resource(API_HOST + "/users/:id", {
        id: "@id"
      });
    }
  ]);

  app.factory("ExternalServicesResource", [
    "$resource", "Page", function($resource, Page) {
      return $resource(API_HOST + "/external_services/:id", {
        id: "@id"
      }, {
        "search": {
          url: API_HOST + "/external_services/search_music",
          method: "POST",
          isArray: true
        }
      });
    }
  ]);

  app.factory("MediaResource", [
    "$resource", "Page", function($resource, Page) {
      return $resource(API_HOST + "/media/:id", {
        id: "@id"
      }, {
        "resolve": {
          url: API_HOST + "/media/resolve",
          method: "POST",
          isArray: false
        }
      });
    }
  ]);

  app.factory("CommunityResource", [
    "$resource", "Page", function($resource, Page) {
      return $resource(API_HOST + "/communities/:id", {
        id: "@id"
      }, {
        show: {
          method: "GET",
          url: API_HOST + "/communities/:id",
          interceptor: {
            "response": function(response) {
              return Page.community = response.data;
            }
          }
        },
        posts: {
          method: "GET",
          isArray: true,
          url: API_HOST + "/communities/:id/posts"
        }
      });
    }
  ]);

  app.factory("CommentResource", [
    "$resource", "Page", function($resource, Page) {
      return $resource(API_HOST + "/comments/:id", {
        id: "@id"
      });
    }
  ]);

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

  app.factory("NetworkResource", [
    "$resource", "Page", function($resource, Page) {
      return $resource(API_HOST + "/networks/:id", {
        id: "@id"
      }, {
        show: {
          method: "GET",
          url: API_HOST + "/networks/:id",
          interceptor: {
            "response": function(response) {
              return Page.network = response.data;
            }
          }
        },
        posts: {
          method: "GET",
          isArray: true,
          url: API_HOST + "/networks/:id/posts"
        },
        list: {
          method: "GET",
          url: API_HOST + "/networks/list",
          isArray: true,
          transformResponse: function(response) {
            var data;
            data = angular.fromJson(response);
            _.each(data, function(item) {
              var sub;
              sub = _.findWhere(Page.networkSubscriptions, {
                network_id: item.id
              });
              if (sub) {
                item.subscription_id = sub.id;
                return item.selected = true;
              } else {
                return item.selected = false;
              }
            });
            return data;
          }
        },
        communities: {
          method: "get",
          url: API_HOST + "/networks/:id/communities",
          isArray: true,
          transformResponse: function(response) {
            var data;
            data = angular.fromJson(response);
            _.each(data, function(item) {
              var sub;
              sub = _.findWhere(Page.communitySubscriptions, {
                community_id: item.id
              });
              if (sub) {
                console.log(sub);
                item.subscription_id = sub.id;
                return item.selected = true;
              } else {
                return item.selected = false;
              }
            });
            return data;
          }
        }
      });
    }
  ]);

  app.factory("audio", [
    "$document", function($document) {
      var audio;
      audio = void 0;
      audio = $document[0].createElement("audio");
      return audio;
    }
  ]);

  app.factory("preview", [
    "$document", function($document) {
      var audio;
      audio = void 0;
      audio = $document[0].createElement("audio");
      return audio;
    }
  ]);

  app.factory("playerSvc", [
    "$http", "$rootScope", function($http, $rootScope) {
      return {
        incrPlays: function(songId) {
          return $http.post("/incrPlays", {
            songId: songId
          });
        },
        getSong: function(track) {
          return $http.get("/getSong?track=" + track);
        }
      };
    }
  ]);

}).call(this);
