(function() {
  'use strict';
  var app;

  app = angular.module('Chutter', ['ui.router', 'ngMaterial', 'templates-shared', 'ng-token-auth', 'ngResource', 'videosharing-embed', 'emguo.poller', 'infinite-scroll', 'hc.marked', 'angularMoment', 'angularytics']).constant('API', {
    baseURL: 'https://api.chutter.co/api/v1',
    makeURL: function(url) {
      return this.baseURL + url;
    }
  }).constant('angularMomentConfig', {
    preprocess: 'unix'
  }).config([
    '$locationProvider', '$authProvider', 'API', '$rootScopeProvider', function($locationProvider, $authProvider, API, $rootScopeProvider) {
      $rootScopeProvider.digestTtl(30);
      $authProvider.configure({
        apiUrl: API.baseURL
      });
      return $locationProvider.html5Mode(true);
    }
  ]).config([
    '$stateProvider', '$urlRouterProvider', '$compileProvider', 'AngularyticsProvider', function($stateProvider, $urlRouterProvider, $compileProvider, AngularyticsProvider) {
      return AngularyticsProvider.setEventHandlers(['GoogleUniversal']);
    }
  ]).run([
    '$http', '$auth', 'Angularytics', function($http, $auth, Angularytics) {
      var headers;
      headers = void 0;
      headers = $auth.retrieveData('auth_headers');
      $http.defaults.headers.common = $auth.retrieveData('auth_headers');
      return Angularytics.init();
    }
  ]);

}).call(this);
