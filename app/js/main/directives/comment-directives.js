(function() {
  var app;

  app = angular.module("MainApp");

  app.directive('commentEmbed', function() {
    return {
      restrict: "E",
      templateUrl: "../app/partials/shared/comments/commentEmbed.html"
    };
  });

}).call(this);
