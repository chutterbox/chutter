app = angular.module('MainApp')

app.controller 'toastCtrl', ->

app.controller 'pageCtrl', ['$scope', '$state', '$stateParams', '$auth', 'Page', 'Networks', '$mdBottomSheet', '$mdDialog', '$mdSidenav', '$mdToast', 'poller', 'API',
  ($scope, $state, $stateParams, $auth, Page, Networks, $mdBottomSheet, $mdDialog, $mdSidenav, $mdToast, poller, API) ->
    isOpen = undefined
    toggleOpen = undefined
    $scope.page = Page
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

    $scope.myPagingFunction = () ->
      console.log "Here"


    $scope.showNotifications = (notifications) ->
      ephemeral_notifications = _.reject(notifications, (n) -> n.ephemeral_count is 0)
      if ephemeral_notifications.length > 0
        cascade = true if ephemeral_notifications.length > 1
        _.each ephemeral_notifications, (notification) ->
          console.log notification
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
    $scope.$on("auth:show-signin", () ->
      $mdDialog.show
       controller: 'authCtrl'
       templateUrl: '/partials/main/authenticate.html'
       parent: angular.element(document.body)
       clickOutsideToClose: true
    )

    $scope.logout = ->
      $auth.signOut()

    $scope.toggleLeft = ->
      $mdSidenav('left').toggle()

    $scope.signIn = ->
      $scope.$broadcast("auth:show-signin")

    $scope.editNetworks = ->
      $mdDialog.show
        controller: 'networkEditCtrl'
        templateUrl: '/partials/main/networkEdit.html'
        resolve: List: [
          'NetworkResource'
          (NetworkResource) ->
            NetworkResource.list()
        ]
        parent: angular.element(document.body)
        clickOutsideToClose:true


    $scope.$on 'auth:login-success', ->
      $scope.networks = $auth.user.networks

]