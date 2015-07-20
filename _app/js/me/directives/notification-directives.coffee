app = angular.module("MeApp")

app.directive 'notification', ["NotificationView", (NotificationView) ->
  restrict: "E"
  scope: 
    entity: "="
  template: '<div ng-click="open()" ng-include="templateUrl" layout="row" layout-align="start center" entity="entity"></div>'
  link: (scope, element, attrs) ->
    scope.templateUrl = "/partials/me/notifications/#{scope.entity.entityable}.html"
    scope.entity.element = element[0]
    scope.entity.offsetTop = scope.entity.element.offsetTop
    scope.open = () ->
      NotificationView.initialize(scope.entity)
      NotificationView.show()

]

app.directive "notificationView", ["NotificationView", (NotificationView) ->
  restrict: "E"
  templateUrl: "/partials/me/notifications/notification-view.html"
  link: (scope, element, attrs) ->
    NotificationView.element = element[0]
    scope.close = () ->
      NotificationView.close()
  controller: ["$scope", "NotificationView", ($scope, NotificationView) ->
    $scope.viewer = NotificationView

  ]
]
