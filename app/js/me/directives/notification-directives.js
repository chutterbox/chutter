(function() {
  var app;

  app = angular.module("MeApp");

  app.directive('notification', [
    "NotificationView", function(NotificationView) {
      return {
        restrict: "E",
        scope: {
          entity: "="
        },
        template: '<div ng-click="open()" ng-include="templateUrl" layout="row" layout-align="start center" entity="entity"></div>',
        link: function(scope, element, attrs) {
          scope.templateUrl = "/partials/me/notifications/" + scope.entity.entityable + ".html";
          scope.entity.element = element[0];
          scope.entity.offsetTop = scope.entity.element.offsetTop;
          return scope.open = function() {
            NotificationView.initialize(scope.entity);
            return NotificationView.show();
          };
        }
      };
    }
  ]);

  app.directive("notificationView", [
    "NotificationView", function(NotificationView) {
      return {
        restrict: "E",
        templateUrl: "/partials/me/notifications/notification-view.html",
        link: function(scope, element, attrs) {
          NotificationView.element = element[0];
          return scope.close = function() {
            return NotificationView.close();
          };
        },
        controller: [
          "$scope", "NotificationView", function($scope, NotificationView) {
            return $scope.viewer = NotificationView;
          }
        ]
      };
    }
  ]);

}).call(this);
