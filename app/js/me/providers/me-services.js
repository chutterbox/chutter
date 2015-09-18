(function() {
  var app;

  app = angular.module('MeApp');

  app.factory('ConversationResource', [
    '$resource', 'API', function($resource, API) {
      return $resource(API.makeURL('/conversations/:id'), {
        id: '@id'
      }, {
        messages: {
          url: API.makeURL('/conversations/:id/messages'),
          isArray: true
        },
        reply: {
          method: 'POST',
          url: API.makeURL('/conversations/:id/reply')
        }
      });
    }
  ]);

}).call(this);
