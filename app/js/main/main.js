(function() {
  'use strict';
  var app;

  app = angular.module('MainApp', ["Chutter"]);

  $(document).ready(function() {
    return setTimeout(function() {
      return $("menu-toggle > a").on("click", function(event) {
        console.log(event);
        if (event.screenX < 53) {
          return event.preventDefault();
        }
      });
    }, 2000);
  });

}).call(this);
