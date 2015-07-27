(function() {
  var app;

  app = angular.module('MainApp');

  app.controller('toastCtrl', function() {});

  app.controller('navCtrl', [
    '$scope', '$state', '$stateParams', '$auth', 'Page', 'NetworkSubscriptions', '$mdBottomSheet', '$mdDialog', '$mdSidenav', '$mdToast', 'poller', 'API', function($scope, $state, $stateParams, $auth, Page, NetworkSubscriptions, $mdBottomSheet, $mdDialog, $mdSidenav, $mdToast, poller, API) {
      var content, element, isOpen, left, right, scrollHandler, toggleOpen;
      isOpen = void 0;
      toggleOpen = void 0;
      $scope.page = Page;
      element = document.getElementById("main-toolbar");
      content = document.getElementById("content");
      left = document.getElementById("scrolly-left");
      right = document.getElementById("scrolly-right");
      $("#content").scroll(function(e) {
        return window.requestAnimationFrame(scrollHandler);
      });
      scrollHandler = function() {
        var shift, velocity;
        velocity = 1.4;
        if (content.scrollTop * velocity < 64) {
          shift = content.scrollTop * 1.7;
          element.style.zIndex = 21;
        } else {
          shift = 64;
          element.style.zIndex = 24;
        }
        element.style.transform = 'translate3d(0px,-' + shift + 'px, 0px)';
        left.style.transform = 'translate3d(0px,' + (65 - shift) + 'px, 0px)';
        left.style.webkitTransform = 'translate3d(0px,' + (65 - shift) + 'px, 0px)';
        right.style.transform = 'translate3d(0px,' + (65 - shift) + 'px, 0px)';
        right.style.webkitTransform = 'translate3d(0px,' + (65 - shift) + 'px, 0px)';
        return element.style.cssText += '-webkit-transform: translate3d(0px,-' + shift + 'px, 0px);';
      };
      $scope.$on("auth:validation-success", function() {});
      $scope.$on("auth:login-success", function() {});
      $mdToast.show({
        controller: 'toastCtrl',
        templateUrl: '/partials/toasts/comment-toast.html',
        position: 'bottom right'
      });
      $scope.$on("auth:show-signin", function() {
        return $mdDialog.show({
          controller: 'authCtrl',
          templateUrl: '/partials/main/authenticate.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      });
      $scope.logout = function() {
        return $auth.signOut();
      };
      $scope.toggleLeft = function() {
        return $mdSidenav('left').toggle();
      };
      $scope.signIn = function() {
        return $scope.$broadcast("auth:show-signin");
      };
      $scope.exploreCommunity = function(community) {
        return $state.transitionTo('home.network.community', {
          network: $scope.page.network.slug,
          community: community.slug
        });
      };
      $scope.exploreNetwork = function(network) {
        return $state.transitionTo('home.network', {
          network: network.slug
        });
      };
      $scope.exploreAll = function() {
        $scope.page.selectedTab = 0;
        return $state.transitionTo('home.all');
      };
      $scope.editNetworks = function() {
        return $mdDialog.show({
          controller: 'networkEditCtrl',
          templateUrl: '/partials/main/networkEdit.html',
          resolve: {
            List: [
              'NetworkResource', function(NetworkResource) {
                return NetworkResource.list();
              }
            ]
          },
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };
      $scope.$on('auth:login-success', function() {
        return $scope.networks = $auth.user.networks;
      });
      isOpen = function(section) {
        return Page.isSectionSelected(section);
      };
      toggleOpen = function(section) {
        return Page.toggleSelectSection(section);
      };
      this.isOpen = isOpen;
      this.toggleOpen = toggleOpen;
      return this.autoFocusContent = false;
    }
  ]);

}).call(this);
