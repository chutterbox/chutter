'use strict'

app = angular.module("Chutter")

app.directive "chutterToolbar", [() ->
  restrict: "E"
  templateUrl: "../app/partials/shared/toolbar.html"
  controller: "toolbarCtrl"



]
