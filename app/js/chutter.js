(function() {
  'use strict';
  var app;

  app = angular.module('Chutter', ['ui.router', 'ngMaterial', 'templates-main', 'ng-token-auth', 'ngResource', 'videosharing-embed', 'emguo.poller']).constant('API', {
    baseURL: 'http://chutter-api.elasticbeanstalk.com/api/v1',
    makeURL: function(url) {
      return this.baseURL + url;
    }
  }).config([
    '$locationProvider', '$mdThemingProvider', '$authProvider', 'API', function($locationProvider, $mdThemingProvider, $authProvider, API) {
      $authProvider.configure({
        apiUrl: API.baseURL
      });
      $locationProvider.html5Mode(true);
      return $mdThemingProvider.theme('default').primaryPalette('light-blue');
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
