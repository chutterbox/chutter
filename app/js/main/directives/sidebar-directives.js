(function() {
  var VIEW_URL, app;

  app = angular.module("MainApp");

  VIEW_URL = "../app/partials/main";

  app.directive("allSidebar", function() {
    return {
      restrict: "E",
      templateUrl: VIEW_URL + "/sidebar/all-sidebar.html",
      scope: {
        page: "="
      }
    };
  });

  app.directive("commentSidebar", function() {
    return {
      restrict: "E",
      templateUrl: VIEW_URL + "/sidebar/comments-sidebar.html",
      scope: {
        page: "="
      }
    };
  });

  app.directive("communitySidebar", function() {
    return {
      restrict: "E",
      templateUrl: VIEW_URL + "/sidebar/community-sidebar.html",
      scope: {
        page: "="
      }
    };
  });

  app.directive("networkSidebar", function() {
    return {
      restrict: "E",
      templateUrl: VIEW_URL + "/sidebar/network-sidebar.html",
      scope: {
        page: "="
      }
    };
  });

  app.directive("submissionSidebar", function() {
    return {
      restrict: "E",
      templateUrl: VIEW_URL + "/sidebar/submission-sidebar.html",
      scope: {
        page: "="
      }
    };
  });

  app.directive("footerSidebar", function() {
    return {
      restrict: "E",
      templateUrl: VIEW_URL + "/sidebar/footer-sidebar.html",
      scope: {
        page: "="
      }
    };
  });

}).call(this);
