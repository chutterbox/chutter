app = angular.module("MainApp")
API_HOST = "https://chutter-api.herokuapp.com/api/v1"

app.controller "toastCtrl", ->

app.controller "navCtrl", ["$scope", "$state", "$stateParams", "$auth", "Page", "NetworkSubscriptions", "$mdBottomSheet", "$mdDialog", "$mdSidenav", "$mdToast", "poller", ($scope, $state, $stateParams, $auth, Page, NetworkSubscriptions, $mdBottomSheet, $mdDialog, $mdSidenav, $mdToast, poller) ->
  $scope.page = Page
  poller.get("#{API_HOST}/users/notifications")

  $mdToast.show({
    controller: 'toastCtrl'
    templateUrl: '/partials/toasts/comment-toast.html',
    position: "bottom right"

  })


  $scope.logout = () ->
    $auth.signOut()

  $scope.toggleLeft = () ->
    $mdSidenav('left').toggle()
    
  $scope.signIn = () -> 
    $mdDialog.show({
      controller: "authCtrl",
      templateUrl: '/partials/main/authenticate.html',
      parent: angular.element(document.body)
    })


  $scope.exploreCommunity = (community) ->
    $state.transitionTo('home.network.community', {network: $scope.page.network.slug, community: community.slug})
  $scope.exploreNetwork = (network) ->
    $state.transitionTo('home.network', {network: network.slug})

  $scope.exploreAll = () ->
    $scope.page.selectedTab = 0
    $state.transitionTo('home.all')


  $scope.editNetworks = () ->
    $mdDialog.show({
      controller: "networkEditCtrl",
      templateUrl: '/partials/main/networkEdit.html',
      resolve: 
        List: ["NetworkResource", (NetworkResource) ->
          NetworkResource.list()          
        ]

      parent: angular.element(document.body),
    })
    
  $scope.$on("auth:login-success", () ->
    $scope.networks = $auth.user.networks
  )

  # isSelected = (page) ->
  #   Page.isPageSelected page

  # isSectionSelected = (section) ->
  #   selected = false
  #   openedSection = Page.openedSection
  #   if openedSection is section
  #     selected = true
    
  #   selected

  isOpen = (section) ->
    Page.isSectionSelected section 

  toggleOpen = (section) ->
    Page.toggleSelectSection section

  this.isOpen = isOpen
  this.toggleOpen = toggleOpen
  this.autoFocusContent = false


]