(function() {
  var app;

  app = angular.module('ModerationApp');

  app.factory('UserResource', [
    '$resource', 'API', function($resource, API) {
      return $resource(API.makeURL('/users/'), {
        id: '@id'
      }, {
        moderatedCommunities: {
          url: API.makeURL('/users/moderated_communities'),
          method: "GET",
          isArray: true
        },
        stats: {
          url: API.makeURL('/users/:id/stats'),
          isArray: true
        }
      });
    }
  ]);

}).call(this);
