app = angular.module('MainApp')

app.controller 'toastCtrl', ->

app.controller 'pageCtrl', ['$scope', '$stateParams', 'Page', 'Networks', '$mdBottomSheet', '$mdDialog', '$mdSidenav', 'API', "$rootScope",
  ($scope, $stateParams, Page, Networks, $mdBottomSheet, $mdDialog, $mdSidenav, API, $rootScope) ->
    
    $rootScope.$on "$stateChangeStart", (e, toState, toParams, fromState, fromParams) ->
      Page.cachedScrollTops[window.location] = $(".md-virtual-repeat-scroller").scrollTop()
    
    $rootScope.$on "$viewContentLoaded", (e, toState, toParams, fromState, fromParams) ->
      _.defer () ->
        elm = $(".md-virtual-repeat-scroller")
        cachedScrollTop = Page.cachedScrollTops[window.location]
        console.log Page.cachedScrollTops[window.location]
        if elm
          elm.scrollTop(cachedScrollTop)
      
    $scope.page = Page
    $scope.page.networks = Networks
    networks_with_communities = _.filter Networks, (n) -> n.communities && n.communities.length > 0 
    
    #flatten out network communities for toolbar list, ensuring that their parent network is referenceable
    _.each networks_with_communities, (network) ->
      _.each network.communities, (community) ->
        community.network_name = network.name
        $scope.page.communities.push(community)

    $scope.toggleLeft = ->
      $mdSidenav('left').toggle()
  

]