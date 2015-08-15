app = angular.module("MeApp")

app.directive 'notification', ->
  restrict: "E"
  scope: 
    entity: "="
  templateUrl: '/partials/me/notifications/notification.html'
  link: (scope, element, attrs) ->
    scope.entity.element = element[0]
    scope.entity.offsetTop = scope.entity.element.offsetTop
    scope.open = () ->
      NotificationView.initialize(scope.entity)
      NotificationView.show()




