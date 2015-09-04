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
      },
      controller: [
        "$scope", "$mdDialog", function($scope, $mdDialog) {
          return $scope.openSubscriptionDialog = function() {
            return $mdDialog.show({
              controller: 'subscriptionDialogCtrl',
              templateUrl: '../app/partials/shared/subscriptionDialog.html',
              parent: angular.element(document.body),
              clickOutsideToClose: true
            });
          };
        }
      ]
    };
  });

  app.directive("commentsSidebar", function() {
    return {
      restrict: "E",
      templateUrl: VIEW_URL + "/sidebar/comments-sidebar.html",
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
