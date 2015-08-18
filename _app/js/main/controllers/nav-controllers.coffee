app = angular.module('MainApp')

app.controller 'toastCtrl', ->

app.controller 'navCtrl', ['$scope', '$state', '$stateParams', '$auth', 'Page', 'Networks', '$mdBottomSheet', '$mdDialog', '$mdSidenav', '$mdToast', 'poller', 'API',
  ($scope, $state, $stateParams, $auth, Page, Networks, $mdBottomSheet, $mdDialog, $mdSidenav, $mdToast, poller, API) ->
    isOpen = undefined
    toggleOpen = undefined
    $scope.page = Page
    $scope.$on "auth:validation-success", () -> 
      # poller.get API.makeURL('/users/notifications') 
    
    $scope.$on "auth:login-success", () -> 
      # poller.get API.makeURL('/users/notifications') 
    
    $scope.myPagingFunction = () ->
      console.log "Here"

    $mdToast.show
      controller: 'toastCtrl'
      templateUrl: '/partials/toasts/comment-toast.html'
      position: 'bottom right'
      
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