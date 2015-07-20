(function() {
  var app;

  app = angular.module("MainApp");

  app.directive("imageSubmitForm", function() {
    return {
      restrict: "E",
      templateUrl: "/partials/main/submit/image.html",
      controller: "imageSubmitCtrl"
    };
  });

  app.directive("musicSubmitForm", function() {
    return {
      restrict: "E",
      templateUrl: "/partials/main/submit/music.html",
      controller: "musicSubmitCtrl"
    };
  });

  app.directive("videoSubmitForm", function() {
    return {
      restrict: "E",
      templateUrl: "/partials/main/submit/video.html",
      controller: "videoSubmitCtrl"
    };
  });

  app.directive("discussionSubmitForm", function() {
    return {
      restrict: "E",
      templateUrl: "/partials/main/submit/discussion.html",
      controller: "discussionSubmitCtrl"
    };
  });

  app.directive("webpageSubmitForm", function() {
    return {
      restrict: "E",
      templateUrl: "/partials/main/submit/webpage.html",
      controller: "webpageSubmitCtrl"
    };
  });

}).call(this);
