(function() {
  var app;

  app = angular.module("MainApp");

  app.directive("musicSubmitForm", function() {
    return {
      restrict: "E",
      templateUrl: "/partials/main/submit/music.html",
      controller: "musicSubmitCtrl"
    };
  });

  app.directive("discussionSubmitForm", function() {
    return {
      restrict: "E",
      templateUrl: "/partials/main/submit/discussion.html",
      controller: "discussionSubmitCtrl"
    };
  });

  app.directive("linkSubmitForm", function() {
    return {
      restrict: "E",
      templateUrl: "/partials/main/submit/link.html",
      controller: "linkSubmitCtrl"
    };
  });

}).call(this);
