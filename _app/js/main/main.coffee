'use strict'
app = angular.module('MainApp', ["Chutter"])


#global event listener for menu toggle
$(document).ready () ->
  setTimeout () -> 
    $("menu-toggle > a").on "click", (event) ->
      console.log event
      if event.screenX < 53
        event.preventDefault()
  , 2000


app.config ["$httpProvider", ($httpProvider) ->

  $httpProvider.interceptors.push ["$q", '$injector','$rootScope', ($q, $injector, $rootScope) ->
    {
      response: (response) ->
        if response.status == 401
          ##console.log('401') 
        else
        response or $q.when(response)
      responseError: (rejection) ->
        if rejection.status == 401
          console.log('401')
          $rootScope.$broadcast "auth:show-signin"
        $q.reject rejection
    }  
  ]
]