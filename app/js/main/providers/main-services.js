(function() {
  'use strict';
  var app;

  app = angular.module('MainApp');

  app.factory('NetworkSubscriptionResource', [
    '$resource', 'Page', 'API', function($resource, Page, API) {
      return $resource(API.makeURL('/network_subscriptions/:id'), {
        id: '@id'
      }, {
        query: {
          isArray: true,
          interceptor: {
            'response': function(response) {
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

  app.factory('UserResource', [
    '$resource', 'Page', 'API', function($resource, Page, API) {
      return $resource(API.makeURL('/users/:id'), {
        id: '@id'
      });
    }
  ]);

  app.factory('ExternalServicesResource', [
    '$resource', 'Page', 'API', function($resource, Page, API) {
      return $resource(API.makeURL('/external_services/:id'), {
        id: '@id'
      }, {
        'search': {
          url: API.makeURL('/external_services/search_music'),
          method: 'POST',
          isArray: true
        }
      });
    }
  ]);

  app.factory('MediaResource', [
    '$resource', 'Page', 'API', function($resource, Page, API) {
      return $resource(API.makeURL('/media/:id'), {
        id: '@id'
      }, {
        'resolve': {
          url: API.makeURL('/media/resolve'),
          method: 'POST',
          isArray: false
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
            _.each(data, function(item) {
              var sub;
              sub = void 0;
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
          method: 'get',
          url: API.makeURL('/networks/:id/communities'),
          isArray: true,
          transformResponse: function(response) {
            var data;
            data = void 0;
            data = angular.fromJson(response);
            _.each(data, function(item) {
              var sub;
              sub = void 0;
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

  app.factory('audio', [
    '$document', function($document) {
      var audio;
      audio = void 0;
      audio = void 0;
      audio = $document[0].createElement('audio');
      return audio;
    }
  ]);

  app.factory('preview', [
    '$document', function($document) {
      var audio;
      audio = void 0;
      audio = void 0;
      audio = $document[0].createElement('audio');
      return audio;
    }
  ]);

  app.factory('playerSvc', [
    '$http', '$rootScope', function($http, $rootScope) {
      return {
        incrPlays: function(songId) {
          return $http.post('/incrPlays', {
            songId: songId
          });
        },
        getSong: function(track) {
          return $http.get('/getSong?track=' + track);
        }
      };
    }
  ]);

}).call(this);
