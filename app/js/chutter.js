(function() {
  'use strict';
  var app;

  app = angular.module('Chutter', ['ui.router', 'ngMaterial', 'templates-shared', 'ng-token-auth', 'ngResource', 'emguo.poller', 'hc.marked', 'angularMoment', 'ngMessages', 'angularytics']).constant('API', {
    baseURL: '/api/v1',
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
      AngularyticsProvider.setEventHandlers(['GoogleUniversal']);
      return $compileProvider.debugInfoEnabled(false);
    }
  ]).run([
    '$http', '$auth', '$rootScope', 'Angularytics', function($http, $auth, $rootScope, Angularytics) {
      var headers;
      headers = void 0;
      headers = $auth.retrieveData('auth_headers');
      $http.defaults.headers.common = $auth.retrieveData('auth_headers');
      return Angularytics.init();
    }
  ]);

}).call(this);
