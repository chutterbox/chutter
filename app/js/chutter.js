(function() {
  'use strict';
  var app;

  app = angular.module('Chutter', ['ui.router', 'ngMaterial', 'templates-main', 'ng-token-auth', 'ngResource', 'videosharing-embed', 'emguo.poller']).constant('API', {
    baseURL: 'http://chutter-api.elasticbeanstalk.com/api/v1',
    makeURL: function(url) {
      return this.baseURL + url;
    }
  }).config([
    '$locationProvider', '$authProvider', 'API', function($locationProvider, $authProvider, API) {
      $authProvider.configure({
        apiUrl: API.baseURL
      });
      return $locationProvider.html5Mode(true);
    }
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {}]).run([
    '$http', '$auth', function($http, $auth) {
      var headers;
      headers = void 0;
      headers = $auth.retrieveData('auth_headers');
      return $http.defaults.headers.common = $auth.retrieveData('auth_headers');
    }
  ]);

}).call(this);
