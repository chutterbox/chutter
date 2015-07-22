(function() {
  var app;

  app = angular.module('MainApp');

  app.controller('toastCtrl', function() {});

  app.controller('navCtrl', [
    '$scope', '$state', '$stateParams', '$auth', 'Page', 'NetworkSubscriptions', '$mdBottomSheet', '$mdDialog', '$mdSidenav', '$mdToast', 'poller', 'API', function($scope, $state, $stateParams, $auth, Page, NetworkSubscriptions, $mdBottomSheet, $mdDialog, $mdSidenav, $mdToast, poller, API) {
      var isOpen, toggleOpen;
      isOpen = void 0;
      toggleOpen = void 0;
      $scope.page = Page;
      $scope.$on("auth:validation-success", function() {
        return poller.get(API.makeURL('/users/notifications'));
      });
      $scope.$on("auth:login-success", function() {
        return poller.get(API.makeURL('/users/notifications'));
      });
      $mdToast.show({
        controller: 'toastCtrl',
        templateUrl: '/partials/toasts/comment-toast.html',
        position: 'bottom right'
      });
      $scope.$on("auth:show-signin", function() {
        return $mdDialog.show({
          controller: 'authCtrl',
          templateUrl: '/partials/main/authenticate.html',
          parent: angular.element(document.body)
        });
      });
      $scope.logout = function() {
        return $auth.signOut();
      };
      $scope.toggleLeft = function() {
        return $mdSidenav('left').toggle();
      };
      $scope.signIn = function() {
        return $mdDialog.show({
          controller: 'authCtrl',
          templateUrl: '/partials/main/authenticate.html',
          parent: angular.element(document.body)
        });
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
          parent: angular.element(document.body)
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
