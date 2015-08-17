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
          url: API.makeURL('/posts/:id'),
          interceptor: {
            'response': function(response) {
              return Page.post = response.data;
            }
          }
        },
        query: {
          isArray: true,
          interceptor: {
            'response': function(response) {
              return Page.posts = response.data;
            }
          }
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
        ban: {
          url: API.makeURL('/posts/:id/ban'),
          method: 'POST'
        },
        save: {
          url: API.makeURL('/posts/:id/save'),
          method: 'POST'
        },
        unsave: {
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
          url: API.makeURL('/networks/:id/posts'),
          interceptor: {
            'response': function(response) {
              return Page.posts = response.data;
            }
          }
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
        activityLog: {
          url: API.makeURL('/communities/:id/activity_log')
        },
        moderators: {
          url: API.makeURL('/communities/:id/moderators'),
          isArray: true
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
