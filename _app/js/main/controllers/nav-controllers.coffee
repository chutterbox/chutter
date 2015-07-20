(->
  app = undefined
  app = angular.module('MainApp')
  app.controller 'toastCtrl', ->
  app.controller 'navCtrl', [
    '$scope'
    '$state'
    '$stateParams'
    '$auth'
    'Page'
    'NetworkSubscriptions'
    '$mdBottomSheet'
    '$mdDialog'
    '$mdSidenav'
    '$mdToast'
    'poller'
    'API'
    ($scope, $state, $stateParams, $auth, Page, NetworkSubscriptions, $mdBottomSheet, $mdDialog, $mdSidenav, $mdToast, poller, API) ->
      isOpen = undefined
      toggleOpen = undefined
      $scope.page = Page
      poller.get API.makeURL('/users/notifications')
      $mdToast.show
        controller: 'toastCtrl'
        templateUrl: '/partials/toasts/comment-toast.html'
        position: 'bottom right'

      $scope.logout = ->
        $auth.signOut()

      $scope.toggleLeft = ->
        $mdSidenav('left').toggle()

      $scope.signIn = ->
        $mdDialog.show
          controller: 'authCtrl'
          templateUrl: '/partials/main/authenticate.html'
          parent: angular.element(document.body)

      $scope.exploreCommunity = (community) ->
        $state.transitionTo 'home.network.community',
          network: $scope.page.network.slug
          community: community.slug

      $scope.exploreNetwork = (network) ->
        $state.transitionTo 'home.network', network: network.slug

      $scope.exploreAll = ->
        $scope.page.selectedTab = 0
        $state.transitionTo 'home.all'

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
  return
).call this
