(function() {
  'use strict';
  var app;

  app = angular.module('MainApp');

  app.factory('NetworkSubscriptionResource', [
    '$resource', 'Page', 'API', function($resource, Page, API) {
      return $resource(API.makeURL('/network_subscriptions/:id'), {
        id: '@id'
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
