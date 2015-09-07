(function() {
  var AudioInterface, app,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app = angular.module('Chutter');

  app.factory('PostResource', [
    '$resource', 'Page', 'API', function($resource, Page, API) {
      return $resource(API.makeURL('/posts/:id'), {
        id: '@id'
      }, {
        get: {
          isArray: false,
          url: API.makeURL('/posts/:id')
        },
        query: {
          isArray: true
        },
        comments: {
          transformRequest: [],
          url: API.makeURL('/posts/:id/comments'),
          isArray: true
        },
        vote: {
          method: 'PUT',
          url: API.makeURL('/posts/:id/vote')
        },
        report: {
          url: API.makeURL('/posts/:id/report'),
          method: 'POST'
        },
        save_post: {
          url: API.makeURL('/posts/:id/save'),
          method: 'POST'
        },
        unsave_post: {
          url: API.makeURL('/posts/:id/unsave'),
          method: 'POST'
        },
        notifications: {
          url: API.makeURL('/posts/:id/notifications'),
          method: 'GET',
          isArray: true
        },
        saved: {
          url: API.makeURL('/posts/saved'),
          isArray: true,
          interceptor: {
            'response': function(response) {
              console.log("here");
              return Page.posts = response.data;
            }
          }
        }
      });
    }
  ]);

  app.factory('CommentResource', [
    '$resource', 'Page', 'API', function($resource, Page, API) {
      return $resource(API.makeURL('/comments/:id'), {
        id: '@id'
      }, {
        vote: {
          method: 'PUT',
          url: API.makeURL('/comments/:id/vote')
        },
        notifications: {
          url: API.makeURL('/comments/:id/notifications'),
          method: 'GET',
          isArray: true,
          interceptor: {
            'response': function(response) {
              return Page.comments = response.data;
            }
          }
        }
      });
    }
  ]);

  app.factory('NetworkResource', [
    '$resource', 'Page', 'API', function($resource, Page, API) {
      return $resource(API.makeURL('/networks/:id'), {
        id: '@id'
      }, {
        query: {
          isArray: true,
          interceptor: {
            'response': function(response) {
              return Page.networks = response.data;
            }
          }
        },
        show: {
          method: 'GET',
          url: API.makeURL('/networks/:id'),
          interceptor: {
            'response': function(response) {
              Page.network = response.data;
              Page.title = {
                text: Page.network.name,
                slug: Page.network.slug
              };
              return Page.secondary_title = void 0;
            }
          }
        },
        posts: {
          method: 'GET',
          isArray: true,
          url: API.makeURL('/networks/:id/posts')
        },
        list: {
          method: 'GET',
          url: API.makeURL('/networks/list'),
          isArray: true,
          transformResponse: function(response) {
            var data;
            data = void 0;
            data = angular.fromJson(response);
            return _.each(data, function(item) {
              if (item.network_subscription_id) {
                return item.subscribed = true;
              }
            });
          }
        },
        communities: {
          method: 'get',
          url: API.makeURL('/networks/:id/communities'),
          isArray: true,
          transformResponse: function(response) {
            var data;
            data = void 0;
            data = angular.fromJson(response);
            return _.each(data, function(item) {
              if (item.community_subscription_id) {
                return item.subscribed = true;
              }
            });
          }
        },
        subscribe: {
          url: API.makeURL('/networks/:id/subscribe'),
          method: 'PUT',
          isArray: true
        },
        unsubscribe: {
          url: API.makeURL('/networks/:id/unsubscribe'),
          method: 'PUT',
          isArray: true
        }
      });
    }
  ]);

  app.factory('CommunityResource', [
    '$resource', 'Page', 'API', function($resource, Page, API) {
      return $resource(API.makeURL('/communities/:id'), {
        id: '@id'
      }, {
        show: {
          method: 'GET',
          url: API.makeURL('/communities/:id'),
          interceptor: {
            'response': function(response) {
              Page.community = response.data;
              Page.title = {
                text: Page.community.network.name,
                slug: Page.community.network.slug
              };
              return Page.secondary_title = {
                text: Page.community.name,
                slug: Page.community.slug
              };
            }
          }
        },
        posts: {
          method: 'GET',
          isArray: true,
          url: API.makeURL('/communities/:id/posts')
        },
        subscribe: {
          url: API.makeURL('/communities/:id/subscribe'),
          method: 'PUT',
          isArray: true
        },
        unsubscribe: {
          url: API.makeURL('/communities/:id/unsubscribe'),
          method: 'PUT',
          isArray: true
        },
        rules: {
          url: API.makeURL('/communities/:id/rules'),
          isArray: true
        },
        reportableRules: {
          url: API.makeURL('/communities/:id/reportable_rules'),
          isArray: true
        },
        activityLog: {
          url: API.makeURL('/communities/:id/activity_log')
        },
        moderators: {
          url: API.makeURL('/communities/:id/moderators'),
          isArray: true
        },
        moderator: {
          url: API.makeURL('/communities/:id/moderator')
        },
        updateModerator: {
          method: "PUT",
          url: API.makeURL('/communities/:id/update_moderator')
        },
        banList: {
          url: API.makeURL('/communities/:id/ban_list'),
          isArray: true
        },
        modwatch: {
          url: API.makeURL('/communities/:id/modwatch'),
          isArray: true
        },
        update: {
          url: API.makeURL('/communities/:id'),
          method: "PUT"
        },
        requestModerationPosition: {
          url: API.makeURL('/communities/:id/request_moderation_position'),
          method: "POST"
        },
        moderationRequests: {
          url: API.makeURL('/communities/:id/moderation_requests'),
          isArray: true
        },
        addModerator: {
          url: API.makeURL('/communities/:id/add_moderator'),
          method: "POST"
        },
        dismissModerationPositionRequest: {
          url: API.makeURL('/communities/:id/dismiss_moderation_position_request'),
          method: "POST"
        }
      });
    }
  ]);

  AudioInterface = (function() {
    function AudioInterface(src, $document) {
      this.updateTime = bind(this.updateTime, this);
      this.audioElement = $document[0].createElement('audio');
      this.audioElement.src = src;
    }

    AudioInterface.prototype.play = function() {
      return this.audioElement.play();
    };

    AudioInterface.prototype.toggle = function() {
      if (this.audioElement.paused) {
        return this.audioElement.play();
      } else {
        return this.audioElement.pause();
      }
    };

    AudioInterface.prototype.pause = function() {
      return this.audioElement.pause();
    };

    AudioInterface.prototype.updateTime = function() {
      return this.currentTime = this.audioElement.currentTime;
    };

    return AudioInterface;

  })();

  app.factory('audio', function($document) {
    return function(src) {
      return new AudioInterface(src, $document);
    };
  });

}).call(this);
