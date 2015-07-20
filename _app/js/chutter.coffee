'use strict'

#This is the main chutter application. There are 3 or so child apps that will depend upon this app
#The main app: (containing posts, networks, comments, user overviews, etc..)
#The user app: (contains messages, history, comment replies, preferences, etc..)
#The moderation app: (a dashboard for all things mod related)
#The goal of this structure is to configure any global dependencies across these three applications
#some examples of this include ui.router, the token authentication, ngresource
#it is also to keep this from becoming monolitic single page application, with 100's of states registered
API_HOST = "https://chutter-api.herokuapp.com/api/v1"
app = angular.module('Chutter', ['ui.router', 'ngMaterial', 'templates-main', 'ng-token-auth',  'ngResource', 'videosharing-embed', 'emguo.poller']).config(["$locationProvider", "$mdThemingProvider", "$authProvider", ($locationProvider, $mdThemingProvider, $authProvider) ->

  $authProvider.configure
    apiUrl: API_HOST
  $locationProvider.html5Mode(true)
  $mdThemingProvider.theme('default').primaryPalette('light-blue')
]).config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->


]).run(["$http", "$auth", ($http, $auth) ->
  #important, attach auth token headers to http requests
  # $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w'
  headers = $auth.retrieveData('auth_headers')
  
  $http.defaults.headers.common = $auth.retrieveData('auth_headers')
])
