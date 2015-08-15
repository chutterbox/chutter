(function() {
  var app;

  app = angular.module("MeApp");

  app.directive('notification', function() {
    return {
      restrict: "E",
      scope: {
        entity: "="
      },
      templateUrl: '/partials/me/notifications/notification.html',
      link: function(scope, element, attrs) {
        scope.entity.element = element[0];
        scope.entity.offsetTop = scope.entity.element.offsetTop;
        return scope.open = function() {
          NotificationView.initialize(scope.entity);
          return NotificationView.show();
        };
      }
    };
  });

}).call(this);
