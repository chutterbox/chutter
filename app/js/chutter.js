(function() {
  'use strict';
  var app;

<<<<<<< HEAD
  app = angular.module('Chutter', ['ui.router', 'ngMaterial', 'templates-shared', 'ng-token-auth', 'ngResource', 'videosharing-embed', 'emguo.poller', 'infinite-scroll', 'hc.marked', 'angularMoment', 'angularytics']).constant('API', {
=======
  app = angular.module('Chutter', ['ui.router', 'ngMaterial', 'templates-shared', 'ng-token-auth', 'ngResource', 'videosharing-embed', 'emguo.poller', 'infinite-scroll', 'hc.marked']).constant('API', {
>>>>>>> 5992daf... going to have to do radio buttons for now, the autocomplete was a little difficult to use and was matching incorrectly
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
