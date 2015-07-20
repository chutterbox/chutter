(function() {
  'use strict';
  var API_HOST, app;

  API_HOST = "https://chutter-api.herokuapp.com/api/v1";

  app = angular.module('Chutter', ['ui.router', 'ngMaterial', 'templates-main', 'ng-token-auth', 'ngResource', 'videosharing-embed', 'emguo.poller']).config([
    "$locationProvider", "$mdThemingProvider", "$authProvider", function($locationProvider, $mdThemingProvider, $authProvider) {
      $authProvider.configure({
        apiUrl: API_HOST
      });
      $locationProvider.html5Mode(true);
      return $mdThemingProvider.theme('default').primaryPalette('light-blue');
    }
  ]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {}]).run([
    "$http", "$auth", function($http, $auth) {
      var headers;
      headers = $auth.retrieveData('auth_headers');
      return $http.defaults.headers.common = $auth.retrieveData('auth_headers');
    }
  ]);

}).call(this);
