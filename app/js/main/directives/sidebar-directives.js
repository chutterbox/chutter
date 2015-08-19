(function() {
  var app;

  app = angular.module("MainApp");

  app.directive('allSidebar', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/sidebar/all.html'
    };
  });

  app.directive('commentSidebar', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/sidebar/comment.html'
    };
  });

  app.directive('communitySidebar', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/sidebar/community.html'
    };
  });

  app.directive('networkSidebar', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/sidebar/network.html'
    };
  });

  app.directive('submissionSidebar', function() {
    return {
      restrict: "E",
      templateUrl: '../app/partials/main/sidebar/submission.html'
    };
  });

}).call(this);
