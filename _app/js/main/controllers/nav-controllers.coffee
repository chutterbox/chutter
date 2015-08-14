app = angular.module('MainApp')

app.controller 'toastCtrl', ->

app.controller 'navCtrl', ['$scope', '$state', '$stateParams', '$auth', 'Page', 'Networks', '$mdBottomSheet', '$mdDialog', '$mdSidenav', '$mdToast', 'poller', 'API',
  ($scope, $state, $stateParams, $auth, Page, Networks, $mdBottomSheet, $mdDialog, $mdSidenav, $mdToast, poller, API) ->
    isOpen = undefined
    toggleOpen = undefined
    $scope.page = Page
    console.log Page
    element = document.getElementById("main-toolbar")
    content    = document.getElementById("content") 

    left   = document.getElementById("scrolly-left")     
    right    = document.getElementById("scrolly-right")     
    $("#content").scroll (e) ->
        window.requestAnimationFrame(scrollHandler)
   
    scrollHandler = () ->
      velocity = 1.4
      if content.scrollTop * velocity < 64
        shift = (content.scrollTop*1.7)
        element.style.zIndex = 21
      else
        shift = 64 
        element.style.zIndex = 24

      element.style.transform = 'translate3d(0px,-' + shift + 'px, 0px)'
      element.style.webkitTransform = 'translate3d(0px,-' + shift + 'px, 0px)'
      left.style.transform = 'translate3d(0px,' + (65 - shift) + 'px, 0px)'
      left.style.webkitTransform = 'translate3d(0px,' + (65 - shift) + 'px, 0px)'
      right.style.transform = 'translate3d(0px,' + (65 - shift) + 'px, 0px)'
      right.style.webkitTransform = 'translate3d(0px,' + (65 - shift) + 'px, 0px)'
    
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

    isOpen = (section) ->
      Page.isSectionSelected section

    toggleOpen = (section) ->
      Page.toggleSelectSection section

    @isOpen = isOpen
    @toggleOpen = toggleOpen
    @autoFocusContent = false
]