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
    $scope.toggleLeft = ->
      $mdSidenav('left').toggle()
  

]