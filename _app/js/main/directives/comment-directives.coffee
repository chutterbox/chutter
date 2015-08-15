app = angular.module("MainApp")

app.directive 'commentEmbed', ->
  restrict: "E"
  templateUrl: "../app/partials/shared/comments/commentEmbed.html"

