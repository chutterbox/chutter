app = angular.module("ModerationApp")
app.controller "toolbarCtrl", ["$auth", "$scope", "$mdDialog", "poller", "$mdToast", "API", "Communities", "$state", "$location",  ($auth, $scope, $mdDialog, poller, $mdToast, API, Communities, $state, $location) ->
  $scope.communities = Communities 

  $scope.$on("$stateChangeStart", () ->
    $scope.loading = true
  )
  $scope.$on("$stateChangeSuccess", () ->
    $scope.loading = false
  )
  $scope.applicationSectionNamespace = "frontpage"
  
  # $(".md-virtual-repeat-scroller").scroll () ->
  #   console.log "here"


  $scope.$on("auth:show-signin", () ->
    $scope.logIn
  )

  #showing authentication related dialogs
  $scope.logIn = ->
    $mdDialog.show
     controller: 'authCtrl'
     templateUrl: '../app/partials/main/authenticate.html'
     parent: angular.element(document.body)
     clickOutsideToClose: true


  $scope.logout = ->
    $auth.signOut().then () ->
      $location.url("/")
  #notification related logic

  if $scope.user and $scope.user.id
    $scope.poller = poller
    $scope.poller.get(API.makeURL('/users/ephemeral_notifications'), {delay: 30000}).promise.then null, null, (data) ->
      $scope.showNotifications(data.data)

  $scope.$on("auth:logout-success", () ->
    $scope.poller.stopAll()
  )

  $scope.$on "auth:login-success", () -> 
    $scope.poller = poller
    $scope.poller.get(API.makeURL('/users/ephemeral_notifications'), {delay: 30000}).promise.then null, null, (data) ->
      $scope.showNotifications(data.data)

  $scope.showNotifications = (notifications) ->
    ephemeral_notifications = _.reject(notifications, (n) -> n.ephemeral_count is 0)
    if ephemeral_notifications.length > 0
      cascade = true if ephemeral_notifications.length > 1
      _.each ephemeral_notifications, (notification) ->
        if cascade
          setTimeout () ->
            $scope.showNotification(notification)
          , 5000
        else
          $scope.showNotification(notification)
                
  $scope.showNotification = (notification) ->
    if notification.entityable is "comment"
      body = notification.body.substring(0,50)
      body += "..." if body.length > 49

      $mdToast.show(
        $mdToast.simple()
          .content("Re: #{body}")
          .position("bottom right")
          .action("#{notification.ephemeral_count} new")
          .hideDelay(5000)
      )
    else if notification.entityable is "post"
      title = notification.title.substring(0,50)
      title += "..." if title.length > 49

      $mdToast.show(
        $mdToast.simple()
          .content("Re: #{title}")
          .position("bottom right")
          .action("#{notification.ephemeral_count} new")
          .hideDelay(5000)
      )

]