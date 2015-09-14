(function() {
  'use strict';
  var app;

  app = angular.module("Chutter");

  app.directive("chutterToolbar", [
    function() {
      return {
        restrict: "E",
        templateUrl: "../app/partials/shared/toolbar.html",
        controller: "toolbarCtrl"
      };
    }
  ]);

}).call(this);
