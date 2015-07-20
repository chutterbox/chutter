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
