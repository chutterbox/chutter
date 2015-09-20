app = angular.module('MainApp')

app.controller 'toastCtrl', ->

app.controller 'pageCtrl', ['$scope', '$stateParams', 'Page', '$mdBottomSheet', '$mdDialog', '$mdSidenav', 'API', "$rootScope",
  ($scope, $stateParams, Page, $mdBottomSheet, $mdDialog, $mdSidenav, API, $rootScope) ->
    
    $rootScope.$on "$stateChangeStart", (e, toState, toParams, fromState, fromParams) ->
      Page.cachedScrollTops[window.location] = $(".md-virtual-repeat-scroller").scrollTop()
    
    $rootScope.$on "$viewContentLoaded", (e, toState, toParams, fromState, fromParams) ->
      _.defer () ->
        elm = $(".md-virtual-repeat-scroller")
        cachedScrollTop = Page.cachedScrollTops[window.location]
        if elm
          elm.scrollTop(cachedScrollTop)
      
    $scope.toggleLeft = ->
      $mdSidenav('left').toggle()
  

]