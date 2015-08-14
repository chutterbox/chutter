'use strict'
app = angular.module('MainApp', ["Chutter", "templates-main"])


#global event listener for menu toggle
$(document).ready () ->
  setTimeout () -> 
    $("menu-toggle > a").on "click", (event) ->
      console.log event
      if event.screenX < 53
        event.preventDefault()
  , 2000


app.config ["$httpProvider", "$mdThemingProvider", ($httpProvider, $mdThemingProvider) ->
  $mdThemingProvider.theme('default').primaryPalette 'light-blue'
  $mdThemingProvider.theme('moderator').primaryPalette 'indigo'

  # $httpProvider.interceptors.push ["$q", '$injector','$rootScope', ($q, $injector, $rootScope) ->
  #   {
  #     responseError: (rejection) ->
  #       if rejection.status == 401
  #         $rootScope.$broadcast "auth:show-signin"
  #   }  
  # ]
]