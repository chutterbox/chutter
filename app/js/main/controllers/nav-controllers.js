(function() {
  var app;

  app = angular.module('MainApp');

  app.controller('toastCtrl', function() {});

  app.controller('pageCtrl', [
    '$scope', '$stateParams', 'Page', 'Networks', '$mdBottomSheet', '$mdDialog', '$mdSidenav', 'API', "$rootScope", function($scope, $stateParams, Page, Networks, $mdBottomSheet, $mdDialog, $mdSidenav, API, $rootScope) {
      $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
        return Page.cachedScrollTops[window.location] = $(".md-virtual-repeat-scroller").scrollTop();
      });
      $rootScope.$on("$viewContentLoaded", function(e, toState, toParams, fromState, fromParams) {
        return _.defer(function() {
          var cachedScrollTop, elm;
          elm = $(".md-virtual-repeat-scroller");
          cachedScrollTop = Page.cachedScrollTops[window.location];
          console.log(Page.cachedScrollTops[window.location]);
          if (elm) {
            return elm.scrollTop(cachedScrollTop);
          }
        });
      });
      $scope.page = Page;
      return $scope.toggleLeft = function() {
        return $mdSidenav('left').toggle();
      };
    }
  ]);

}).call(this);
