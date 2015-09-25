#This is the main chutter application. There are 3 or so child apps that will depend upon this app
#The main app: (containing posts, networks, comments, user overviews, etc..)
#The user app: (contains messages, history, comment replies, preferences, etc..)
#The moderation app: (a dashboard for all things mod related)
#The goal of this structure is to configure any global dependencies across these three applications
#some examples of this include ui.router, the token authentication, ngresource
#it is also to keep this from becoming monolitic single page application, with 100's of states registered

'use strict'
app = angular.module('Chutter', [
  'ui.router'
  'ngMaterial'
  'templates-shared'
  'ng-token-auth'
  'ngResource'
  'emguo.poller'
  'hc.marked'
  'angularMoment'
  'ngMessages'
]).constant('API',
  baseURL: '/api/v1'
  makeURL: (url) ->
    @baseURL + url
).constant('angularMomentConfig', {
    preprocess: 'unix'
}).config([
  '$locationProvider'
  '$authProvider'
  'API',
  '$rootScopeProvider'
  ($locationProvider, $authProvider, API, $rootScopeProvider) ->
    $rootScopeProvider.digestTtl(30)
    $authProvider.configure apiUrl: API.baseURL
    $locationProvider.html5Mode true
]).config([
  '$stateProvider'
  '$urlRouterProvider'
  '$compileProvider'
  ($stateProvider, $urlRouterProvider, $compileProvider) ->
    # if false
      # AngularyticsProvider.setEventHandlers(['GoogleUniversal'])
    # $compileProvider.debugInfoEnabled(false)
]).run([
  '$http'
  '$auth'
  ($http, $auth) ->
    headers = undefined
    headers = $auth.retrieveData('auth_headers')
    $http.defaults.headers.common = $auth.retrieveData('auth_headers')
    # if ga and _gaq
      # Angularytics.init()
])



